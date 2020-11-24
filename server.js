//Dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();//for local development
const cors = require('cors');
//const bingSearch = require('bing.search');
const fetch = require('node-fetch');

//http-parser fix to avoid parse error when fetching image buffer
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;

//Init express
const app = express();

//use cors
app.use(cors({
    "origin": "*",
    "methods": "GET"
}));

//Google custom search keys (image)
const apiKey_image = process.env.cseApiKey_image;
const pseId_image = process.env.pseId_image;

//Google custom search keys (video)
const apiKey_video = process.env.cseApiKey_video
const pseId_video = process.env.pseId_video


//App&Database Connection Options (firebase)
var fireBaseConnected = false;

try{
    const admin = require('firebase-admin');
    let isProd = process.env.NODE_ENV == 'production';

    //use local admin.json when in dev mode else access it through env var
    var certificate = isProd ? admin.credential.cert(JSON.parse(process.env.firebaseAdminObject)) : admin.credential.applicationDefault();
    
    admin.initializeApp({
        credential: certificate,
        databaseURL: process.env.databaseURL,
        authDomain: process.env.authDomain,
    });
    const appRef = admin.database().ref('/fetchrApp');
    fireBaseConnected = true;
    console.log('App connected to firebase')

    var search = appRef.child('/searchHistory');
}catch(e){
    console.log(e)
    fireBaseConnected = false;
}
//App connection port
const PORT = process.env.PORT || 8080;

//App&Database connection options (mongodb)
//connect to mongodb if not connected to firebase
var searchHistory_image = require('./models/searchHistory_image');
var searchHistory_video = require('./models/searchHistory_video');

//firebase connection error? log the error in production an fallback to mongoDb in development
if(!fireBaseConnected && process.env.ENV == 'development'){
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/searchHistory';
    //connect to mongoDB
    mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}).then(()=>{
        console.log('App Connected to MongoDB.')
    }).catch(e => console.log('MongoDb: '+e));

}else if(!fireBaseConnected && !!process.env.ENV && process.env.ENV == 'production'){
    console.log('Firebase: Error connecting to firebase..')
}

//set static folder
app.use('/',express.static(__dirname+'/client/build'));

//dummy data
app.get('/dummy/imageSearch/:term', (req, res) => {
    res.status(200).send([{
        caption: "My Cats - Adorable Cat & Kitten Wallpapers",
        height: 400,
        imageBlob: {data: 'fdfdfd', size: 58758, type: "image/jpeg"},
        imageSrc: "https://lh3.googleusercontent.com/C5W6dHX0TCIv8tO2nPiwkAZtwJEzxr6gyCySXC0hklj8G3lPP-EEeMliwAb28GF37PUeKpvG=w640-h400-e365-rj-sc0x00ffffff",
        mime: "image/jpeg",
        page: "https://chrome.google.com/webstore/detail/my-cats-adorable-cat-kitt/gamgcdlfhmmigjmbffodgkpglbnejkjm",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnmeinraWIJbmFMKMZhZ2p9i_Zehc_LmtjJ6aOLVM_MAvFtJ_tlYr6Q_A&s",
        width: 640
    }])
})

//App Endpoints
app.get('/', (req, res) => {
    res.sendFile(__dirname+"/client/build/index.html");
});

app.get('/imageSearch/:term', (req, res) => {

    //search term
    var term = req.params.term || '';
    var start;
    var num;
    var getImagesBinary = req.query.getbinary || 'false';

    //parse offset parameter
    !!req.query.offset ? (!isNaN(Number(req.query.offset)) && Number(req.query.offset) > 0) ? start = req.query.offset : start = 1 :  start = 1
    !!req.query.num ? (!isNaN(Number(req.query.num)) && Number(req.query.num) > 0 && Number(req.query.num) <= 10) ? num = req.query.num : num = 10 :  num = 10

     //array of results
     var output = [];

     //google results length
     var resultsLength;

     //check if image objects are complete, then send to client.
     const isOutputComplete = () => {
         if(output.length === resultsLength){
            res.status(200).send(output);

            //save search history to either mongoDb or firebase
            if(!fireBaseConnected && process.env.ENV == 'development'){
               new searchHistory_image({
                   searchTerm: term,
                   timestamp: Date.now()
               }).save((error, doc) => {
                   if(error) console.log('nosave',error)
               });
               return 'SENT'
           }else if(fireBaseConnected){
               const imageSearchHistory = search.child('/imageSearchHistory');
               imageSearchHistory.push({
                   searchTerm: term,
                   timestamp: Date.now()
               });
               return 'SENT'
           }
        }
    };

     const fetchBuffer = (item) => {

         fetch(item.link).then(async res => {

            //response header's content-type
            let contentType = res.headers.raw()['content-type'][0];

            //if fetched content is image, process its buffer. else, fetch and process the thumbnail instead.
            if(contentType.includes('image/')){
                //return image buffer
                return {bufferPromise: res.buffer(), isThumbnail: false};
            }else{
                //get thumbnail
                var thumbNail = await fetch(item.image.thumbnailLink).then(res => res.buffer());
                //return thumbnail buffer
                return {bufferPromise: Promise.resolve(thumbNail), isThumbnail: true}
            }
         }).then(bufferObject => {
             bufferObject.bufferPromise.then(buffer => {
                let base64 = buffer.toString('base64');
                let isThumbnail = bufferObject.isThumbnail;

                //client response data structure
                let newItem = {
                    imageSrc: isThumbnail ? item.image.thumbnailLink : item.link,
                    thumbnail: item.image.thumbnailLink,
                    caption: item.snippet,
                    page: item.image.contextLink,
                    mime: item.mime,
                    width: item.image.width,
                    height: item.image.height,
                    imageBlob: {data: base64 || '', size: item.image.byteSize, type: 'image/jpeg'}
                }
                
                output.push(newItem);
                return isOutputComplete();
             })
         }).catch(e => {
             //if at some point couldn't fetch image for any reason, send the fetched ones
             console.log(e);
             --resultsLength;
             isOutputComplete();
         })
     }


     //search url
    let url = `https://www.googleapis.com/customsearch/v1?q=${term}&start=${start}&num=${num}&searchType=image&cx=${pseId_image}&key=${apiKey_image}`;

    //google search
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(json => json.items).then(results => {
        resultsLength = results.length;

        results.forEach((result) => {
            if(getImagesBinary == 'true'){
                //build output with images buffers
                fetchBuffer(result);
            }else{
                //build output without images bufferS
                output.push(result);
                isOutputComplete();
            }
        })
    }).catch(e => {
        console.log(e)
        res.status(400).send('Network Error!, Failed to fetch...\n'+e)
    })
});


app.get('/latest/imageSearch', async (req, res) => {

    var results = [];

    const getResults = async () => {

        if(!fireBaseConnected){

            await searchHistory_image.find().select({ _id: 0, searchTerm: 1, timestamp: 1 }).sort({ timestamp: -1 }).limit(10).then(data => {
                results = data;
            }).catch(e => console.log(e.message));

        }else if(fireBaseConnected){

            let pro = new Promise((resolve, reject) => {
                var tempArray = [];
                try{
                    //pull last 10 data from firebase database
                    var imageSearchHistory = search.child('/imageSearchHistory');
                    imageSearchHistory.limitToLast(10).on('value', snap => {
                        let shot = snap.val();
                        for(var i in shot){
                            if(shot[i] instanceof Object){
                                tempArray.push(shot[i])
                            }
                        }
                        resolve(tempArray)
                    })
                }catch(e){
                    reject('failed')
                }
            });
            await pro.then(rs => results = rs)
        }
    }
    await getResults()
    results = results.sort((a,b) => b.timestamp - a.timestamp)
    res.status(200).json(results)
});

app.get('/videoSearch/:term' , (req, res) => {
    res.status(400).send('Feature Coming Soon...')
})

app.listen(PORT, () => {console.log('App Listening on port ' + PORT)});
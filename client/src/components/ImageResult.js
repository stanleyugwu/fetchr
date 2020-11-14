import React from 'react';
import '../styles/ImageResult.css';

export default function ImageResult(props){
    let data = props.resultData;
    let hasBinaryData = !!data.imageBlob;
    let uri = data.imageBlob ? `data:${data.imageBlob.type};base64,${data.imageBlob.data}` : data.imageSrc;
    let txtFileUrl = hasBinaryData && URL.createObjectURL(new Blob([data.imageBlob.data],{type: 'text/plain'}))
    return(
        <div className="result image-result">
            <div className="img-wrap">
                <img src={uri} alt={data.caption}/>
            </div>
            <div className="img-cover">
              {hasBinaryData && (<div>
                <a href={uri} download={data.caption}><button><i className='mdi mdi-cloud-download'></i> Download Image</button></a>
                <a href={txtFileUrl} download={data.caption + ' (RAW BASE64)'}><button><i className='mdi mdi-cloud-download'></i> Download Binary</button></a>
              </div>)}
              <a href={data.imageSrc} target="_blank" rel="noreferrer"><button><i className='mdi mdi-web'></i> Visit Site</button></a>
            </div>
        </div>
    )
}
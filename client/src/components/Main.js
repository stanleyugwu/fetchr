import React from "react";
import Error from "./ErrorPane";
import Loader from "./Loader";
import ResultSet from "./ResultSet";
import '../styles/Main.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleQueryEntry = this.handleQueryEntry.bind(this);
    this.handlePageEntry = this.handlePageEntry.bind(this);
    this.handleQtyEntry = this.handleQtyEntry.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.imageSearch = this.imageSearch.bind(this);
    this.videoSearch = this.videoSearch.bind(this);

    this.state = {
      activeBtn: 1,
      searchMode: "Image",
      searchQuery: '',
      pageNumber: '',
      quantity: 1,
      loading: false,
      loadState: 'Searching For ',
      searchFailed: false,
      searchResults: [],
      searchCount: 0
    };
  }

  //Toggle Search mode between image and video
  changeSearchMode(mode){
    let activeBtn = mode.toLowerCase() === 'image' ? 1 : 2
    this.state.loading || this.setState({searchMode: mode, activeBtn:activeBtn})
  }

  //Handle search text entry
  handleQueryEntry(evt){
    let val = evt.target.value;
    this.setState({searchQuery: val.startsWith(' ') ? val.trim() : val});
  }

  //Handle Page Number Entry
  handlePageEntry(evt){
    let val = Number(evt.target.value);
    let isNum = !!Number(val);
    let isValid = isNum && val > 0 && val <= 100;
    this.setState((state) => ({pageNumber: isValid ? val : val > 100 ? state.pageNumber : ''}));
  }

  //Handle Quantity Entry
  handleQtyEntry(evt){
    this.setState({quantity: Number(evt.target.value)});
  }

  //Handle Searching
  handleSearch(evt){
    evt.preventDefault();
    this.state.searchMode === 'Image' ? this.imageSearch(evt) : this.videoSearch(evt);
  }

  //Perform Image Search
  imageSearch(evt){
    this.setState({loading: true, searchFailed: false});
    let searchTime = Date.now();
    
    let state = this.state, query = state.searchQuery, pagination = state.pageNumber, quantity = state.quantity; 
    
    fetch(`/imageSearch/${query}?offset=${pagination}&num=${quantity}&getbinary=true`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(res => {
      this.setState({loadState: 'Loading '});
      return res.json()
    }).then(data => {

      this.setState((prevState) => ({searchCount:++prevState.searchCount}));

      //image result data structure
      let set = {
        searchType: 'Image Search',
        mediaType: 'image',
        timeStamp: searchTime,
        searchTerm: this.state.searchQuery,
        searchCount: this.state.searchCount,
        data: data
      }

      //manual form reset and results update
      this.setState((prevState) => {
        return {
          loading: false,
          searchQuery: '',
          pageNumber: '',
          quantity: 1,
          loadState: 'Searching ',
          searchFailed: false,
          searchResults: [set, ...prevState.searchResults]
        }
      })

      //reset form
      evt.type === 'submit' && evt.target.reset();

    }).catch(e => {
      console.log(e)
      this.setState({loading: false, searchFailed: true})
    })
  }

  //Video Search
  videoSearch(evt){
    //NO VIDEO SEARCH FOR NOW
    alert("Hey!, Hope you're enjoying the app. video search feature would be arriving soon...")
  }

  render() {
    return (
      <main className="main-body">
        <div className="search-pane">
          <div className="search-mode-toggler">
            <button
              className={
                this.state.activeBtn === 1
                  ? "toggl-btn image active"
                  : "toggl-btn image"
              }
              onClick={this.changeSearchMode.bind(this, 'Image')}
            >
              Image Search
            </button>
            <button
              className={
                this.state.activeBtn === 2
                  ? "toggl-btn video active"
                  : "toggl-btn video"
              }
              onClick={this.changeSearchMode.bind(this, 'Video')}
            >
              Video Search
            </button>
          </div>
          <form id="search-form" onSubmit={this.handleSearch} disabled={this.state.loading ? true : false}>
            <div className="text-block">
              <label className="boxLabel" htmlFor="searchbox">
                <div className="searchbox-wrapper">
                  <input
                    id="searchbox"
                    type="search"
                    autoComplete="off"
                    tabIndex="1"
                    required={true}
                    onChange={this.handleQueryEntry}
                    value={this.state.searchQuery}
                    placeholder={"Search For " + this.state.searchMode}
                  />
                </div>
                <div className="searchbtn-wrapper">
                  <button
                    className="searchbtn"
                    disabled={this.state.loading}
                    tabIndex="2"
                    type="submit"
                  >
                    {this.state.loading ? (
                      <Loader size="v-small" />
                    ) : (
                      <i className="mdi mdi-magnify"></i>
                    )}
                  </button>
                </div>
              </label>
            </div>
            <div className="options-block">
              <div className="field pagination">
                <input type="number" min="1" max="100" placeholder="PAGE" onChange={this.handlePageEntry} value={this.state.pageNumber}/>
              </div>

              <select className="field quantity" ref={this.state.select} onChange={this.handleQtyEntry}>
                <option value="1">QTY</option>
                <option value="1">&ensp;1</option>
                <option value="2">&ensp;2</option>
                <option value="3">&ensp;3</option>
                <option value="4">&ensp;4</option>
                <option value="5">&ensp;5</option>
                <option value="6">&ensp;6</option>
                <option value="7">&ensp;7</option>
                <option value="8">&ensp;8</option>
                <option value="9">&ensp;9</option>
                <option value="10">&ensp;10</option>
              </select>

              <select className="field format" disabled={true}>
                <option value="FORMAT">FORMAT</option>
              </select>

              <select className="field language" disabled={true}>
                <option value="LANG">LANG</option>
              </select>
            </div>
          </form>
        </div>
        <div className="results-wrapper">

          {this.state.searchResults.length > 0 && (
            <div className="title-txt">
            <div className="lefter">
              <p>SEARCH RESULTS</p>
            </div>
          </div>
          )}

          {this.state.loading && <button className="cancel-search" onClick={()=>{
            this.setState({loading: false})}
          }>
            Cancel <i className="mdi mdi-window-close"></i>
          </button>}

          {this.state.searchFailed && <Error retryFunc={this.handleSearch}/>}
          {this.state.loading && <Loader progress={this.state.loadState + this.state.searchMode + 's'} size="normal"/>}
          <div className="results-inner">

              {this.state.searchResults.map((set, ind) => <ResultSet key={ind} setData={set}/>)}
          </div>
        </div>
      </main>
    );
  }
}

export default Main;

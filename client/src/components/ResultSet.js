import React from 'react';
import ImageResult from './ImageResult';
import VideoResult from './VideoResult';
import '../styles/ResultSet.css';

export default class ResultSet extends React.Component{
    constructor(props){
        super(props);
        this.state = { collapsed: false }
    }
    render(){
        let data = this.props.setData;
        let display = this.state.collapsed ? 'none' : 'block'; 
        return(
        <div className="result-set">
            <div className="set-info">
                <div className="two-wrap">
                    <div className="search-count">{data.searchCount}</div>
                    <div className="search-query">{data.searchType} for "{data.searchTerm}"</div>
                </div>
                <div className="search-time">
                    {this.state.collapsed ? <div className="collapse-btn" onClick={(evt) => {this.setState({collapsed: false})}}>
                        <i className="mdi mdi-menu-down"></i>
                    </div> : <div className="collapse-btn" onClick={(evt) => {this.setState({collapsed: true})}}>
                        <i className="mdi mdi-menu-up"></i>
                    </div>}
                    <div>
                       {new Date(data.timeStamp).toLocaleTimeString()}
                    </div>
                </div>
            </div>
            <div className="media-results" style={{display: display}}>
                {data.mediaType === 'image' ? data.data.map((result, ind) => {
                    return <ImageResult resultData={result} key={ind}/>
                }) : data.data.map((result, ind) => {
                    return <VideoResult resultData={result} key={ind}/>
                })}
            </div>
        </div>
        )
    }
}   
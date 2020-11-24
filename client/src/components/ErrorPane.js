import React from 'react';
import '../styles/ErrorPane.css'
import errorImage from '../images/search-error-image.svg';

export default function ErrorPanel(props){
    function retry(evt){
        evt.preventDefault()
        props.retryFunc(evt);
    }
    return (
        <div className="error-pane">
            <div className="error-image">
                <img src={errorImage} alt="error-icon" />
            </div>
            <div className="error-text">
                <h4 className="error-title">Network Error!!</h4>
                <div className="retry-cta">
                    <button onClick={retry}><i className="mdi mdi-refresh"></i> Try Again</button>
                </div>
            </div>
        </div>
    )
}
import React from 'react';
import '../styles/Loader.css';

export default function Loader(props){
    return(
        <div className={"loader-wrapper_"+props.size}>
            <div className='loader'>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
              {props.size !== 'v-small' && <p>{props.progress}</p>}
        </div>
    )
}
//Snippet Credit => reavenclaw @ https://codepen.io/reavenclaw
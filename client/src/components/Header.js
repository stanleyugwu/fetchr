import React from 'react';
import '../styles/Header.css';
import logo from '../images/logo.svg';

export default function Header(props){
    return (
        <header className="header" id="header">
            <div className="logo">
                <img src={logo} alt="site-logo" />
            </div>
        </header>
    )
}
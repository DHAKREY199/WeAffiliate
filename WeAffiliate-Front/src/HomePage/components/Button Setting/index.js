import React from 'react'
import App from './Components/Seeting'

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

export default class Setting extends React.Component{


    render()
    {
        
        return(
        <div className="container-fluid">
        
        <div className="page-header">
       <h1> <center>Button Setting</center></h1></div>
       <ul>
       <span>
                    {this.props.children}
                </span>
                <Alert stack={{limit: 3}} />
        <App />
        </ul>
          </div>




            )
    }
}
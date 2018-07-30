
import React from 'react';
import Category from './Components/Categories'
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


export default class CateorySetting extends React.Component
{
  
  render()
  {
    //
    return(
    <div className='container-fluid'>
    <div className="page-header">
       <h1> <center className='title'>Categories</center></h1></div>

    <span>
                    {this.props.children}
                </span>
                <Alert stack={{limit: 3}} />
    <Category/>
    </div>
    )
    
  }
} 



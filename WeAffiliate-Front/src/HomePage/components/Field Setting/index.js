import React from "react";

import { Provider } from "react-redux";

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import configureStore from './stores/configureStore'
import App from './components/App'
import './styles.css'
export default class Field extends React.Component 
{
    
render()
{
    const store=configureStore();
    return(
        <div className="content">
        
    <Provider store={store}>
   <div className="content">
   <div className="page-header">
   <h1> <center>Custom Fields</center></h1></div>
   <span>
                    {this.props.children}
                </span>
                <Alert stack={{limit: 3}} />
    <App/>
    </div>
    
    
  </Provider>
    </div>
)
}

}

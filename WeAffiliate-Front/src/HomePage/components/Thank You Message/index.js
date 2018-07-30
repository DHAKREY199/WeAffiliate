import React, {Component} from 'react';

import Alert from 'react-s-alert';
import App from './Components/App'
  
export default class ThankYou extends Component
{

render () {
     // console.log(this.state.value._cache)
    return (
        <div className="content">
        <div className="container-fluid">
        <span>
                    {this.props.children}
                </span>
                <Alert stack={{limit: 3}} />
      <App/></div>
       
      
    </div>
    );
  
}
}

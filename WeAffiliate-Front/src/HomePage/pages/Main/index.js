import React from "react";

import { Provider } from "react-redux";

import configureStore from '../../config/configureStore'
import App from './Dashboard'
import { HashRouter } from 'react-router-dom';


export default class Dashboard extends React.Component
{

render()
{
    const store=configureStore();
    return(
        <div className='content'>

    <Provider store={store}>

   <HashRouter>
    <App/>
    </HashRouter>




  </Provider>
    </div>
)
}

}

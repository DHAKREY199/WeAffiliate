import React from "react";

import FormContainer from '../containers/builders/FieldContainer'
import Defaul from '../components/builder/defaultFields'
import '../styles.css'
export default class App extends React.Component {
 constructor(props)
 {
   super(props)
   this.state={}
 }
   
  render()
  {
    
  return (
    
    <div className='container-fluid'>
      <div className='row'>
         
        <div className='newClass'>
        <Defaul/>
        </div>
        </div>
        <br/>
        <div className='row'>
        <div className="col-sm-10">
        <ul>
        <FormContainer/>
        </ul>
        </div>
        
        </div>
        
        </div>
      
 
  );
}
}
import React from 'react';


const SalesChart = () => (
  <div className='container'>
  <div className="col-sm-3">
    <div className="card">
    <ul>
      <h4 className="title">Total Users</h4>
      
      <p>0</p>
      <br/>
      <p className='category'>Web:0</p>
      <p className='category'>Android:0</p>
      <p className='category'>iOS:0</p>
      </ul>
      
    </div>
    </div>
    <div className="col-sm-3">
    <div className="card">
    <ul>
      <h4 className="title">Known Users</h4>
      <p>0</p>
      <br/>
      <p className='category'>Web :0</p>
      <p className='category'>Android :0</p>
      <p className='category'>iOS 0</p>
      </ul>
    </div>
    </div>
    <div className="col-sm-3">
    <div className="card">
    <ul>
      <h4 className="title">Monthly Users</h4>
      
      <p>0</p>
      <br/>
      <p className='category'>Web Users:0</p>
      <p className='category'>Android Users:0</p>
      <p className='category'>iOS Users:0</p>
      </ul>
      
    </div>
    </div>
   
     
  </div>
);

export default SalesChart;
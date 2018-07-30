import React from 'react'

import Builder from './builder'
 const Child = ({ match }) => (
  <div>
    <Builder id={match.params.id}/>
  </div>
);
export default Child

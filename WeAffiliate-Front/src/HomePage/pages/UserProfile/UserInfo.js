import React from 'react';
import axios from 'axios'
class UserInfo extends React.Component{

constructor(props)
{
  super(props)
  this.state={
    username:' ',user:' '

  }
}
componentDidMount(){
  var self=this
  axios("http://localhost:5000/api/client/dashboard/getClientProfile", {
    method: "get",
    withCredentials:true,

    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },


        }
        )
        .then(function(response)
        {
          let res=response.data.result[0]
          let user=res.firstname+' '+res.lastname
          let username=res.username
          self.setState({username:username})
          self.setState({user:user})


        })
        .catch(function(e)
        {
          console.log(e)
        })
   }

   render()
   {

   return(
  
  <div className="card card-user">
    <div className="image">

    </div>
    <div className="content">
      <div className="author">


          <h4 className="title">
            {this.state.user}<br />
            <small>{this.state.username}</small>
          </h4>

      </div>

    </div>
    <hr />
    <div className="text-center">
      <button href="#" className="btn btn-simple"><i className="fa fa-facebook-square"></i></button>
      <button href="#" className="btn btn-simple"><i className="fa fa-twitter"></i></button>
      <button href="#" className="btn btn-simple"><i className="fa fa-google-plus-square"></i></button>
    </div>
  </div>
);
   }
  }

export default UserInfo;

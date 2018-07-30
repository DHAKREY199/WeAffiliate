import React from 'react';
import axios from 'axios'

 axios.defaults.withCredentials=true
let data1
class  ProfileForm extends React.Component{
constructor(props)
{
  super(props)
  this.state={ user: {
        firstname: '',
        lastname: '',
        username: '',
        email:' ',
        password: '',
        organizationName:' ',
        phoneno:' ',
        subscriptionDetail:{expiryDate:' '},
        city:' ',
        country:' ',
        widgets:[]

    },submitted:false}
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
          data1=response.data.result[0]
          self.setState({user:data1})


        })
        .catch(function(e)
        {
          console.log(e)
        })
   }
   handleChange(event) {
       const { name, value } = event.target;
       let user = this.state.user;
          console.log(value)
           this.setState({
           user: {
               ...user,
               [name]: value
           }
       });

   }
   async handleSubmit()
   {

    this.setState({ submitted: true });
     const { user } = this.state;
     let payload=user
    // console.log(user)
     await axios.post("http://localhost:5000/api/client/dashboard/updateClientProfile",payload)
     .then(function(res)
   {
     console.log(res)


   })
   .catch(function(e)
 {
   console.log(e)
 })
   }

render()
{
  const { user,submitted } = this.state
  //console.log(user)
  return(



  <div className="card">
    <div className="header">
      <h4 className="title">Edit Profile</h4>
    </div>
    <div className="content">
      <form>
        <div className="row">
          <div className="col-md-5">
            <div className="form-group">
              <label>Company</label>
              <input type="string" className="form-control" name='organizationName'
              placeholder="Company" value={user.organizationName} onChange={this.handleChange.bind(this)}/>
               {submitted && !user.organizationName&&
                        <div className="help-block">Company Name is Required</div>
                    }
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label>Username</label>
              <input type="string" className="form-control" name='username' disabled
               placeholder="Username" value={user.username} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" name='email'
              placeholder="Email" value={user.email} onChange={this.handleChange.bind(this)}/>
              {submitted && !user.email &&
                        <div className="help-block">Email is required</div>
                    }
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>First Name</label>
              <input type="string" className="form-control" name='firstname'
              placeholder="FirstName" value={user.firstname} onChange={this.handleChange.bind(this)}/>
              {submitted && !user.firstname &&
        <div className="help-block">First Name is required</div>
                    }
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Last Name</label>
              <input type="string" className="form-control" name='lastname'
              placeholder="Last Name" value={user.lastname} onChange={this.handleChange.bind(this)}
              />
            </div>
          </div>
        </div>



        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>City</label>
              <input type="string" className="form-control"
              placeholder="City" name="city" value={user.city} onChange={this.handleChange.bind(this)} />
              {submitted && !user.city&&
                        <div className="help-block">City</div>
                    }
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Country</label>
              <input type="string" className="form-control"
              placeholder="Country" name="country" value={user.country} onChange={this.handleChange.bind(this)}/>
               {submitted && !user.country&&
                        <div className="help-block">Country Name is Required</div>
                    }
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>WidgetID</label>
              <input type="select" className="form-control" disabled
             value={user.widgets[0]} />
            </div>
          </div>

        </div>



        <div className="clearfix"></div>
      </form>
      <button type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-info btn-fill pull-right">Update Profile</button>
    </div>
  </div>
);
}
}

export default ProfileForm;

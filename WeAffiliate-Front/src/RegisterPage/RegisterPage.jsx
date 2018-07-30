import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { userActions } from '../_actions';
import './RegisterPage.css'
class RegisterPage extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        Password:true,
        user: {
            firstname: '',
            lastname: '',
            username: '',
            email:' ',
            password: '',
            organizationName:' ',
            phoneno:' ',
            subscriptionDetail:{expiryDate:' '},
            city:' ',
            country:' '

        },
        submitted: false
    };

  //  this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handlePassword(event,newValue) {
    if(event.target.newValue===this.state.user.password)
    {
        this.setState({Password:true})
    }
    else
    {this.setState({Password:false})}
}

handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstname && user.lastname && user.username && user.password) {
        dispatch(userActions.register(user));
    }
}
handleDate()
{
    var today=new Date()
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date)
   return date
}
render() {
console.log(this.state)
    const { registering  } = this.props;
    const { user, submitted } = this.state;
    return (
        <MuiThemeProvider>
      <div>
        <MuiThemeProvider>
       <div className="loginstyle">
       
       <h1 className='headingstyle'>
            Register Here</h1></div>
        </MuiThemeProvider>
          <div className='App'>
            <form name='form' onSubmit={this.handleSubmit.bind(this)}>
<div className={'form-group' + (submitted && !user.firstname ? ' has-error' : '')}>
<TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => {user.firstname=newValue}}
             />
    {submitted && !user.firstname &&
        <div className="help-block">First Name is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.lastname ? ' has-error' : '')}>
                <TextField
             hintText="Enter your Last  Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => {user.lastname=newValue}}
             />
                    {submitted && !user.lastname &&
                        <div className="help-block">Last Name is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                <TextField
                type="email"
             hintText="Enter your Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => {user.email=newValue}}
             />
                    {submitted && !user.email &&
                        <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                <TextField
             hintText="Enter a unique Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => {user.username=newValue}}
             />                    {submitted && !user.username &&
                        <div className="help-block">Username is Required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                <TextField
                type='password'
             hintText="Enter Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => {user.password=newValue}}
             />
                    {submitted && !user.password &&
                        <div className="help-block">Password is required</div>
                    }
                </div>
                              
                
                <div className={'form-group' + (submitted && !user.organizationName ? ' has-error' : '')}>
                <TextField
                
             hintText="Enter your Company Name"
             floatingLabelText="Company Name"
             onChange = {(event,newValue) => {user.organizationName=newValue}}
             />
                    {submitted && !user.organizationName&&
                        <div className="help-block">Company Name is Required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.phoneno ? ' has-error' : '')}>
                <TextField
                type='tel'
                hintText="Enter your Phone No"
                floatingLabelText="Phone No"
                onChange = {(event,newValue) => {user.phoneno=newValue}}
                />
                    {submitted && !user.phoneno&&
                        <div className="help-block">Phone No is Required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.subscriptionDetail ? ' has-error' : '')}>
                <TextField
                type='date'
                
                floatingLabelText="Subscribe to"
                onChange = {(event,newValue) => {user.subscriptionDetail=newValue}}
                />
                    {submitted && !user.subscriptionDetail&&
                        <div className="help-block">Subscription Detail is Required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.country? ' has-error' : '')}>
                <TextField
                hintText="Enter Country Name"
                floatingLabelText="Country Name"
                onChange = {(event,newValue) => {user.country=newValue}}
                />
                    {submitted && !user.country&&
                        <div className="help-block">Country Name is Required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.city? ' has-error' : '')}>
                <TextField
                hintText="Enter City Name"
                floatingLabelText="City"
                onChange = {(event,newValue) => {user.city=newValue}}
                />
                    {submitted && !user.city&&
                        <div className="help-block">City</div>
                    }
                </div>
                <div className="form-group">
                   <RaisedButton label={"Register"}
              primary={true} className="buttonstyle" onClick={this.handleSubmit.bind(this)}/>
                    {registering
                    }
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
                
            </form>
            </div>
        </div>
        </MuiThemeProvider>
    );
}
}

function mapStateToProps(state) {
const { registering } = state.registration;
return {
    registering
};
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };

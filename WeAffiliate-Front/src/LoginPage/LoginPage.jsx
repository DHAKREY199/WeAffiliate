import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './App.css'
import { userActions } from '../_actions';

const style = {
    margin: 30,
    
  };

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };


        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }
    
    render() {
         
        const { username, password, submitted } = this.state;
        return (
            <MuiThemeProvider>
            <div >
            
                <MuiThemeProvider>
       <div className="loginstyle">
       
       <h1 className='headingstyle'>
            WeAffiliate</h1></div>
        </MuiThemeProvider>
        
        
        <div className='App'>
                <form name="form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                   <RaisedButton label={"Login"}
              primary={true} className="buttonstyle" onClick={this.handleSubmit.bind(this)}/>
          <div>
             <Link to ='/register'><RaisedButton label={"Register"} primary={true} style={style} /></Link>
         </div>
         
                    
                </form>
                </div>
            </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 
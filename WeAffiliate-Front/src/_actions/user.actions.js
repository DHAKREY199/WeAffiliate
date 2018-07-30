import { userConstants } from '../_constants';
import { history } from '../_helpers';
import axios from 'axios'
axios.defaults.withCredentials=true
export const userActions = {
    login,
    logout,
    register,
   
};

function login(username, password) {
    return dispatch => {
        var payload={
            "username":username,
            "password":password
        }
        axios.post("http://localhost:5000/api/auth/login",payload,{credentials: 'same-origin',})
         
        .then(
             user => {
                
               // console.log(user)
                if(user.data.status===-1)
                {
                    alert('Invalid Username or Password')
                }
                else
                {
                        
              localStorage.setItem('user',1)
                
              //console.log(user)

                if(user.data.result.widgets.length===0)
                {
                    localStorage.removeItem('id')
                    return axios.post("http://localhost:5000/api/client/setClientSchema",{},{})
                    .then(function(response)
                {
                    console.log(response+'Here is new')
                    localStorage.setItem('id',user.data.result.widgets[0])
                    history.push('/')
                })
                .catch(function(e)
            {
                console.log(e)
            })
                }
                else
                {
                    localStorage.setItem('id',user.data.result.widgets[0])
                }
               console.log(user)
                
                console.log(localStorage.getItem('id'))
                dispatch(success(user));
               return  history.push('/');
                
                
              
                
                }


            },
                error => {
                    dispatch(failure(error.toString()));
                   
                }
            );
    };

    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    axios.post("http://localhost:5000/api/auth/logout",{})
    .then(function(response)
{
    console.log(response)
})
return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        var payload=user
        payload.subscriptionDetail= {
            expiryDate: "2019/06/24",
            active: true
          }

       console.log(payload)
        axios.post("http://localhost:5000/api/auth/signup",payload,{credentials: 'same-origin',})

            .then(
                user => {

                    if(user.data.status===-1)
                    {
                        alert('Invalid Username or Password')
                        console.log(user)
                    }
                    else
                    {
                        dispatch(success(user));


                        console.log(user)



                    history.push('/login');
                    console.log(user)
                    }


                    //localStorage.setItem('token', user.data.token);

                },
                error => {
                    dispatch(failure(error.toString()));
                   
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


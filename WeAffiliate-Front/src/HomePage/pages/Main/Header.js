import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import { history } from '../../../_helpers';

import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
let widgetid=localStorage.getItem('id')
const style=
{
  'font-size':'10px',
  
}
const badgestyle={
  'background-color': 'rgb(193, 167, 166)'
}
class Nav1 extends React.Component
{
  constructor(props)
  {
      super(props)
      this.state={
        isloggedin:true,
        count:0,
        totalfeeds:13,
        time: Date.now()
  }
  }
  componentDidMount()
  {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    var self=this
    axios("http://localhost:5000/api/feedback//getClientfeedbacks", {
            method: "get",
            withCredentials:true,

            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
                  },
                  params: {
                    widgetID: widgetid
                  },
                }
                )
                .then(function(response)
                {
                  
                  let totalfeedbacks=[]
                  for(var i=0;i<response.data.result.length;i++)
                  {
                    totalfeedbacks.push(response.data.result[i].feedback)
                  }
                  
                  for(i=0;i<totalfeedbacks.length;i++)
                  {
                    delete totalfeedbacks[i]._id
                  }
                  
                  let totalfeeds=totalfeedbacks.length
                  let prevfeeds=(self.state.totalfeeds)
                  let count=totalfeeds-prevfeeds
                  self.setState({count:count})
                  self.setState({totalfeeds:totalfeeds})
                })
                
                .catch(function(e)
                {
                  console.log(e)
                })
     }
     componentWillUnmount() {
      clearInterval(this.interval);
    }
   
  
 handleClick()
  {
  axios.post('http://localhost:5000/api/auth/logout',{})
  .then(function(response)
  {
    
    if(response.data.status===0)
    {
  
        localStorage.removeItem('user')
        history.push('/login')
      
      
    }
  
    
         
  })
  .catch(function(e)
  {
    console.log(e)
  })
  
  
  
  }
  
  render()
  {
    return(
      <Navbar fluid={true}>
      
        
        
        <Nav pullRight>
        
        
       <NavItem> <i style={style} className="fa fa-bell fa-2x">
       <NotificationBadge style={badgestyle} count={this.state.count} effect={Effect.SCALE}/>
       
       
       </i></NavItem>
          <NavItem>WidgetID</NavItem>
          
          <NavItem onClick={this.handleClick.bind(this)}><strong>Logout</strong></NavItem>
          
        </Nav>
        
      
    </Navbar>
    
    )
  }
}





export default withRouter(Nav1);
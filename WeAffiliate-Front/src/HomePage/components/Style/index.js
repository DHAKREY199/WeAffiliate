import React from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import Alert from 'react-s-alert';
import './Style.css'
export default class Style extends React.Component
{
  constructor(props)
  {
  super(props)
  this.state={value:' ',styleSetting:' '}
  }
  componentDidMount()
  {
      var self=this
    axios("http://localhost:5000/api/client/changeWidgetSetting/style/getStyle", {
        method: "get",
        withCredentials:true,

        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
              },

              params: {
                widgetID:localStorage.getItem('id')
              },
            }
            )
            .then(function(response)
            {
             let styleSetting=response.data.result[0].styleSetting
             
              self.setState({value:styleSetting})
            })
            .catch(function(e)
          {
            console.log(e)
          })
       
  }


      handleClick()
      {
        Alert.success('Your Style CSS has been saved', {
            position: 'top-right',
            effect: 'slide',
            timeout: 2000
           
        })
          let payload=this.state.value
          let response={
              widgetID:localStorage.getItem('id'),
              styleSetting:payload
          }
          axios.post("http://localhost:5000/api/client/changeWidgetSetting/style/updateStyle",response)
          .then(function(s)
        {
            console.log(s)
        })
        .catch(function(e)
        {
            console.log(e)
        })
      }
      handleChange(e)
      {
          
          this.setState({value:e.target.value})
         
      }
    render()
    {
        console.log(this.state.styleSetting)
        
        return(  <div className='col-md-12'>
       
      
                  <div className='col-md'><h4>Write Your Own CSS for your Feedback Form</h4></div>
                   <hr/>
                   
                   <textarea value={this.state.value}onChange={this.handleChange.bind(this)}className='textarea' rows="10" cols="40"></textarea>
             
               
      
             <div className='col-md-12'>
                <Button onClick={this.handleClick.bind(this)}bsStyle='primary' >Save</Button>
                </div>
                <span>
                    {this.props.children}
                </span>
                <Alert stack={{limit: 3}} />
                </div>)
    }
}
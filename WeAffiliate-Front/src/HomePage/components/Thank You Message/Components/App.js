import React, {Component} from 'react';
import RichTextEditor from 'react-rte';
import {Button,Jumbotron} from 'react-bootstrap'
import axios from 'axios'
import {ReactHTMLConverter }from 'react-html-converter/node'
import Alert from 'react-s-alert';
axios.defaults.withCredentials=true
var widgetid=(localStorage.getItem('id'))
var data1


const converter = new ReactHTMLConverter();

export default class MyStatefulEditor extends Component {
  constructor(props) {
      super(props)
   
  this.state = {
    value: RichTextEditor.createEmptyValue(),
    html:' ',
    showEdit:false
 
  }
  
}
componentDidMount(){
  var self=this
  axios("http://localhost:5000/api/client/changeWidgetSetting/thankyouMessage/getThankyouMessage", {
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
            data1=response.data.result[0].thankyouMessage
            self.setState({html:data1})
            
          })
          .catch(function(e)
          {
            console.log(e)
          })

 
   }

  

  onChange = (value) => {
    this.setState({value});
    value.toString('html')

    
  };
  handleSave()
  {
    Alert.success('ThankYou Message has been saved', {
      position: 'top-right',
      effect: 'slide',
      timeout: 2000
     
  });
    var data=this.state.html
    const payload={
      widgetID : widgetid,
      thankyouMessage:data


    }
    axios.post("http://localhost:5000/api/client/changeWidgetSetting/thankyouMessage/updateThankyouMessage", payload
                  
                      )
                        
                      
        .then(function(response)
        {
          
          console.log(response);
          console.log(payload)
          
        })
        .catch(function(e)
        {
          console.log(e)
        })
     

  }
  handleClick(value)
  {
    this.setState({html:this.state.value._cache.html})
    
       
    
    if(this.state.html==='undefined')

    this.setState(
      {html:'<p>Thank You For Yor <em><strong>Feedback<em><strong><img src="https://nodejs.org/static/images/logo-hexagon-card.png" width="224" height="256"/></p>'})

    this.setState({showEdit:false });
      
  }
  
  showEditPage() {
    this.setState({showEdit: true });
  }
  render () 

  
  {
    
    const open=
    (
  <div className='col-md-12'>
  <Jumbotron>

            <div className='col-md'><h4> Message Upon Successful Feedback Submission</h4></div>
             <hr/>
             
        <RichTextEditor
          value={this.state.value}
          onChange={this.onChange.bind(this)}

       
         /></Jumbotron>


       <div classNamame='col-md-12'>
          <Button bsStyle='primary' onClick={this.handleClick.bind(this)}>Preview</Button>
          </div>
          </div>
      
    )
    
    const Main=
    (
      <div>
      <div className='jumbotron'>
     
      
            <div className='col-md'><h4> Message Upon Successful Feedback Submission</h4></div>
             <hr/>
             
         
             <div className='row'>{converter.convert(this.state.html)}</div>
             
 <div className='pull-right'>
     
 
     <button type="button"
     onClick={this.showEditPage.bind(this)}><i className='fa fa-edit'/></button>
       </div>
      
      <div className="col-sm">
      </div></div>
      <div className='row'>
        
       </div>
       <div className='col-sm-2'>
      <Button bsStyle='success'bsSize='large' onClick={this.handleSave.bind(this)} >
      <i  className={`glyphicon glyphicon-save`} />
      Save</Button></div>
      </div>
       
    )
      
    return (
      <div>
      {this.state.showEdit ? open:Main}
      </div>
     
    );
  }
}
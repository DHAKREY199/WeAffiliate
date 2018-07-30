import React from 'react'
import {Form,FormGroup,Button,FormControl,ControlLabel,Modal,Col,Radio} from 'react-bootstrap'
import axios from 'axios'
import ColorPicker from 'react-color-picker'
import styled from "styled-components";
import Alert from 'react-s-alert';
import 'react-color-picker/index.css'


axios.defaults.withCredentials=true

var data1

     
export default class Setting extends React.Component{
  

    constructor(props)
    {
      
        super(props)
        this.state={
          textvalue:' ',
        showcolortab:[false,false,false],
        colorvalues:{textcolor:' ',bordercolor:' ',backgroundcolor:' '},
        advancedoptions:{displayshadow:false,displayicon:false},
        tabalignment:' ',showPreviw:false,imageUrl:"https://images.investwellonline.com/images/ins-software.png"
    }
    }
    componentDidMount(){
     var self=this
     var widgetid=(localStorage.getItem('id'))
     if(widgetid===undefined)
     {
      axios.post("http://localhost:5000/api/client/setClientSchema",{},{})
      .then(function(response)
  {
      localStorage.setItem('id',response.data.result.widgets[0])
      window.location.reload(true)
  })
  .catch(function(e)
{
  console.log(e)
})
     }
     
   axios("http://localhost:5000/api/client/changeWidgetSetting/button/getButtonSetting", {
                  method: "get",
                  
                  
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
          data1=response.data.result[0].buttonSetting
          console.log(response)
          const colorvalues=self.state.colorvalues
          colorvalues.textcolor=data1.textColor
          colorvalues.bordercolor=data1.borderColor
          colorvalues.backgroundcolor=data1.backgroundColor
          self.setState({colorvalues:colorvalues})
          self.setState({tabalignment:data1.feedbackTabAlignment})
          self.setState({textvalue:data1.text})
          
        })
        .catch(function(e)
        {
          console.log(e)
        })
      }
    
onDrag(color)
{ 
  
  for(var i=0;i<3;i++)
  {
  
    if(this.state.showcolortab[i]===true)
    
    {

      var index=i
      break;
    }
  }

  const colorvalues=this.state.colorvalues
  if(index===0)
colorvalues.textcolor=color
if(index===1)
colorvalues.backgroundcolor=color
if(index===2)
colorvalues.bordercolor=color
  
  this.setState({colorvalues:colorvalues})
  
}
    

handleClick(i)
{
    const show={...this.state.showcolortab}
    var index=i;
    for(var j=0;j<3;j++)
    {
      if(j===index)
      continue
      show[j]=false
    }
    if(show[index]===false)
    show[index]=true
    else
    show[index]=false
      
    this.setState({showcolortab:show})
 
}
handlecheckbox(i)
{

  if(i===0)
  {
  const opt=this.state.advancedoptions;
  opt.displayshadow=!opt.displayshadow
  this.setState({advancedoptions:opt})
  }
  else
  {
    const opt=this.state.advancedoptions;
  opt.displayicon=!opt.displayicon
  this.setState({advancedoptions:opt})
  }
 }
handleradio(i)
{
if(i===1)
this.setState({tabalignment:0})
else
{
  
this.setState({tabalignment:1})
}
}
handleImage(e)
{
  console.log(e.target.value)
  this.setState({imageUrl:e.target.value})
}
handletext(e)
{
this.setState({textvalue:e.target.value})
}
handlePreview()
{
  let showPreview=this.state.showPreviw
this.setState({showPreviw:!showPreview})
}
handleSave(e)
{
  e.preventDefault();
 Alert.info('Your Button Settings has been saved', {
      position: 'top-right',
      effect: 'slide',
      timeout: 2000
     
  });
  let widgetid=localStorage.getItem('id')
    const data={
      text:this.state.textvalue,
  textColor:this.state.colorvalues.textcolor,
  backgroundColor:this.state.colorvalues.backgroundcolor,
  borderColor:this.state.colorvalues.bordercolor,
  feedbackTabAlignment:this.state.tabalignment,
  
    }
    const payload={
      widgetID : widgetid,
      buttonSetting:data


    }
    axios.post("http://localhost:5000/api/client/changeWidgetSetting/button/updateButtonSetting", payload
                  
                      )
                        
                      
        .then(function(response)
        {
          
          console.log(response);
         })
        .catch(function(e)
        {
          console.log(e)
        })
     
}
   render()

    {
      const ModalStyle={
        'background-image':`url(${this.state.imageUrl})`,
        "height":"100vh",
        
      }
      const Wrapper = styled.button`
        color:${this.state.colorvalues.textcolor}; 
        font-weight: bold;
        padding: 0 20px;
        background: ${this.state.colorvalues.backgroundcolor};
        border: 3px solid ${this.state.colorvalues.bordercolor};
        
        float: right; 
        margin-right: -45px;
        width:120px;
        height:30px;
        transform:rotate(7deg);
        -ms-transform:rotate(270deg);
        -moz-transform:rotate(270deg);
        -webkit-transform:rotate(270deg);
        -o-transform:rotate(270deg)
`;
      
const App=(
<Modal


show={true} 
onHide={this.handlePreview.bind(this)}
animation={true} >
<Modal.Header closeButton></Modal.Header>
<div style={ModalStyle}>
 <Wrapper >
{this.state.textvalue}
</Wrapper>
</div>
<Button className='pull-right'bsStyle='danger' bsSize='xsmall' onClick={this.handlePreview.bind(this)}>Close</Button>
</Modal>)

      
      
        const textcolor=(

              
            <div className='container'>
              
              
              <ColorPicker 
              value={this.state.colorvalues.textcolor}
              onDrag={this.onDrag.bind(this)} />
  
              
                  </div>
        )
      const backgroundcolor=(


          <div className='container'>
            
          
            <ColorPicker value={this.state.colorvalues.backgroundcolor} 
            onDrag={this.onDrag.bind(this)} />

            
                </div>
      )
      const bordercolor=(


        <div className="container-fluid">
          
        
          <ColorPicker value={'red'} onDrag={this.onDrag.bind(this)} />

          
              </div>
    )
        return (
            <div className='conent'>
            <Form>
            <div className='row'>
        
            
                <div className='col-md-12'>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={4}>
                Choose Your Text
              </Col>
              <Col sm={2}>
                <FormControl type="text" placeholder="Feedbcak" 
                value={this.state.textvalue}
                onChange={this.handletext.bind(this)}
                
                    />
              </Col>
            </FormGroup>
            </div>
            </div>
            <div className='row'>
            <br/>
            <div className='col-md-8'>
            <FormGroup ><Col 
              componentClass={ControlLabel} sm={6}>
                Text Color
                </Col>
              
              <Col sm={3}>
          <div className='col-sm-2'>   
        <Button onClick={this.handleClick.bind(this,0)}>Pick Color</Button>
        
        {this.state.showcolortab[0]?textcolor:Setting}</div>
                    </Col>
          <Col sm={3}>
          <FormControl type='text' placeholder={this.state.colorvalues.textcolor} value={this.state.colorvalues.textcolor}/>
          </Col>

            </FormGroup>
            </div>
            </div>
          
            <div className='row'>
            <br/>
            <div className='col-md-8'>
            <FormGroup ><Col
              componentClass={ControlLabel} sm={6}>
                Background Color
                </Col>
              
                <Col sm={3}>
          <div className='col-sm-2'>   
        <Button onClick={this.handleClick.bind(this,1)}>Pick Color</Button>
        {this.state.showcolortab[1]?backgroundcolor:Setting}
        </div>
              </Col>
              <Col sm={3}>
              <FormControl type='text' placeholder={this.state.colorvalues.backgroundcolor}
              value={this.state.colorvalues.backgroundcolor}/>
              </Col>
            
            </FormGroup>
            </div>
            <Wrapper >
              {this.state.textvalue}
              </Wrapper>
            </div>
            <div className='row'>
            <br/>
            <div className='col-md-8'>
            <FormGroup ><Col 
              componentClass={ControlLabel} sm={6}>
                Border Color
                </Col>
              
                <Col sm={3}>
          <div className='col-sm-2'>   
        <Button onClick={this.handleClick.bind(this,2)}>Pick Color</Button>
        {this.state.showcolortab[2]?bordercolor:Setting}
        </div>
        
      

              </Col>
              <Col sm={3}>
              <FormControl type='text' placeholder={this.state.colorvalues.bordercolor}
              value={this.state.colorvalues.bordercolor}/>
              </Col>

            </FormGroup>
            </div>
            </div>
            <div className='row'>
            <br/>
            <div className='col-md-8'>
            <FormGroup>
            <Col componentClass={ControlLabel} sm={6}>
                Enter Your Page Image URL For Preview
              </Col>
              <Col sm={4}>
            <FormControl type='text' onChange={this.handleImage.bind(this)}
             placeholder={this.state.imageUrl}
             ></FormControl></Col>
            </FormGroup>
            </div>
            </div>
            <div className='row'>
            <br/>
            <div className='col-md-8'>
            <FormGroup ><Col 
              componentClass={ControlLabel} sm={6}>
                FeedBack Tab Alignment
                </Col>
              
              <Col sm={2}>
              
      <Radio defaultChecked={this.state.feedbackTabAlignment} onClick={this.handleradio.bind(this,0)} inline name="radioGroup">
        Left
      </Radio >{' '}</Col>
    <Col sm={2}>
      <Radio  onClick={this.handleradio.bind(this,1)} inline name="radioGroup">
            Right
      </Radio>{' '}</Col>
      </FormGroup>
      
            </div>
            </div>
            
              
          </Form>;

          
            <div className='row'>
    <Col smOffset={2} sm={2} >
      <Button  onClick={this.handlePreview.bind(this)}bsStyle='primary'>Preview</Button>
    </Col>
    <Col>
    
    <button onClick={this.handleSave.bind(this)}type='submit' className='btn btn-success'>Save </button>
    </Col>
    </div>
    {this.state.showPreviw?App:Setting}
  

                
                </div>




            )
    }
}
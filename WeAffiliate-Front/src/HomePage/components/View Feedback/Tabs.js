import React from 'react'
import {Tabs,Tab,Table,Modal} from 'react-bootstrap'
import axios from 'axios'
import './Tabs.css'
 axios.defaults.withCredentials=true
 var widgetid=(localStorage.getItem('id'))
 let data1,feedback=[]
export default class Heads extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state={
       key:'All Feedbacks',
      values:[],
      totalFeedbacks:[],
      categoryLabel:' ',nameLabel:' ',emailLabel:' ',domain:' ',screenshotLabel:' ',
      showModal:false,data:' '
     
      
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
          let data=response.data.result[0]
          
          let email=data.email
          var domain = email.substring(email.lastIndexOf("@") +1)
         
          self.setState({domain:domain})


        })
        .catch(function(e)
        {
          console.log(e)
        })
   
    axios("http://localhost:5000/api/form/getClientFormSetting", {
      method: "get",
      withCredentials:true,

      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
            },

            params: {
              widgetID:widgetid
            },
          }
          )
          .then(function(response)
          {
            
            let categoryLabel=response.data.result.defaultFields.category.label
            let nameLabel=response.data.result.defaultFields.name.label
            let emailLabel=response.data.result.defaultFields.email.label
            let screenshotLabel=response.data.result.defaultFields.attachScreenshot.label
            self.setState({screenshotLabel:screenshotLabel})            
            self.setState({categoryLabel:categoryLabel})
            self.setState({nameLabel:nameLabel})
            self.setState({emailLabel:emailLabel})
          })
          .catch(function(e)
                {
                  console.log(e)
                })
   axios("http://localhost:5000/api/client/changeWidgetSetting/category/getCategories", {
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
            let values=[]
            data1=response.data.result[0].categorySetting
            
            for(var i=0;i<data1.length;i++)
            {
              values.push(data1[i].name)
            }
           
            self.setState({values:values})
            self.setState({key:values[0]})
            })
          .catch(function(e)
          {
            console.log(e)
          })
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
                  feedback=totalfeedbacks
                  self.setState({totalFeedbacks:totalfeedbacks})
                })
                .catch(function(e)
                {
                  console.log(e)
                })
     }
     



handleSelect(key) 
{
  this.setState({key:key})
  }
  createUI()
  {
    let array=this.state.values
    return array.map((i)=>
    <Tab className='myClass' key ={i} eventKey={i} title={i}></Tab>
  )
  }
  screenshots=[]
tableUI()
{
  
  let currKey=this.state.key
  let totalFeeds=this.state.totalFeedbacks
  let thiscategoryfeeds=[]
  for(var i=0;i<totalFeeds.length;i++)
  {
    for(var j=0;j<totalFeeds[i].length;j++)
    {
      if(totalFeeds[i][j].label===this.state.categoryLabel)
      {
        if(totalFeeds[i][j].values[0]===currKey)
        {
          thiscategoryfeeds.push(feedback[i])
        }
      }
      else
      {
        continue
      }
    }
  }
  
  let from=[],email=[],date=[],feeds=[],screenshots=[]
  for(i=0;i<thiscategoryfeeds.length;i++)
  {
    feeds.push([])
    date.push(thiscategoryfeeds[i][0].date)
    for(j=0;j<thiscategoryfeeds[i].length;j++)
    {
      
      if(thiscategoryfeeds[i][j].label===this.state.nameLabel)
      {
        from.push(thiscategoryfeeds[i][j].values[0])
       
      }
     else if(thiscategoryfeeds[i][j].label===this.state.emailLabel)
      {
        email.push(thiscategoryfeeds[i][j].values[0])
       
      }
      else if(thiscategoryfeeds[i][j].label===this.state.categoryLabel)
      {
        
        continue
        
      }
     else  if(thiscategoryfeeds[i][j].label===this.state.screenshotLabel)
      {
        if(thiscategoryfeeds[i][j].values[0]===null)
        continue
        screenshots[i]=(<a  
        download={i+1} href={thiscategoryfeeds[i][j].values[0]}><i className='fa fa-picture-o'/></a>)
        }
      else
      {
       
          
         let schema={
           label:thiscategoryfeeds[i][j].label,
           value:thiscategoryfeeds[i][j].values
         }
         feeds[i].push(schema)
      }
    }
    
  }
  
  let maintable=[]
for(i=0;i<feeds.length;i++)
{
  let array=[]
  for(j=0;j<feeds[i].length;j++)
  {
    array.push(<tbody key={i+j}><tr><td><strong>{feeds[i][j].label}</strong></td><td><a>{feeds[i][j].value}</a></td></tr></tbody>)
  }
let feedtable=[<Table> {array}</Table>]
maintable.push(feedtable)
}
  let result=[]
  for(i=0;i<thiscategoryfeeds.length;i++)
  {
    const cursorstyle={
      'cursor':'pointer'
    }
  let value=[
  <tbody>
    
    <tr>
    
      <td>{i+1}</td>
      <td><strong>{from[i]||'Anonymous'}</strong></td>
      <td>{email[i]||'Not Present'}</td>
      <td>{date[i]}</td>
      <td>{screenshots[i]||' '}</td>
      <td >
    <i style={cursorstyle}onClick={this.handleClick.bind(this,maintable[i])}
     className="fa fa-sticky-note" aria-hidden="true" ></i>
      </td>
      <td><a href={`http://www.${this.state.domain}`} ><i className='fa fa-reply'/></a></td>
    </tr></tbody>]
    result.push(value)
  }
  return result
}

handleClick(e)
{
this.setState({showModal:!this.state.showModal})
this.setState({data:e})
  
}


    render()
    {
      const App=(
        <Modal
        show={true} 
        onHide={this.handleClick.bind(this)}
        animation={true} >
       <Modal.Body>
         {this.state.data}</Modal.Body>
         
        </Modal>
        )
        
      
         return(
          <div className='content'>
            <Tabs
            activeKey={this.state.key}
        onSelect={this.handleSelect.bind(this)}
        id='Feedback'
       >
        {this.createUI()}
              
            </Tabs>
            <div>
          
          <Table>
                  <thead>
                    <tr >
                      <th className='col-sm-1'>#</th>
                      <th className='col-sm-1'>From</th>
                      <th className='col-sm-1'>Email</th>
                      <th className='col-sm-1'>Date</th>
                      <th className='col-sm-2'>Screenshots</th>
                      <th >Feedbacks</th>
                      <th >Reply</th>
                    </tr>
                  </thead>
                  {this.tableUI()}
                  {this.state.showModal?App:Heads}
                 
                  </Table>
                  </div>
            </div>
        )
    }

}
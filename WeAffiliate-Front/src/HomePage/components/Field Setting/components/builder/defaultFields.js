import React from "react";  
import { bindActionCreators } from "redux";
import InlineEdit from 'react-edit-inline' 
import { connect } from "react-redux";
import axios from 'axios'
import {FormControl} from 'react-bootstrap'
import * as defaulth from '../../actions/fieldlist'
import EditableField from "../../components/builder/EdiatbleField";
axios.defaults.withCredentials=true
var widgetid=(localStorage.getItem('id'))
var data1,name
class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        defaultFieldvalues:{},
        }
    
    }
    componentDidMount(){
      var self=this
      axios("http://localhost:5000/api/client/changeWidgetSetting/fieldSetting/getFieldSetting", {
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
            data1=response.data.result[0].defaultFields
           
            
            delete data1._id
            name= Object.keys(data1).map(function(s){ return data1[s].label });
            self.setState({defaultFieldvalues:data1})
            
          })
          .catch(function(e)
          {
            console.log(e)
          })

       }
       
    handleChange(i,e, data) {
      var show=data.object
      data=data1
     if(e===0)
     {
       data.name.label=show
     }
     if(e===1)
     {
       data.email.label=show
     }
     if(e===2)
     {
       data.message.label=show
     }
     if(e===3)
     {
       data.category.label=show
     }
     if(e===4)
     {
       data.attachScreenshot.label=show
     }
 
      this.setState({...data})
      this.setState({defaultFieldvalues:data})
      
    }
   handleSelect(i,e)
   {
     
    var data=data1
   if(i===0)
   {
     data.name.typeOfField=e.target.value
   }
   if(i===1)
   {
     data.email.typeOfField=e.target.value
   }
   if(i===2)
   {
     data.message.typeOfField=e.target.value
   }
   if(i===3)
   {
     data.category.typeOfField=e.target.value
   }
   if(i===4)
   {
     data.attachScreenshot.typeOfField=e.target.value
   }
     
   this.setState({defaultFieldvalues:data})
   this.props.schema.defaultFields=this.state.defaultFieldvalues
  
   }
  selectUI(i)
   {
     
     let obj=this.state.defaultFieldvalues
    let typeOfField=Object.keys(obj).map(function(s)
  {
     return obj[s].typeOfField
  })
     return typeOfField[i]
    
   }
  
    createUI(){
      this.props.schema.defaultFields=this.state.defaultFieldvalues
      return Object.keys(this.state.defaultFieldvalues).map((item,i) => 
      <div key ={i} className='item col-md-12 well'>
          <div >
            <div>
                                <div className="col-sm-6">

                     <strong> <InlineEdit
              activeClassName="editing"
             text={name[i]}
              paramName="object"
              change={this.handleChange.bind(this,item,i)}></InlineEdit>
              </strong> <i className="fa fa-pencil fa-s" aria-hidden="true"></i>
                      
                      </div>
                    
            <div className='col-sm-4'>
            <FormControl style={{cursor:'pointer'}} 
            componentClass="select" defaultValue={this.selectUI(i)} onChange={this.handleSelect.bind(this,i)}>
                    <option value="mandatory">Mandatory Field</option>
                    <option  value="optional">Optional Field</option>
                    <option value="hidden">Hidden Field</option>
                  </FormControl>
      
      </div>
            </div>
            </div>
            
          </div>      
      )
    }
    
    render() {
      return (
        <div>
                  <div>
                  <ul>
                  <div className="page header"><b>Field Names(Click to Edit)</b></div>
                      </ul>
                      </div>

       <div>
        <ul>
            {this.createUI()} 
            </ul>
            </div>
            </div>
      );
    }
  }
  function mapStateToProps(state) {
    return {
      defaultFields:' ',
      error: state.form.error,
      schema: state.form.schema,
      uiSchema: state.form.uiSchema,
      formData: state.form.formData,
      dragndropStatus: state.dragndrop.dragndropStatus
     
    };
  }
  function mapDispatchToProps(dispatch,actions) {
    const actionCreators = {...defaulth};
    EditableField.defaultProps = Object.assign(
      {}, EditableField.defaultProps || {}, actions);
    return bindActionCreators(actionCreators, dispatch);
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
  
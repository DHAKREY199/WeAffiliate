import React from "react";
import FieldListDropdown from './FieldListDropdown';
import {Button, ButtonToolbar, ButtonGroup}  from "react-bootstrap";
import S from 'string'
import Alert from 'react-s-alert';
import axios from 'axios'
var widgetid=(localStorage.getItem('id'))
  export default class  FormActions extends React.Component 
{
  constructor(props)
  {
    super(props)
    this.state={}
  }
 
onClick (event)
{
  Alert.success('Your Field Settings has been saved', {
    position: 'top-right',
    effect: 'slide',
    timeout: 2000
   
});

  function slugify(string) {
    return S(string).slugify().replace("-", "_").s;
  }
    const props=this.props
var temp={
  fieldType:' ',
  label:' ',
  isCategorySpecific:false,
  categories:[],
  }
    let main=[]
   let fieldtypes=[],label=[],isCategories=[]
   fieldtypes= Object.keys(props.schema.properties).map(
     function(s){ return props.schema.properties[s].id });
    let i,l=fieldtypes.length 
label=Object.keys(props.schema.properties).map(
  function(s){ return props.schema.properties[s].title});
isCategories=Object.keys(props.schema.properties).map(
  function(s){ return props.schema.properties[s].showCategories});
 console.log(props)
for(i=0;i<l;i++)
{
  var choiceOfOption={
    label:' ',
    isMandatory:false,
    answerChoice:[],
    allowMultipleAnswer:false,
    displayOption:'false',
    selectedAnswer:[]

  }
  var commentBox={
    label:' ',
    isMandatory:false,
    NoOfCharacter:0,
    value:' '

  }
  var date={
    label:' ',
    isMandatory:false,
    DateFormat:' ',
    value:Date
  }
  var dropDownMenu={
    label:' ',
    isMandatory:false,
    defaultTextForDropdown:'',
    choices:[],
    allowMultipleAnswer:false,
    selectedChoice:[]
  }
  var rating={
    label:' ',
    isMandatory:false,
    ratingValue:1
  }
  var textBox={
    label:' ',
    isMandatory:false,
    value:' ',
    displayOption:false



  }
  temp={}
  
  temp.fieldType=fieldtypes[i]
  temp.label=label[i]
  if(isCategories[i].length===0)
  temp.isCategorySpecific=false
  else
  {
    temp.isCategorySpecific=true
    temp.categories=isCategories[i]
  }
 
  if(fieldtypes[i]==='textBox')
  {
     textBox.label=label[i]
     for(var j=0;j<props.schema.required.length;j++)
     {
       if(props.schema.required[j]===slugify(label[i]))
       {
         textBox.isMandatory=true
       }
       
     }
     textBox.displayOption=true
      temp.textBox=textBox
  }
  if(fieldtypes[i]==='rating')
  {
     rating.label=label[i]
     for(j=0;j<props.schema.required.length;j++)
     {
       if(props.schema.required[j]===slugify(label[i]))
       {
         rating.isMandatory=true
       }
       
     }
     rating.ratingValue=5
      temp.rating=rating
  }
  if(fieldtypes[i]==='dropDownMenu')
  {
     dropDownMenu.label=label[i]
     for(j=0;j<props.schema.required.length;j++)
     {
       if(props.schema.required[j]===slugify(label[i]))
       {
         dropDownMenu.isMandatory=true
         
       }
       
     }
     let name=slugify(label[i])
     
     dropDownMenu.defaultTextForDropdown=props.schema.properties[name].enum[0]
     dropDownMenu.choices=props.schema.properties[name].enum
     temp.dropDownMenu=dropDownMenu
     
  }
  if(fieldtypes[i]==='date')
  {
     date.label=label[i]
     for(j=0;j<props.schema.required.length;j++)
     {
       if(props.schema.required[j]===slugify(label[i]))
       {
         date.isMandatory=true
         
       }
       
     }
     date.DateFormat='yy/mm/dd'
     temp.date=date
     
  }
  if(fieldtypes[i]==='commentBox')
  {
     commentBox.label=label[i]
     for(j=0;j<props.schema.required.length;j++)
     {
       if(props.schema.required[j]===slugify(label[i]))
       {
         commentBox.isMandatory=true

         
       }
       
     }
     commentBox.value=''
     temp.commentBox=commentBox
     
  }
  if(fieldtypes[i]==='choiceOfOption')
  {
     choiceOfOption.label=label[i]
     for(j=0;j<props.schema.required.length;j++)
     {
       if(props.schema.required[j]===slugify(label[i]))
       {
         choiceOfOption.isMandatory=true
       }
       
     }
     let name=slugify(label[i])
     
     
     choiceOfOption.answerChoice=props.schema.properties[name].items.enum
     temp.choiceOfOption=choiceOfOption
     console.log(temp)
    
     
  }
  if(fieldtypes[i]==='radiobuttonlist')
  {
    console.log(props.schema.properties)
     choiceOfOption.label=label[i]
     for(j=0;j<props.schema.required.length;j++)
     {
       if(props.schema.required[j]===slugify(label[i]))
       {
         choiceOfOption.isMandatory=true
       }
       
     }
     let name=slugify(label[i])
     
     choiceOfOption.answerChoice=props.schema.properties[name].enum
     temp.choiceOfOption=choiceOfOption
    }
 
main[i]=temp
  }
//console.log(main)


const payload={
  widgetID : widgetid,
  defaultFields:props.schema.defaultFields,
  fieldSetting:main
}

axios.post('http://localhost:5000/api/client/changeWidgetSetting/fieldSetting/updateFieldSetting',payload)
  .then(function(response)
{
 console.log(payload.fieldSetting)

})
.catch(function(e)
{
  console.log(e)
})


}


 
  render()
  {
   const props=this.props
  return (
    
    <div className='conatiner'>
      <ButtonToolbar className="builder-inner-actions">
        <FieldListDropdown bsSize='large' className="pull-right" {...props}>
          <i className="glyphicon glyphicon-plus" />
          Add custom field
        </FieldListDropdown>
      </ButtonToolbar>
      <ButtonGroup className="pull-right">
        <Button bsSize='small' onClick={() =>  props.resetForm()}>
          <i className="glyphicon glyphicon-remove" />
          Reset <span className="hidden-xs">field</span>
        </Button>
        <Button bsStyle="success"bsSize='small' onClick={this.onClick.bind(this)}>
          <i className={`glyphicon glyphicon-save`} />
          Save Fields
        </Button>
      </ButtonGroup>
    </div>
  )
  }
}

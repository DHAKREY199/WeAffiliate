import React from 'react'
import axios from 'axios'
import {ReactHTMLConverter }from 'react-html-converter/node'
import Loader from 'react-loader-spinner'
import Form from "../HomePage/components/Field Setting/components/builder/Custom Field Settings";
import S from 'string'
import './Builder.css'
const converter = new ReactHTMLConverter();
function slugify(string) {
  return S(string).slugify().replace("-", "_").s;
}
export default class Builder extends React.Component
{

    constructor(props)
    {
        super(props)
        this.state={
          schema:{
            mainSchema:{
              title: "Have website related feedback or suggestions?",
            type: "object",
              required: [],
              properties:{
              }
            },
            uiSchema:{}

          },
          defaultFieldNames:[],
          categoriesName:[],
          defaultCategory:' ',
          customfields:[],
          categorySpecific:{},
          defaultCustomFields:[],
          categoryspecific:{},
          defaultFields:{},
          thankyouMessage: '',
          showThankYouMeassage:false,
          currentcategory:' ',
          styleSetting:' ',
          isLoading:false
        }
    }


    componentDidMount()
    {
       var self=this
       self.setState({isLoading:true})
setTimeout(function(){
  this.setState({isLoading:false});
}.bind(this),2000)
       axios("http://localhost:5000/api/client/changeWidgetSetting/style/getStyle", {
        method: "get",
        withCredentials:true,

        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
              },

              params: {
                widgetID:this.props.id
              },
            }
            )
            .then(function(response)
            {
             let styleSetting=response.data.result[0].styleSetting
              self.setState({styleSetting:styleSetting})
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
                      widgetID:this.props.id
                    },
                  }
                  )
                  .then(function(response)
                  {
                    
                   
                   let categories=response.data.result.categories
                   let defaultFields=response.data.result.defaultFields
                   let customFields=response.data.result.otherFields
                   let thankyouMessage=response.data.result.thankyouMessage[0].thankyouMessage
                   let defaultOtherFields=[]
                   let categoriesName=[],defaultCategory=' '
                   for(var i=0;i<categories.length;i++)
                   {
    
                       if(categories[i].display===true)
                       {
                         
                        categoriesName.push(categories[i].name)
                       }
                       if(categories[i].isDefault===true)
                       defaultCategory=categories[i].name
                   }
                   for(i=0;i<customFields.length;i++)
                   {
                     if(customFields[i].isCategorySpecific===false)
                     {
                       defaultOtherFields.push(customFields[i])
                     }
                   }
                     categoriesName.splice(0,0,defaultCategory)
                     const newCategories=Array.from(new Set(categoriesName))
                   self.setState({categoriesName:newCategories})
                   self.setState({defaultCategory:defaultCategory});
                   self.setState({thankyouMessage:thankyouMessage})
                   delete defaultFields._id
                   let newSchema=self.state.schema
                   self.setState({defaultFields:defaultFields})
                   let requiredFields=[]
                   let  defaultFieldNames=[],typeOfField=[]
                  defaultFieldNames=Object.keys(defaultFields).map(
                    function(s)
                    {
                      if(defaultFields[s].typeOfField==='mandatory')
                      {
                        requiredFields.push(s)
                      }
                      return defaultFields[s].label}
                    );
                    
                    typeOfField=Object.keys(defaultFields).map(
                      function(s)
                      {
                        
                        return defaultFields[s].typeOfField}
                      );
                    
                    const defaultFieldschemas=
                    {
                          name: {type: "string", title:' ',},
                          email: {type: "string", title:' ',format: "email"},
                          message: {type: "string", title:' '},
                          categories: {
                            title: ' ',
                            type: "string",
                            enum:[],
                            enumNames:[],
                          },
                          attachScreenShot:{type: "string",
                          format: "data-url",title:' '}
                    }
                    for(i=0;i<typeOfField.length;i++)
                      {
                            if(typeOfField[i]!=='hidden')
                            {
                              if(i===0)
                              {
                                defaultFieldschemas.name.title=defaultFieldNames[0]
                                newSchema.mainSchema.properties.name=defaultFieldschemas.name
                              }
                              else
                              if(i===1)
                              {
                                defaultFieldschemas.email.title=defaultFieldNames[1]
                                newSchema.mainSchema.properties.email=defaultFieldschemas.email
                              }
                              if(i===2)
                              {
                                defaultFieldschemas.message.title=defaultFieldNames[2]
                                newSchema.mainSchema.properties.message=defaultFieldschemas.message
                                newSchema.uiSchema.message={"ui:widget": "textarea"}
                              }
                              if(i===3)
                              {
                                defaultFieldschemas.categories.title=defaultFieldNames[3]
                                
                                newSchema.mainSchema.properties.categories=defaultFieldschemas.categories
                                newSchema.mainSchema.properties.categories.enum=newCategories
                                newSchema.mainSchema.properties.categories.enumNames=newCategories

                              }
                              if(i===4)
                              {
                                defaultFieldschemas.attachScreenShot.title=defaultFieldNames[4]
                                newSchema.mainSchema.properties.attachScreenShot=defaultFieldschemas.attachScreenShot

                              }
                            }
                      }
                      let defaultcustomFields=[]
                      for(i=0;i<customFields.length;i++)
                      {
                        if(customFields[i].isCategorySpecific===false)
                        {
                          defaultcustomFields.push(customFields[i].label)


                        }
                      }
                      self.setState({defaultCustomFields:defaultcustomFields})
                      let categoryspecific={}

                      for(i=0;i<newCategories.length;i++)
                      {
     
                           categoryspecific[newCategories[i]]=[newCategories[i]]
     
                      }
                      for(i=0;i<customFields.length;i++)
                      {
                        if(customFields[i].isCategorySpecific===true)
                        {
                         for(var j=0;j<customFields[i].categories.length;j++)
                         {
                           categoryspecific[customFields[i].categories[j]].push(customFields[i].label)
                         }
                       }
                       }
                       for(i=0;i<customFields.length;i++)
                       {
                         
                         if(customFields[i].isCategorySpecific===true)
                         {
                          
                           for(j=0;j<customFields[i].categories.length;j++)
                           {
                            
                             if(customFields[i].categories[j]===defaultCategory)
                             {
                              
                             defaultOtherFields.push(customFields[i])
                             }
                           }
                         }
                       }
                      
                      for(i=0;i<defaultOtherFields.length;i++)
                      {
                        let textBox={
                          type:'string',
                          title:' ',
                          maxLength:50,
                        }
                        let commentBox={
                          type:'string',
                          title:' ',
                        }
                        let dropDownMenu=
                        {
                          type:'string',
                          title:' ',
                          enum:[ ],
                          enumNames:[ ],
                        }
                        let checkBox=
                        {
                          type:'boolean',
                          title:' '
                        }
                        let choiceOfOption=
                        {
                          type: "array",
                          title: " ",
                          items: {
                            type: "string",
                            enum: [],
                          },
                          uniqueItems: true,
                        }
                        let rating={
                          title: "",
                          type: "integer",
                          minimum: 0,
                          maximum: 5
                        }
                        let date={
                          type: "string",
                          format: "date"
                        }
                        let radiobuttonlist={
                          type: "string",
                          title: " ",
                          enum: [ ],
                        }
                        if(defaultOtherFields[i].fieldType==='textBox')
                  {
                    textBox.title=defaultOtherFields[i].label
                    const _slug=slugify(defaultOtherFields[i].label)
                    newSchema.mainSchema.properties[_slug]=textBox
                  }
                  if(defaultOtherFields[i].fieldType==='commentBox')
                  {
                    commentBox.title=defaultOtherFields[i].label
                    const _slug=slugify(defaultOtherFields[i].label)
                    newSchema.mainSchema.properties[_slug]=commentBox
                    newSchema.uiSchema[_slug]= {
                      "ui:widget": "textarea",
                    }
                  }
                  if(defaultOtherFields[i].fieldType==='dropDownMenu')
                  {
                    dropDownMenu.title=defaultOtherFields[i].label
                    dropDownMenu.enum=defaultOtherFields[i].dropDownMenu.choices
                    dropDownMenu.enumNames=defaultOtherFields[i].dropDownMenu.choices
                    const _slug=slugify(defaultOtherFields[i].label)
                    newSchema.mainSchema.properties[_slug]=dropDownMenu
                  }
                  if(defaultOtherFields[i].fieldType==='checkBox')
                  {
                    checkBox.title=defaultOtherFields[i].label
                    const _slug=slugify(defaultOtherFields[i].label)
                    newSchema.uiSchema[_slug]= {

                    }
                    newSchema.mainSchema.properties[_slug]=checkBox
                  }
                  if(defaultOtherFields[i].fieldType==='choiceOfOption')
                  {

                    choiceOfOption.title=defaultOtherFields[i].label
                    const _slug=slugify(defaultOtherFields[i].label)
                    choiceOfOption.items.enum=defaultOtherFields[i].choiceOfOption.answerChoice
                    newSchema.uiSchema[_slug]={
                      "ui:widget": "checkboxes"
                    }
                    newSchema.mainSchema.properties[_slug]=choiceOfOption
                  }
                  if(defaultOtherFields[i].fieldType==='rating')
                  {
                    rating.title=defaultOtherFields[i].label
                    const _slug=slugify(defaultOtherFields[i].label)
                    newSchema.mainSchema.properties[_slug]=rating
                    newSchema.uiSchema[_slug]={
                      "ui:widget":"range"
                    }
                  }
                    if(defaultOtherFields[i].fieldType==='date')
                  {
                    date.title=defaultOtherFields[i].label
                    const _slug=slugify(defaultOtherFields[i].label)
                    newSchema.mainSchema.properties[_slug]=date
                    newSchema.uiSchema[_slug]={
                      "ui:widget": "alt-date"
                    }
                  }
                  if(defaultOtherFields[i].fieldType==='radiobuttonlist')
                  {
                    radiobuttonlist.title=defaultOtherFields[i].label
                    radiobuttonlist.enum=defaultOtherFields[i].choiceOfOption.answerChoice
                    const _slug=slugify(defaultOtherFields[i].label)
                    newSchema.mainSchema.properties[_slug]=radiobuttonlist
                    newSchema.uiSchema[_slug]={
                      "ui:widget": "radio",
                    }
                  }
                      }
                     // console.log(defaultOtherFields)
                      for(i=0;i<defaultOtherFields.length;i++)
                    {
                      let fieldname=defaultOtherFields[i].fieldType
                      if(fieldname==='radiobuttonlist')
                      {
                        fieldname='choiceOfOption'

                      }
                      if(defaultOtherFields[i].fieldType==='commentBox'||defaultOtherFields[i].fieldType==='checkBox')
                      {
                        continue
                      }
                      if(defaultOtherFields[i][fieldname].isMandatory)
                      {
                        let name=slugify(defaultOtherFields[i].label)
                        requiredFields.push(name)
                      }
                    }
                    
                  newSchema.mainSchema.required=requiredFields
                    
                    
                      self.setState({categorySpecific:categoryspecific})
                      self.setState({schema:newSchema})
                      self.setState({customfields:customFields})
                      let style= (self.state.styleSetting)
                      console.log(style)
                      console.log(self.refs.the)
                      self.refs.the.setAttribute('style', style);
                    
                      
                  })
                  .catch(function(e)
                  {
                    console.log(e)
                  })


             }

         handleChange(data)
         {
           let prevCategory=this.state.schema.mainSchema.properties.categories.enum[0]
           let currentcategory=data.formData.categories
           if(prevCategory!==currentcategory)
           {
           let categoryspecific={...this.state.categorySpecific}
           let defaultFields=this.state.defaultFields
           let map=Object.keys(categoryspecific).map(function(s)
          {
            return categoryspecific[s]
          }
          )
         let defaultFieldsMap=Object.keys(defaultFields).map(function(s)
            {
              return defaultFields[s]
            })
            let index=[]
          for(var i=0;i<map.length;i++)
          {
            if(map[i][0]===currentcategory)
            {

              for(var j=1;j<map[i].length;j++)
              index.push(map[i][j])

            }
          }
          
          let obj={...this.state.schema.mainSchema.properties}
          let defaultCustomFields=this.state.defaultCustomFields
             let propertiesMap=Object.keys(obj).map(function(s)
            {
              return obj[s].title
            })
           
            for(i=0;i<propertiesMap.length;i++)
            {
              for(j=0;j<defaultCustomFields.length;j++)
              {

                if(propertiesMap[i]===defaultCustomFields[j])
                {
                  propertiesMap.splice(i,1)
                }
              
              }
            }
            
            for(i=0;i<propertiesMap.length;i++)
            {
              if(defaultFieldsMap.length===0)
              break;
              for(j=0;j<defaultFieldsMap.length;j++)
              {
                if(propertiesMap[i]!=='undefined')
                {
                if(propertiesMap[i]===defaultFieldsMap[j].label)
                {

                  propertiesMap.splice(i,1)
                }
              }
              }
            }
            
          
            var toBeDeleted=[],toBeAdded=[]
            for(i=0;i<propertiesMap.length;i++)
            {
                let flag1=0
              for(j=0;j<index.length;j++)
              {
                if(propertiesMap[i]===index[j])
                {
                 flag1=1
                  break;
                }
              }

              if(flag1===0)
              {
                toBeDeleted.push(propertiesMap[i])
              }
            }
            for(i=0;i<index.length;i++)
            {


              let flag1=0
              for(j=0;j<propertiesMap.length;j++)
              {
                if(propertiesMap[j]===index[i])
                {
                 flag1=1
                  break;

                }

              }

              if(flag1===0)
              {
                toBeAdded.push(index[i])
              }
            }
            const newtoBeDeleted=Array.from(new Set(toBeDeleted))

          let customfields=this.state.customfields
          const newSchema=this.state.schema
          let prevcategories= newSchema.mainSchema.properties.categories.enum
           prevcategories.splice(0,0,currentcategory)
           let newCategories=Array.from(new Set(prevcategories))
           newSchema.mainSchema.properties.categories.enum=newCategories
           newSchema.mainSchema.properties.categories.enumNames=newCategories
              for(j=0;j<newtoBeDeleted.length;j++)
              {
                 let name=slugify(newtoBeDeleted[j])
                delete newSchema.mainSchema.properties[name]
              }
              let newrequire=newSchema.mainSchema.required
              
              for(i=0;i<newrequire.length;i++)
              {
                for(j=0;j<newtoBeDeleted.length;j++)
                {
                  let name=slugify(newtoBeDeleted[j])
                  if(newrequire[i]===name||newrequire[i]==='category')
                  {
                   
                    newrequire.splice(i,1)
                  }
                }
              }
              
              newSchema.mainSchema.required=newrequire


              for(j=0;j<toBeAdded.length;j++)
              {
                for(i=0;i<customfields.length;i++)
                {
                  let textBox={
                    type:'string',
                    title:' ',
                    maxLength:50
                  }
                  let commentBox={
                    type:'string',
                    title:' ',


                  }
                  let dropDownMenu=
                  {
                    type:'string',
                    title:' ',
                    enum:[ ],
                    enumNames:[ ],
                  }
                  let checkBox=
                  {
                    type:'boolean',
                    title:' '
                  }
                  let choiceOfOption=
                  {
                    type: "array",
                    title: " ",
                    items: {
                      type: "string",
                      enum: [],
                    },
                    uniqueItems: true,
                  }
                  let rating={
                    title: "",
                    type: "integer",
                    minimum: 0,
                    maximum: 10

                  }
                  let date={
                    type: "string",
            format: "date"


                  }
                  let radiobuttonlist={
                    type: "string",
                    title: " ",
                    enum: [ ],
                  }
                  if(toBeAdded[j]===customfields[i].label)
                  {
                  let name=customfields[i].fieldType
                  if(name==='textBox')
                  {
                    textBox.title=customfields[i].label
                    const _slug=slugify(customfields[i].label)
                    newSchema.mainSchema.properties[_slug]=textBox
                  }
                  if(name==='commentBox')
                  {
                    commentBox.title=customfields[i].label
                    const _slug=slugify(customfields[i].label)
                    newSchema.mainSchema.properties[_slug]=commentBox
                    newSchema.uiSchema[_slug]= {
                      "ui:widget": "textarea",
                    }
                  }
                  if(name==='dropDownMenu')
                  {
                    dropDownMenu.title=customfields[i].label
                    dropDownMenu.enum=customfields[i].dropDownMenu.choices
                    dropDownMenu.enumNames=customfields[i].dropDownMenu.choices
                    const _slug=slugify(customfields[i].label)
                    newSchema.mainSchema.properties[_slug]=dropDownMenu
                  }
                  if(name==='checkBox')
                  {
                    checkBox.title=customfields[i].label
                    const _slug=slugify(customfields[i].label)
                    newSchema.uiSchema[_slug]= {

                    }
                    newSchema.mainSchema.properties[_slug]=checkBox
                  }
                  if(name==='choiceOfOption')
                  {

                    choiceOfOption.title=customfields[i].label
                    const _slug=slugify(customfields[i].label)
                    choiceOfOption.items.enum=customfields[i].choiceOfOption.answerChoice
                    newSchema.uiSchema[_slug]={
                      "ui:widget": "checkboxes"
                    }
                    newSchema.mainSchema.properties[_slug]=choiceOfOption
                  }
                  if(name==='rating')
                  {
                    rating.title=customfields[i].label
                    const _slug=slugify(customfields[i].label)
                    newSchema.mainSchema.properties[_slug]=rating
                    newSchema.uiSchema[_slug]={
                      "ui:widget":"range"
                    }
                  }
                    if(name==='date')
                  {
                    date.title=customfields[i].label
                    const _slug=slugify(customfields[i].label)
                    newSchema.mainSchema.properties[_slug]=date
                    newSchema.uiSchema[_slug]={
                      "ui:widget": "alt-date"
                    }
                  }
                  if(name==='radiobuttonlist')
                  {
                    radiobuttonlist.title=customfields[i].label
                    radiobuttonlist.enum=customfields[i].choiceOfOption.answerChoice
                    const _slug=slugify(customfields[i].label)
                    newSchema.mainSchema.properties[_slug]=radiobuttonlist
                    newSchema.uiSchema[_slug]={
                      "ui:widget": "radio",
                    }
                  }
                      
                  

                  }
                }
              }
              
              newSchema.mainSchema.properties.name.default=data.formData.name
              newSchema.mainSchema.properties.message.default=data.formData.message
              newSchema.mainSchema.properties.email.default=data.formData.email
              this.setState({currentcategory:currentcategory})
              this.setState({schema:newSchema})
            }
            
    
           
         }
handleSubmit(data)
{
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();
let newDate=today.toLocaleDateString("en-US", options)
  let obj=this.state.schema.mainSchema.properties
  let formDataLabel=[]
  let label=Object.keys(obj).map(function(s)
{
  let defaultSchema={
    label:' ',
    values:[],
    date:newDate
  }
 
  if(s==='name')
  {
    defaultSchema.label=obj[s].title
    defaultSchema.values.push(data.formData[s])
    formDataLabel.push(defaultSchema)
  }
 else if(s==='categories')
  {
    defaultSchema.label=obj[s].title
    defaultSchema.values.push(data.formData[s])
    formDataLabel.push(defaultSchema)
  }
  else if(s==='message')
  {
    defaultSchema.label=obj[s].title
    defaultSchema.values.push(data.formData[s])
    formDataLabel.push(defaultSchema)
  }
  else if(s==='attachScreenShot')
  {
    defaultSchema.label=obj[s].title
    defaultSchema.values.push(data.formData[s])
    formDataLabel.push(defaultSchema)
  }
  else if(s==='email')
  {
    defaultSchema.label=obj[s].title
    defaultSchema.values.push(data.formData[s])
    formDataLabel.push(defaultSchema)
  
  }

  return s
  
})

for(var i = label.length - 1; i >= 0; i--)
{
  if((label[i]==='name')||(label[i]==='email')||(label[i]==='categories')||(label[i]==='message')||(label[i]==='attachScreenShot'))
  {
    
    label.splice(i,1)
  }
}
let newlabel=[]
//console.log(obj[label[0]])
for(i=0;i<label.length;i++)
{
  newlabel.push(obj[label[i]].title)
}


for( i=0;i<newlabel.length;i++)
{
  let schema={
    label:' ',
    values:[],
    date:today
  }
  let s=slugify(newlabel[i])
  schema.values.push(data.formData[s])
  schema.label=newlabel[i]
  
  formDataLabel.push(schema)
}
this.setState({showThankYouMeassage:true})
setTimeout(function(){
  this.setState({showThankYouMeassage:false});
}.bind(this),10000)

var payload={
  widgetID:this.props.id,
  feedback:formDataLabel
}


axios.post("http://localhost:5000/api/feedback/setClientfeedback",payload)
.then(function(res)
{
console.log(res)
})
.catch(function(e)
{
console.log(e)
})
}

         render()
         {
          
            
           const ThankyouMeassage=(

            <div className='Thankbody' style={{
              textAlign: 'center'
          }}>{converter.convert(this.state.thankyouMessage)}</div>


           )
           const builder=(
            <div className='container'>
            
            <Form schema={this.state.schema.mainSchema}
                 uiSchema={this.state.schema.uiSchema}
                 onChange={this.handleChange.bind(this)}
           onSubmit={this.handleSubmit.bind(this)}/>

           </div>
           )
         const loader=
           
            (
              <Loader 
                 type="Rings"
                 color="#00BFFF"
                 height="100"	
                 width="100"
              />   
             );
          

             return(
               <div ref="the">
               {this.state.isLoading?loader:this.state.showThankYouMeassage?ThankyouMeassage:builder}
              </div>
            )
         }
    }

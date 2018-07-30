export default {
  projectName: process.env.PROJECT_NAME || "Formbuilder",
  server: {
    remote: process.env.SERVER_URL,
    bucket: "formbuilder",
  },
  appURL: process.env.APP_URL || window.location.origin + window.location.pathname,
  
  fieldList: [
    {
      id: "textBox",
      icon: "glyphicon glyphicon-text-color",
      label: "Short text",
      jsonSchema:
      {
        type:'string',
        default:' ',
        


      },
      uiSchema:{
        
        editSchema:
        {
      type: "object",
      properties: {
        title: {type: "string", title: "Label"},
            description: {type: "string", title: "Example value"},
            required: {type: "boolean",title:'Mark as Mandatory'},
            displayOption:{
              type:'boolean',title:'Horizental (uncheck for Vertical Display)'


            }
      }
    }
  },
      
      formData: {} 
      
    },
    {
      id: "commentBox",
      icon: "align-left",
      label: "Comment Box",
      jsonSchema: {
        type: "string",
        title: "Edit me",
       
      },
      uiSchema: {
        "ui:widget": "textarea",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            description: {type: "string", title: "No Of Character"},
            required: {type: "boolean",title:'Mark as Mandatory'},
          }
        },
      },
      formData: {}
    },
    {
      id: "checkBox",
      icon: "check",
      label: "Checkbox",
      jsonSchema: {
        type: "boolean",
        title: "Edit me",
        default: false,
      },
      uiSchema: {
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
          }
        },
      },
      formData: {}
    },
    {
      id: "choiceOfOption",
      icon: "check",
      label: "Multiple choices",
      jsonSchema: {
        type: "array",
        title: "A multiple choices list",
        items: {
          type: "string",
          enum: [],
        },
        uniqueItems: true,
      },
      uiSchema: {
        "ui:widget": "checkboxes",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
            items: {
              type: "object",
              title: "Choices",
              properties: {
                enum: {
                  title: 'Choicelist',
                  type: "array",
                  items: {
                    type: "string"
                  },
                  default: ["choice 1", "choice 2", "choice 3"],
                }
              }
            }
          }
        },
      },
      formData: {}

    },
    {
    id: "radiobuttonlist",
      icon: "list",
      label: "Single Choice list",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "radio",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean",title:'  Mark as Mandatory'},
            enum: {
              type: "array",
              title: "Options",
              items: {
                type: "string"
              }
            }
          }
        },
      },
      formData: {}
    },
    
    {
      id: "rating",
      icon: "star",
      label: "Ratings",
      jsonSchema: {
        type: "integer",
        title: "Select Rating",
        minimum: 0,
              maximum: 5
        
      },
      uiSchema: {
        "ui:widget": "range",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
            
            properties:{
              title: "Integer range",
              type: "integer",
              minimum: 0,
              maximum: 10
            }
          }
      },
    },
      formData: {}
    },
    
    {
      id: "dropDownMenu",
      icon: "chevron-down",
      label: "Drop-Down Menu",
      jsonSchema: {
        type: "string",
        format: "string",
        title: "Edit me",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "select",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean",title:'Mark as Mandatory'},
            enum: {
              type: "array",
              title: "Options",
              items: {
                type: "string"
              }
            },
            allowmultiple:{type:'boolean',title:'Allow Multiple Answers'}
          }
        },
      },
      formData: {}
    },
    {
      id: "date",
      icon: "glyphicon glyphicon-calendar",
      label: "Date",
      jsonSchema: {
        type: "string",
        format: "date",
        title: "Edit me",
      },
      uiSchema: {
        "ui:widget": "alt-date",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"}
          }
        },
      },
      formData: {}
    },
    /*{
      id: "Files",
      icon: "glyphicon glyphicon-upload",
      label: "Upload File",
      jsonSchema: {
        type: "string",
        format: "data-url",
        title: "Edit me",
      },
      uiSchema: {
        
        editSchema: {
          title: "Files",
    type: "object",
    properties: {
      file: {
        type: "string",
        format: "data-url",
        title: "Files",
      },
    
       
      },
    },
  },
     
      formData: {}
    },*/
  ],
};
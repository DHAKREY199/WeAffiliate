import React, { Component } from "react";
import { Draggable, Droppable } from "react-drag-and-drop";
import Form from "./Custom Field Settings";
import SchemaField from "./Custom Field Settings/lib/components/fields/SchemaField";
import { ButtonToolbar, Button } from "react-bootstrap";
import FieldListDropdown from "./FieldListDropdown";
import axios from 'axios'
import {Modal} from 'react-bootstrap';

var widgetid=(localStorage.getItem('id'))

var temp=[]
axios.defaults.withCredentials=true

function pickKeys(source, target, excludedKeys) {
  const result = {};
  

  let isExcluded;
  for (let key in source) {
    isExcluded = excludedKeys.indexOf(key) !== -1;
    if (isExcluded) {
      continue;
    }
    result[key] = target[key];
  }
 
  return result;
}

function shouldHandleDoubleClick(node) {

  if (node.tagName === "INPUT" &&
      node.getAttribute("type") === "number") {
    return false;
  }
  return true;
}

class FieldPropertiesEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editedSchema: props.schema,
      
    };
  }
  

  onChange({formData}) {
    this.setState({editedSchema: formData});
   
  }
 

  render() {
    const {schema, name, required, uiSchema, onUpdate, onDelete} = this.props;
    const formData = {
      ...schema,
      required,
      ...this.state.editedSchema,
      name: this.state.name,
      show:{}
    };
    

    return (
      <div className="panel panel-default field-editor">
        <div className="panel-heading clearfix">
            <strong className="panel-title">{name}</strong>

            <ButtonToolbar className="pull-right">
              <FieldListDropdown {...this.props}>
              <i className="glyphicon glyphicon-edit"></i>
              </FieldListDropdown>
              <Button bsStyle="danger" bsSize='small' name="close-btn" onClick={onDelete}>
                <i className="glyphicon glyphicon-remove-sign"/>
              </Button>
              
            </ButtonToolbar>
        </div>
        <div className="panel-body">
          <Form
            schema={uiSchema.editSchema}
            formData={formData}
            onChange={this.onChange.bind(this)}
            onSubmit={onUpdate}>
            <Button  className="pull-right" bsStyle='success' bsSize='small' type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

function DraggableFieldContainer(props) {
  const {
    children,
    dragData,
    onEdit,
    onshowCategories,
    onDelete,
    onDoubleClick,
    onDrop
  } = props;
  return (
    <Draggable type="moved-field" data={dragData}>
      <Droppable types={["field", "moved-field"]}
        onDrop={onDrop}>
        <div className="row editable-field" onDoubleClick={onDoubleClick}>
          <div className="col-sm-9">
            {children}
          </div>
          <div className="col-sm-3 editable-field-actions">
            <Button bsStyle="link" bsSize='small'onClick={onEdit}>
              <i className="glyphicon glyphicon-edit"/>
            </Button>
            <Button bsStyle="link" bsSize='small'onClick={onshowCategories}>
              <i className="glyphicon glyphicon-cog"/>
            </Button>
            <Button bsStyle="link" bsSize='small'onClick={onDelete}>
              <i className="glyphicon glyphicon-trash"/>
            </Button>
          </div>
        </div>
      </Droppable>
    </Draggable>
  );
}

export default class EditableField extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: true, schema: props.schema,
      isOpen:false,categories:[],showcategories:[]
    };
  }
  componentDidMount(){
    var self=this
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
            var show=[]
            let data1=response.data.result[0].categorySetting
            for(var i=0;i<data1.length;i++)
            {
              if(data1[i].display===true)
              show.push(data1[i].name)
            }
            self.setState({categories:show})
            
          })
          .catch(function(e)
          {
            console.log(e)
          })
     }
  

  componentWillReceiveProps(nextProps) {
    this.setState({schema: nextProps.schema});
  }

  handleEdit(event) {
    event.preventDefault();
    event.preventDefault();
    if (shouldHandleDoubleClick(event.target)) {
      this.setState({edit: true});
    }
    //console.log(this.state.schema)
  }

  handleUpdate({formData}) {
   
    const updated = pickKeys(this.props.schema, formData, ['type']);
    
   let list={}
   list.id=this.props.name
   list.categories=[]
    const schema = {...this.props.schema, ...updated};
  
    this.setState({edit: false, schema,});
    this.props.updateField(
      this.props.name, schema, formData.required, formData.title);
      
      temp.push(list)
      this.state.showcategories.push(temp)
       
  }

  handleDelete(event) {
    event.preventDefault();
    
      this.props.removeField(this.props.name);
    
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({edit: false});
  }

  handleDrop(data) {
    const {name, swapFields, insertField} = this.props;
    if ("moved-field" in data && data["moved-field"]) {
      if (data["moved-field"] !== name) {
        swapFields(data["moved-field"], name);
      }
    } else if ("field" in data && data.field) {
      insertField(JSON.parse(data.field), name);
    }
    
  }
  
  handleShowCategories(i)
  {
    this.setState({
      isOpen: !this.state.isOpen
      
    });
   
  }
  handlecheck(e)
  {
    let flag=0
    
    let items=this.props.schema.showCategories
    for(var i=0;i<items.length;i++)
    {
      if(items[i]===e)
      {
        flag=1
        items.splice(i,1)
        break;
      }
    }
    if(flag===0)
    items.push(e)
    this.props.schema.showCategories=items
  
  }
  App()
  { 
    
return(
<Modal
show={true} 
onHide={this.handleShowCategories.bind(this)}
animation={true} >
<Modal.Header closeButton>
    Make this field category specific
  </Modal.Header>
  <Modal.Body>
{this.state.categories.map(t => 
          <div key={t}><input className='col-sm-2' 
          type='checkbox' onChange={this.handlecheck.bind(this,t)}></input>   <strong>{t}</strong></div>
          
          
          ) }
          </Modal.Body>
          
          <Modal.Footer><Button className='col-md-2'
          bsStyle="primary" bsSize='xsmall' onClick={this.handleShowCategories.bind(this)}
          >Modify</Button></Modal.Footer>
             

     </Modal>
     
    )
  }

  render() {
    
    
    //console.log(this.props)
    const props = this.props;
    if (this.state.edit) {
      return (
        <FieldPropertiesEditor
          {...props}
          onCancel={this.handleCancel.bind(this)}
          onUpdate={this.handleUpdate.bind(this)}
          onDelete={this.handleDelete.bind(this)} />
      );
    }
    


    if (props.schema.type === "object") {
      if (!props.name) {
        
        return <SchemaField {...props} idSchema={{$id: props.name}} />;
      }
    }

    return (
      <DraggableFieldContainer
        draggableType="moved-field"
        droppableTypes={["moved-field", "field"]}
        dragData={props.name}
        onEdit={this.handleEdit.bind(this)}
        onshowCategories={this.handleShowCategories.bind(this)}
        onCategoryList={this.state.showcategories}
        onDelete={this.handleDelete.bind(this)}
        onDoubleClick={this.handleEdit.bind(this)}
        onDrop={this.handleDrop.bind(this)}>
        {this.state.isOpen?this.App():EditableField}
        <SchemaField {...props}
          schema={this.state.schema}
          idSchema={{$id: props.name}} />
      </DraggableFieldContainer>
    );
  }
}

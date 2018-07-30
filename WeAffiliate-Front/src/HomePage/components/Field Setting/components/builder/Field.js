import React from "react";
import FormActionsContainer from "../../containers/builders/FieldActionsContainer";
import SchemaField from "./Custom Field Settings/lib/components/fields/SchemaField";

export default function Form(props) {
  const {error} = props;


  const registry = {
    ...SchemaField.defaultProps.registry,
    fields: {
      ...SchemaField.defaultProps.registry.fields,
      ...SchemaField.defaultProps.registry.definations,
      SchemaField: props.SchemaField,
      TitleField: props.TitleField,
      DescriptionField: props.DescriptionField,
    }
  };
  return (
    <div>
      {error ? <div >{error}</div> : <div/>}
      <div  >
      <div className='contaier'>
        <SchemaField {...props} registry={registry} />
      </div>
      
      <FormActionsContainer {...props}/>
      </div>
      
    </div>
  );
}

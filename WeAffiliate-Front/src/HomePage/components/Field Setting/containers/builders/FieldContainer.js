import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as FieldListActions from "../../actions/fieldlist";

import Form from "../../components/builder/Field";
import EditableField from "../../components/builder/EdiatbleField";
import TitleField from "../../components/builder/TitleFields";
import DescriptionField from "../../components/builder/DescriptionFields";
import defaultfields from '../../components/builder/defaultFields'
function mapStateToProps(state) {
  return {
    error: state.form.error,
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData,
    //status: state.serverStatus.status,
    dragndropStatus: state.dragndrop.dragndropStatus
  };
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {...FieldListActions};
  const actions = bindActionCreators(actionCreators, dispatch);
 
  EditableField.defaultProps = Object.assign(
    {}, EditableField.defaultProps || {}, actions);
    defaultfields.defaultProps = Object.assign(
      {}, defaultfields.defaultProps || {}, actions);
  TitleField.defaultProps = Object.assign(
    {}, TitleField.defaultProps || {}, actions);
  DescriptionField.defaultProps = Object.assign(
    {}, DescriptionField.defaultProps || {}, actions);
  return actions;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    SchemaField: EditableField,
    TitleField,
    DescriptionField,
    onChange: () => {}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Form);
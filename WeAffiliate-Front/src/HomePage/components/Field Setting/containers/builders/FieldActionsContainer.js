import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FieldActions from "../../components/builder/FieldActions";
import * as FieldListActions from "../../actions/fieldlist";
import config from "../../config";


function mapStateToProps(state) {
  return {
    fieldList: config.fieldList,
    schema: state.form.schema,
  };
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {...FieldListActions};
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldActions)

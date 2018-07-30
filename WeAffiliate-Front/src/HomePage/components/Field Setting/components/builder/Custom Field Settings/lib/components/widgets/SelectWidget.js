

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue(_ref, value) {
  var type = _ref.type;
  var items = _ref.items;

  if (type === "array" && items && ["number", "integer"].includes(items.type)) {
    return value.map(_utils.asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return (0, _utils.asNumber)(value);
  }
  return value;
}

function SelectWidget(_ref2) {
  var schema = _ref2.schema;
  var id = _ref2.id;
  var options = _ref2.options;
  var value = _ref2.value;
  var required = _ref2.required;
  var disabled = _ref2.disabled;
  var readonly = _ref2.readonly;
  var multiple = _ref2.multiple;
  var _onChange = _ref2.onChange;
  var enumOptions = options.enumOptions;

  return _react2.default.createElement(
    "select",
    {
      id: id,
      multiple: multiple,
      className: "form-control",
      value: value,
      required: required,
      disabled: disabled,
      readOnly: readonly,
      onChange: function onChange(event) {
        var newValue = void 0;
        if (multiple) {
          newValue = [].filter.call(event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            return o.value;
          });
        } else {
          newValue = event.target.value;
        }
        _onChange(processValue(schema, newValue));
      } },
    enumOptions.map(function (_ref3, i) {
      var value = _ref3.value;
      var label = _ref3.label;

      return _react2.default.createElement(
        "option",
        { key: i, value: value },
        label
      );
    })
  );
}

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    id: _react.PropTypes.string.isRequired,
    options: _react.PropTypes.shape({
      enumOptions: _react.PropTypes.array
    }).isRequired,
    value: _react.PropTypes.any,
    required: _react.PropTypes.bool,
    multiple: _react.PropTypes.bool,
    onChange: _react.PropTypes.func
  };
}

exports.default = SelectWidget;
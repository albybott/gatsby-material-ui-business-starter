/* eslint-disable */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _materialUiPickers = require("material-ui-pickers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FDateTimePicker =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(FDateTimePicker, _React$PureComponent);

  function FDateTimePicker() {
    _classCallCheck(this, FDateTimePicker);

    return _possibleConstructorReturn(this, _getPrototypeOf(FDateTimePicker).apply(this, arguments));
  }

  _createClass(FDateTimePicker, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          label = _this$props.label,
          field = _this$props.field,
          _this$props$form = _this$props.form,
          touched = _this$props$form.touched,
          errors = _this$props$form.errors,
          values = _this$props$form.values,
          setFieldValue = _this$props$form.setFieldValue,
          other = _objectWithoutProperties(_this$props, ["label", "field", "form"]);

      var errorText = errors[field.name];
      var hasError = touched[field.name] && errorText !== undefined;
      return _react.default.createElement(_materialUiPickers.DateTimePicker, _extends({
        label: label,
        error: hasError,
        helperText: hasError ? errorText : '',
        onChange: function onChange(value) {
          return setFieldValue(field.name, value);
        },
        value: values[field.name]
      }, other));
    }
  }]);

  return FDateTimePicker;
}(_react.default.PureComponent);

FDateTimePicker.propTypes = {
  label: _propTypes.default.string,
  field: _propTypes.default.shape({
    name: _propTypes.default.string
  }),
  form: _propTypes.default.shape({
    dirty: _propTypes.default.bool,
    errors: _propTypes.default.object
  }),
  fullWidth: _propTypes.default.bool,
  margin: _propTypes.default.oneOf(['none', 'dense', 'normal']),
  ampm: _propTypes.default.bool,
  autoOk: _propTypes.default.bool
};
FDateTimePicker.defaultProps = {
  fullWidth: true,
  margin: 'normal',
  ampm: false,
  autoOk: true
};
var _default = FDateTimePicker;
exports.default = _default;
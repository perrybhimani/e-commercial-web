"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var _default = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://pathbhimani:path@1312@cluster1.iqubqfo.mongodb.net/ecom?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingssecret',
  PAYPAL_CLIENTID: process.env.PAYPAL_CLIENTID || 'AbU437ewmnDI9HVjQ3ams4w1R9ZrMTR3d7VS0c2aINftVZrAc5derJUleULFewruf5QyYrYEu2eye6nr'
};
exports.default = _default;
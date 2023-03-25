"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("../backend/config"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRouter = _interopRequireDefault(require("../backend/routers.js/userRouter"));

var _productRouter = _interopRequireDefault(require("../backend/routers.js/productRouter"));

var _orderRouter = _interopRequireDefault(require("../backend/routers.js/orderRouter"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose'),
    dbNative = mongoose.connection.db;

_dotenv.default.config();

const mongodbUrl = "mongodb+srv://perrybhimani:perry@1604@ecom.w5yrq.mongodb.net/ecom?retryWrites=true&w=majority";
console.log(mongodbUrl); //Admin = mongoose.mongo.Admin;

const client = mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database ');
}).catch(err => {
  console.error(`Error connecting to the database. \n${err}`);
}); // mongoose.connection.on('open', function(){
//   mongoose.connection.db.connection(function(error, names) {
//     console.log("inside");
//     if (error) {
//       console.log("errrpr")
//       throw new Error(error);
//     } else {
//       names.map(function(name) {
//           console.log('found collection %s', name.namespace);
//       });
//     }
//   });
// });
// mongoose.connection.on('error', function(error){
//   throw new Error(error);
// });

const app = (0, _express.default)();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(_bodyParser.default.json());
app.use('/api/users', _userRouter.default);
app.use('/api/products', _productRouter.default);
app.use('/api/orders', _orderRouter.default);
app.get('/api/config/paypal', (req, res) => {
  console.log(_config.default.PAYPAL_CLIENTID);
  res.send(_config.default.PAYPAL_CLIENTID);
});
app.use(_express.default.static('frontend/build'));
app.get('*', (req, res) => {
  // console.log("hellp::")
  res.sendFile(_path.default.resolve(__dirname, '../frontend/build', 'index.html'));
});
app.listen(process.env.PORT || 5000, () => {
  console.log("server started http://localhost:5000");
});
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
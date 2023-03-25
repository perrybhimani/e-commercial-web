import express from 'express';
import dotenv from 'dotenv';
import config from '../backend/config';
var mongoose = require('mongoose')
  , dbNative = mongoose.connection.db;
  
import data from '../backend/data';
// import all of our models - they need to be imported only once
import Product from '../backend/models/productModel';
import bodyParser from 'body-parser';
import userRouter from '../backend/routers.js/userRouter'
import productRouter from '../backend/routers.js/productRouter'
import orderRouter from '../backend/routers.js/orderRouter'

import path from 'path';
dotenv.config();

const mongodbUrl = "mongodb+srv://perrybhimani:perry@1604@ecom.w5yrq.mongodb.net/ecom?retryWrites=true&w=majority";
console.log(mongodbUrl);
//Admin = mongoose.mongo.Admin;


const client = mongoose.connect(mongodbUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
    console.log('Connected to database ');
   //loadData();
   // var products = Product.find({});
  //  console.log(products);
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
 });
// mongoose.connection.on('open', function(){
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
const app = express();


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req,res)=>{
  console.log(config.PAYPAL_CLIENTID);
  res.send(config.PAYPAL_CLIENTID);
});
app.use(express.static('frontend/build'));


app.get('*', (req, res) => {
 // console.log("hellp::")
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});
app.listen(process.env.PORT || 5000,()=>{console.log("server started http://localhost:5000")});

process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated')
    })
  })
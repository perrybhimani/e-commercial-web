
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

import data from '../backend/data';
// import all of our models - they need to be imported only once
import Product from '../backend/models/productModel';


const stores = data.data;
console.log(stores)
async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Product.remove();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample\n\n');
  process.exit();
}

async function loadData() {
  try {
    //await Store.remove();
    //await Product.insertMany(stores);
 
    console.log('👍👍👍👍👍👍👍👍 Done!');
   // process.exit();
  } catch(e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
    console.log(e);
    process.exit();
  }
}
// }
// if (process.argv.includes('--delete')) {
//   deleteData();
// } else {
//   loadData();
// }

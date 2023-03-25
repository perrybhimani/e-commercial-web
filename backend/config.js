import dotenv from 'dotenv';
dotenv.config();


export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || "mongodb+srv://perrybhimani:perry@1604@ecom.w5yrq.mongodb.net/ecom?retryWrites=true&w=majority",
    JWT_SECRET: process.env.JWT_SECRET || 'somethingssecret',
    PAYPAL_CLIENTID: process.env.PAYPAL_CLIENTID ||'AbU437ewmnDI9HVjQ3ams4w1R9ZrMTR3d7VS0c2aINftVZrAc5derJUleULFewruf5QyYrYEu2eye6nr'
    };
  


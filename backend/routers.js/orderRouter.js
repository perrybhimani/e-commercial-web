import express from 'express';
import Order from '../models/orderModel';
import Product from '../models/productModel'
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/mine", isAuth, async (req, res) => {
 // const orders = await Order.find({}).populate('user');
  const orders = await Order.find({user:req.user._id}).populate('user');
  console.log(orders);
  res.send(orders);
});
router.get("/", isAuth,isAdmin, async (req, res) => {
  // const orders = await Order.find({}).populate('user');
   const orders = await Order.find({}).populate('user');
   res.send(orders);
 });
router.put('/:id/pay',isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payer.payer_id,
        orderID: req.body.id,
        paymentID: req.body.purchase_units[0].payments.captures[0].id
      }
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updatedOrder });
  }
  return res.status(500).send({ message: ' Error in Updating Order.' });
});


router.post('/', isAuth, async (req, res) => {

        const newOrder = new Order({
            orderItems: req.body.orderItems,
            user: req.user._id,
            shipping: req.body.shipping,
            payment: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
        });
        try {
            const newProduct = await newOrder.save();
            if (newProduct) {
                return res
                    .status(201)
                    .send({ message: 'New order placed', data: newProduct });
            }
        } catch (error) {
            console.log(error.message);
            return res.status(400).send(error.message);
        }
    

});
router.get("/:id", isAuth, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      console.log(order);

        res.send(order);
    } else {
        res.status(404).send("Order Not Found.")
    }
});
router.delete('/:id',isAuth, isAdmin,async (req, res) => {
  const deletedProduct = await Order.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});


export default router;

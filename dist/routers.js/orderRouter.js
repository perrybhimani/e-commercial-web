"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderModel = _interopRequireDefault(require("../models/orderModel"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/mine", _util.isAuth, async (req, res) => {
  // const orders = await Order.find({}).populate('user');
  const orders = await _orderModel.default.find({
    user: req.user._id
  }).populate('user');
  console.log(orders);
  res.send(orders);
});
router.get("/", _util.isAuth, _util.isAdmin, async (req, res) => {
  // const orders = await Order.find({}).populate('user');
  const orders = await _orderModel.default.find({}).populate('user');
  res.send(orders);
});
router.put('/:id/pay', _util.isAuth, async (req, res) => {
  const order = await _orderModel.default.findById(req.params.id);

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
    };
    const updatedOrder = await order.save();
    res.send({
      message: 'Order Paid.',
      order: updatedOrder
    });
  }

  return res.status(500).send({
    message: ' Error in Updating Order.'
  });
});
router.post('/', _util.isAuth, async (req, res) => {
  const newOrder = new _orderModel.default({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice
  });

  try {
    const newProduct = await newOrder.save();

    if (newProduct) {
      return res.status(201).send({
        message: 'New order placed',
        data: newProduct
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
});
router.get("/:id", _util.isAuth, async (req, res) => {
  const order = await _orderModel.default.findOne({
    _id: req.params.id
  });

  if (order) {
    console.log(order);
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.");
  }
});
router.delete('/:id', _util.isAuth, _util.isAdmin, async (req, res) => {
  const deletedProduct = await _orderModel.default.findById(req.params.id);

  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({
      message: 'Product Deleted'
    });
  } else {
    res.send('Error in Deletion.');
  }
});
var _default = router;
exports.default = _default;
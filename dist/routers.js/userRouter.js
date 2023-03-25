"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/signin', async (req, res) => {
  try {
    const signinUser = await _userModel.default.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (signinUser) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: (0, _util.getToken)(signinUser)
      });
    } else {
      res.status(401).send({
        message: 'Invalid Email or Password.'
      });
    }
  } catch (error) {
    console.log(error);
  }
});
router.post('/register', async (req, res) => {
  try {
    const user = new _userModel.default({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const newUser = await user.save();

    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: (0, _util.getToken)(newUser)
      });
    } else {
      res.status(401).send({
        message: 'Invalid User Data.'
      });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get('/F', async (req, res) => {
  console.log('new user created: ');

  try {
    const user = new _userModel.default({
      name: 'Basir',
      email: 'abc1@gmail.com',
      password: '12345',
      isAdmin: true
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    console.log(console.log(error));
    res.send({
      meg: error.message
    });
  }
});
var _default = router;
exports.default = _default;
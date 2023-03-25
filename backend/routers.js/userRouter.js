import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
   
    const  userlist = await User.find()
    
    if (userlist) {
      res.send(
        userlist
      );
      return;
    }
    res.status(401).send({ message: 'Invalid Email or Password.' });

  } catch (error) {
    console.log(error);
  }

});


router.post('/signin', async (req, res) => {
  try {
   
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (signinUser) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      });
      return;
    }
    res.status(401).send({ message: 'Invalid Email or Password.' });

  } catch (error) {
    console.log(error);
  }

});


router.post('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    const finduser = await User.findOne({ 'email': req.body.email }); 
    console.log(finduser);
    if (finduser) {
      res.status(401).send({ message: 'Email is already exist' })
    }
    else{
      const newUser = await user.save();

      if (newUser) {
        res.send({
          _id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: getToken(newUser),
        });

      } else {
        res.status(401).send({ message: 'Invalid User Data.' });
      }
    }
    } 
    catch (error) {
      console.log("helllo" + error.message);
      console.log(error);
    }

  });

router.get('/createadmin', async (req, res) => {
  console.log('new user created: ');
  try {
    const user = new User({
      name: 'Basir',
      email: 'abc1@gmail.com',
      password: '12345',
      isAdmin: true
    });

    const newUser = await user.save();
    res.send(newUser);
  }
  catch (error) {
    console.log("helllo" + error.message);
    res.send({ meg: error.message });
  }

});

router.put('/profile/:id', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password || user.password;
      }
      const updatedUser = await user.save();

      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser),
      });
      return;
    }
    res.status(401).send({ message: 'Invalid Email or Password.' });

  } catch (error) {
    console.log(error);
  }

});




router.get('/:id', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: getToken(user),
      });
      return;
    }
    res.status(401).send({ message: 'Invalid user.' });

  } catch (error) {
    console.log(error);
  }
});
export default router;
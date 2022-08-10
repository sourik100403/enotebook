const express = require('express');
const User = require('../models/User');
// ...rest of the initial code omitted for validation
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');//for password hashing
var jwt = require('jsonwebtoken');//for web token
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRATE = "notebook@#2022";



// route 1: create user using post "api/auth/create user   !!no login require";
router.post('/createuser', [
  body('name', 'Enter your name. minimum 4 charecter').isLength({ min: 4 }),
  body('email', 'Enter valid email id').isEmail(),
  body('password', 'password must be atleast 5 charecter').isLength({ min: 5 }),
], async (req, res) => {
  // if there are error return bad request and error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //check wheather the user email exits already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "sorry a user with this email already exits" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //create new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRATE);
    // res.json(user)
    res.json({ authToken })
    //catch error
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
})



//route 2:create user using post "api/auth/login   !!no login require";
router.post('/login', [
  body('email', 'Enter valid email id').isEmail(),
  body('password', 'password can not null').exists(),
], async (req, res) => {
  // if there are error return bad request and error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "please try to login correct credentials" })
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      return res.status(400).json({ error: "please try to login correct credentials" })
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRATE);
    res.json({ authToken })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
})


//route 3:get logged  user details using post "api/auth/getuser   !!login require";
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
})
module.exports = router
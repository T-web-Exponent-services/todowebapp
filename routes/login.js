const Joi=require('joi');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    //checking valid or not 400 bad request
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user=await User.findOne({email:req.body.email})

    //check email
    if(!user) return res.status(400).send('Invalid Email or Password');

    //Check password
    if(req.body.password != user.password) return res.status(400).send('Invalid Email or Password');

    res.send(true);


});
function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()
    };
  
    return Joi.validate(req, schema);
  }


module.exports=router;
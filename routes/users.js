const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    //checking valid or not 400 bad request
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user=await User.findOne({email:req.body.email})

    if(user) return res.status(400).send('User already registerd');

    //Register New User
    user=new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    await user.save();
    res.send(user);

});


module.exports=router;
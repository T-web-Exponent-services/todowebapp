const {List, validate} = require('../models/list');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/', async (req,res) =>{
    const lists= await List.find();
    res.send(lists);
});

router.post('/',async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let list = new List({ 
        taskname: req.body.taskname,
        document_upload:req.body.document_upload,
        description:req.body.description,
        completiondate:req.body.completiondate
    });

    list = await list.save();
    res.send(list);
});

router.put('/:id', async (req, res) => {
    //Query First Approch
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const list = await List.findByIdAndUpdate(req.params.id, { 
        askname: req.body.taskname,
        document_upload:req.body.document_upload,
        description:req.body.description,
        completiondate:req.body.completiondate 
    }, {new: true});
  
    if (!list) return res.status(404).send('The task with the given ID was not found.');
    
    res.send(list);
});

router.delete('/:id', async (req, res) => {
    const list = await List.findByIdAndRemove(req.params.id);
  
    if (!list) return res.status(404).send('The task with the given ID was not found.');
  
    res.send(list);
});


module.exports = router;
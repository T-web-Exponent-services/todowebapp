const Joi = require('joi');
const mongoose = require('mongoose');

const List = mongoose.model('List',new mongoose.Schema({
    taskname: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    document_upload:{
      type: Boolean,
      required:true
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
      },
      completiondate:{
        type: Date,
        required: true
      }
  }));
  function validateList(list) {
    const schema = {
      taskname: Joi.string().min(5).max(255).required(),
      document_upload: Joi.boolean().required(),
      description: Joi.string().min(5).max(1024).required(),
      completiondate: Joi.date().required()
    };
  
    return Joi.validate(list, schema);
  }


  exports.List=List;
  exports.validate=validateList;
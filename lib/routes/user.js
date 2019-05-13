let express = require('express'),
router = express.Router();
const Joi = require('@hapi/joi');
const cUser = require('../controller/user.js');
const respond = require('../../helpers/sendResponse.js');

router.get('*/test',(req,res,next)=>{
  console.log("user test")
  cUser.test((e,r)=>{
    if(e){
      respond.resError(res, e);
    }
    else{
      respond.resSuccess(res, {status: r});
    }
  })
});

router.post('*/requestOtp',(req,res,next)=>{
  var post = req.body;
  var schema = {
    pc:Joi.number().required(), //phone or country code
    pn:Joi.number().required() //phone number
  }

  try{
    var validation = Joi.validate(post, schema);
    if (validation.error) {
      throw new Error(validation.error.details[0].message);
    }
    post = validation.value;

    cUser.requestOtp(post,(e,r)=>{
      if(e){
        respond.resError(res, e);
      }
      else{
        respond.resSuccess(res);
      }
    })
  }
  catch(e){
    respond.resError(res, e, true, post);
  }

});

router.post('*/checkOtp',(req,res,next)=>{
  var post = req.body;
  var schema = {
    pc:Joi.number().required(), //phone or country code
    pn:Joi.number().required(), //phone number
    otp:Joi.number().required(), //otp
  }

  try{
    var validation = Joi.validate(post, schema);
    if (validation.error) {
      throw new Error(validation.error.details[0].message);
    }
    post = validation.value;

    cUser.checkOtp(post,(e,r)=>{
      if(e){
        respond.resError(res, e);
      }
      else{
        if(r.data){
          // update number
          cUser.checkUser(post, (e1,r1)=>{
            if(e1){
              respond.resError(res,"Error: Please try again.");
            }
            else{
              respond.resSuccess(res,r1);
            }
          });
        }
        else{
          respond.resError(res,"Otp mismatch");
        }
        // respond.resSuccess(res,r);
      }
    })
  }
  catch(e){
    respond.resError(res, e, true, post);
  }

});


module.exports = function (app) {
  app.use('/user/', router);
};


// to be moved to api server

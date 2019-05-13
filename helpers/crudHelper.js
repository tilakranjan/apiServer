const resmsg = require('./responseMessage.js')
const mongoose = require('mongoose');

module.exports = {
  responseObj: () => {
    return {
      status: 500,
      message: resmsg.ERROR_WHILE_PROCESSING
    }
  },

  convert: function convertObjectId(object){
    for(var x in object){
      if(typeof object[x] == typeof {}){
        convertObjectId(object[x]);
      }
      if(object[x] && object[x]["_id"] && object[x]["_id"] != "$$REMOVE"){
        var id = mongoose.Types.ObjectId(object[x]["_id"]);
        object[x]["_id"] = id
      }
    }
  }
};

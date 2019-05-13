const user={};
const queryDb=require("../../helpers/dbRequest.js");

user.test=(cb)=>{
  console.log("controller test")
  let reqObj = {
    model: 'Otp'
  };

  queryDb.records(reqObj, (pErr, pData) => {
    cb(null,{
      e:pErr,
      d:pData
    });
  });
}

user.requestOtp=(doc, cb)=>{
  let persReq = {
    model: 'Otp',
    "params": {
      "f":{
        "phone_code":doc.pc,
        "phone_no":doc.pn
      },
      "u":{
        "otp":Math.floor(Math.random()*90000) + 10000,
        "updated_on":Date.now()
      }
    }
  };
  queryDb.update(persReq, (pErr, pData) => {
    if (pErr) {
      cb(pErr)
    }
    else {
      cb(null, pData)
    }
  });
}

user.checkOtp=(doc, cb)=>{
  let persReq = {
    "model": "Otp",
    "params": {
      "phone_code":doc.pc,
      "phone_no":doc.pn,
      "otp":doc.otp
    }
  };
  queryDb.docs(persReq, (pErr, pData) => {
    if (pErr) {
      cb(pErr)
    }
    else {
      cb(null, pData)
    }
  });
}

// check user if user is new. If new, add user automatically.
user.checkUser=(doc,cb)=>{
  console.log("@checkUser")
  let persReq = {
    "model": 'User',
    "params": {
      "phone_code":doc.pc,
      "phone_no":doc.pn
    }
  };
  queryDb.docs(persReq, (pErr, pData) => {
    console.log("@checkUser Docs")
    console.log("err: ",pErr)
    console.log("pData: ",pData)
    if (pErr) {
      cb(pErr)
    }
    else {
      if(pData.data){
        // user exists. Do nothing.
        cb(null,pData.data[0])
      }
      else{

        // add user
        let saveReq = {
          "model": 'User',
          "params": {
            "phone_code":doc.pc,
            "phone_no":doc.pn,
            "joined_on":Date.now()
          }
        };
        queryDb.save(persReq, (aErr,aData) => {
          console.log("@checkUser save")
          console.log("err: ",aErr)
          console.log("pData: ",aData)

          if(aErr){
            cb(err)
          }
          else{
            if(aData.data){
              cb(null, aData.data)
            }
            else{
              cb(aData.error)
            }
          }
        });

      }
    }
  });
}


module.exports=user;

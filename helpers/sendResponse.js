const theFunctions = {};

theFunctions.resError = (res,e)=>{
  res.json({success:false, error:e.message||e});
}

theFunctions.resSuccess = (res,d)=>{
  res.json({success:true, result:d});
}

module.exports=theFunctions;

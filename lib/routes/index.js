const user_routes = require('./user.js');
const {logWriter} = require ('../../helpers/logger.js')

const routes =(app)=>{
  // sample
  app.get('/test',(req,res,next)=>{
    // sample logger
    // log the request
    logWriter("", 'test-request' + Date.now() + '.txt', 'test');
    // log the success response
    logWriter("", 'test-response-success' + Date.now() + '.txt', 'test');
    // log the error response
    logWriter("", 'test-response-error' + Date.now() + '.txt', 'test');

    res.status(200).send('Server is up and running!');
  });

  user_routes(app);
}
module.exports = routes;

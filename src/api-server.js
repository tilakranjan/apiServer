const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors')
const config = require('./config');
const routes  = require('../lib/routes/index.js');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors())
routes(app);

app.get('*', function(req, res){
  res.status(404).send('Are you lost!??');
});

app.listen(config.app.port, () => console.log(`app listening on port ${config.app.port} !`))

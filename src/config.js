const env = process.env.NODE_ENV || 'dev'; // 'dev' or 'test' or 'prod'

const dev = {
 app: {
   port: 5800
 },
 dbServer:"http://localhost:5900/crud/"
};

const prod = {
 app: {
   port: 5800
 },
 dbServer:"http://localhost:5900/crud/"
};

const config = {
 dev,
 prod
};

module.exports = config[env];

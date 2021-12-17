const VERSION = "0.1.11"; //Change this to force-log everyone

const configs = {
  development: {
    SERVER_URI: 'http://localhost:5000',
    VERSION
  },
  production: {
    SERVER_URI: 'https://aspalwebgame.herokuapp.com',
    VERSION
  },
};

module.exports.config = configs[process.env.NODE_ENV];
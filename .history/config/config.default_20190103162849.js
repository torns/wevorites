'use strict';
require("dotenv").config()
module.exports = appInfo => {

  const config = exports = {};

  config.webURL = 'http://localhost:7001'

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546418708365_8550';

  config.githubConfig = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  }

  // add your config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27019/wevorites',
      options: {},
    },
  };

  config.view = {
    defaultViewEngine: '.ejs',
    mapping: {'.html': 'ejs'}
  } 

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};

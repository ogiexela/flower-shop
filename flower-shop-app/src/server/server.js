const path = require('path');
const proxy = require('express-http-proxy');

const html = path.resolve('./app/flower-shop-app');

const port = process.env.PORT || 8080;
const API_HOST = 'http://localhost:3000';

// Express
const express = require('express');
const app = express();
const compression = require('compression');

const morgan = require('morgan');

app
  .use(morgan('combined'))
  .use(compression())
  // Static content
  .use(express.static(html))
  // PROXY API CALLS
  .use('/api', proxy(API_HOST))
  // for everything else serve index.html
  .use((_req, res) => {
    res.sendFile(html + '/index.html');
  })
  // Start server
  .listen(port, () => {
    console.info('Port: ' + port);
    console.info('Html: ' + html);
  });

const path = require('path');
const express = require('express');

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, '/build/index.html');

    app.use(express.static('build'))
    app.get('/', function (_, res) { res.sendFile(indexPath) });

    return app;
  }
}

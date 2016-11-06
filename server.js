const path = require('path');
const express = require('express');
// process.env.PWD = process.cwd()

module.exports = {
  app: function () {
    const app = express();
    // const indexPath = path.join(__dirname, '/build/index.html');
    // const publicPath = path.join(__dirname, 'build');
    app.use(express.static(process.cwd() + '/build'));

    // app.use(express.static(publicPath));
    // app.get('/', function (_, res) { res.sendFile(indexPath) });

    return app;
  }
}

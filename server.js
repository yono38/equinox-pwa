const path = require('path');
const express = require('express');
// process.env.PWD = process.cwd()

module.exports = {
  app: function () {
    const app = express();
    // const publicPath = path.join(__dirname, 'build');
    app.use(express.static(process.cwd() + '/build'));

    // send all requests to index.html so browserHistory in React Router works
    app.get('*', function (req, res) {
      const indexPath = path.join(__dirname, '/build/index.html');
      res.sendFile(indexPath);
    })

    // app.use(express.static(publicPath));
    // app.get('/', function (_, res) { res.sendFile(indexPath) });

    return app;
  }
}

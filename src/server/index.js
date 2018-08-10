const express = require('express');

const port = process.env['PORT'] || 3000;

const app = express();
app.use('/', express.static('./public'));
app.get('/health', function(req, res) {
  res.send('OK');
});
app.use('/*', (req, res, next) => {
  res.redirect('/');
});

app.listen(port, err => {
  if (err) {
    return console.log('Errored on the server start:', err);
  }
  console.log(`The server is listening on port ${port}`);
});

const express = require('express');

const port = process.env['PORT'] || 3000;

const app = express();
app.use('/web', express.static('./public'));
app.get('/health', function(req, res) {
  res.send('OK');
});
app.use('/web/*', (req, res, next) => {
  res.redirect('/web');
});

app.listen(port, err => {
  if (err) {
    return console.log('Errored on the server start:', err);
  }
  console.log(`The server is listening on port ${port}`);
});

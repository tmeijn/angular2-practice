const router = require('express').Router();

router.get('/', function(request, response) {
  response.render('index.html');
});

module.exports = router;


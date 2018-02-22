var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/test', function(req, res, next) {
    res.render('renew_view');
});

router.get('/analysis', function(req, res, next) {
    res.render('analysis');
});

router.get('/format', function (req, res, next) {
   res.render('format');
});

module.exports = router;

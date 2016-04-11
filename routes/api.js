var express = require('express'); var router = express.Router(); 
//Router
 var Result = require('../models/results') 
//router.get('/results',function(req,res){
//    res.send('test')
//})
Result.methods(['get','put','post','delete']);
Result.register(router,'/results');
module.exports = router;

import express from 'express';
var router = express.Router();

/* AUTOR */
router.get('/', function(req, res, next) {
  res.render('author', {
     author: 'ALDO',
     lastname: 'DORADO'

     });
});

export default router;

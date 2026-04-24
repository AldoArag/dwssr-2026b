import express from 'express';
const router = express.Router();

/* GET home page. */
//eslint-disable-next-line no-unused-vars
router.get('/', function(req, res, next) {
  res.render('index', { title: '✨Proyecto asombroso' });
});

export default  router;

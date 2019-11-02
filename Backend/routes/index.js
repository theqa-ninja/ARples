import express from 'express';
// import process from './process';

const router = express.Router();
// router.use('/process', process);

router.get('/', function(req, res) {
  res.json({ message: 'hooray! api works!' });
});

export default router;

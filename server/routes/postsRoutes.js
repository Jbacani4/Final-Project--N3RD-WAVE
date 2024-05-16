const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
  res.json("post ROUTES");
});

module.exports = router;
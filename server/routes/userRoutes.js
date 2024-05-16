const { Router } = require('express');

const {registerUser, loginUser, getUser, changeAvatar} = require('../controllers/userController')

const router = Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.post('/change-avatar', changeAvatar)

router.get('/', (req, res, next) => {
  res.json("USER ROUTES");
});

module.exports = router;
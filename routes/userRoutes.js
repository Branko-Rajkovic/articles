const express = require('express');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPasword,
  updatePassword,
  protect,
  restrictTo,
} = require('../controllers/authControler');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get(
  '/me',
  protect,
  restrictTo('user', 'admin', 'superadmin'),
  getMe,
  getUser
);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPasword);

router.patch('/update-password', protect, updatePassword);

router.patch('/update-me', protect, uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/delete-me', protect, deleteMe);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;

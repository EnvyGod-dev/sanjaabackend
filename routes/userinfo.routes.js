const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const controller = require('../controllers/userinfo.controller');

router.post('/', upload.single('avatar'), controller.createUserInfo);
router.get('/by-user/:userId', controller.getUserInfoByUserId);

router.put('/by-user/:userId', controller.updateUserInfoByUserId);

module.exports = router;

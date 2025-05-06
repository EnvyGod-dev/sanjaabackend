const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const controller = require('../controllers/userinfo.controller');

router.post('/', upload.single('avatar'), controller.createUserInfo);
router.get('/', controller.getAllUsers);
router.get('/:nickname', controller.getUserByNickname);

module.exports = router;
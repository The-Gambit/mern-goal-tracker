const express = require('express');
const router = express.Router();
const {registerUser, getMe, loginUser} = require('../cont/userController');
const {protect} = require('../middleware/authMiddleware');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

router.post('/login', cors(), loginUser);
router.post('/register', cors(), registerUser);
router.get('/me', cors(), protect, getMe);


module.exports = router




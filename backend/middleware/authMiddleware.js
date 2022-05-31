const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    //the token is sent in the header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //the token is sent as Bearer <token>
        try {
            token = req.headers.authorization.split(' ')[1];
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select('-password'); //get the id of the user from the token and fetch from the database without the password

            next();
        } catch (error) {
            res.status(401)
            throw Error(`Not Authorized`);
        }
    }
    if (!token) {
        res.status(401)
        throw Error(`Not Authorized - no token`);
    }
})

module.exports = {
    protect
}

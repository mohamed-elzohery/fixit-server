const jwt = require('jsonwebtoken');
const catchAsync = require('../../middlewares/catchAsync');
const User = require('../../models/User');

const register = catchAsync(async (req, res, next) => {
    // const {username, email, password, address, phone} = req.body;
    console.log(req.body);
    const user = await User.create(req.body);
    const token = user.createToken();
    console.log(new Date(Date.now() + +process.env.JWT_AGE));
    res.cookie('token_uid', token, {
        httpOnly: true,
        expires: new Date(Date.now() + +process.env.JWT_AGE),
        path: '/'
    });
    res.status(201).json({success: true, data: user, token, message: 'User created successfully.'});
});

module.exports = register;
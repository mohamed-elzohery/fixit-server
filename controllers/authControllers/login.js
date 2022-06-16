const catchAsync = require('../../middlewares/catchAsync');
const ErrorResponse = require('../../utils/ErrorResponse');
const User = require('../../models/User');

const login = catchAsync(async (req, res, next) => {
    const {email, password: enteredPassword} = req.body;
    if(!(email && enteredPassword)){
        return next(new ErrorResponse(400, 'Please enter email and password.', 'LoginErr'));
    }
    const user = await User.findOne({email});
    if(!(user !== null && await user.isPasswordsMatched(enteredPassword))){
        return next(new ErrorResponse(400, 'Invalid email or password.', 'LoginErr'))
    }
    const token = user.createToken();
    res.cookie('token_uid', token, {
        httpOnly: true,
        expires: new Date(Date.now() + +process.env.JWT_AGE),
        path: '/'
    });
    res.json({success: true, data: user, token, message: 'User is logged in successfully.'});
});

module.exports = login;
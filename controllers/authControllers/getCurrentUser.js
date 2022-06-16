const jwt = require('jsonwebtoken');
const catchAsync = require('../../middlewares/catchAsync');
const User = require('../../models/User');

const getCurrentUser = catchAsync(async (req, res, next) => {
    const token = req.cookies['token_uid'];
    if(!token){
         return res.send({success: true, data: {currentUser: null}, message: 'token is not available.'});
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;
     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.send({success: true, data: {currentUser: null}, message: 'token is not valid.'});
     }
     const user = await User.findById(decodedToken.id);
     if(!user){
     return res.send({success: true, data: {currentUser: null}, message: 'token is not valid.'});
     }
     res.send({success: true, data: {currentUser: user}, message: 'valid token'})
});

module.exports = getCurrentUser;

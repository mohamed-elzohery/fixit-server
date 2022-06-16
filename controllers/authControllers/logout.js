const logout = (req, res, next ) => {
    res.clearCookie('token_uid');
    res.json({success: true, message: 'User is logged out.'});
}

module.exports = logout;
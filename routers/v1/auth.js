const {Router} = require('express');
const router = Router();

const register = require('../../controllers/authControllers/register');
const login = require('../../controllers/authControllers/login');
const getCurrentUser = require('../../controllers/authControllers/getCurrentUser');
const logout = require('../../controllers/authControllers/logout');

router.get('/currentuser', getCurrentUser);
router.post('/logout', logout);
router.post('/register', register);
router.post('/login', login);

export {router as authRouter};
const exprees = require('express');
const AccessController = require('../../controllers/access.controllers');
const { asyncHandler } = require('../../auth/checkAuth');
const router = exprees.Router();

//signup
router.post('/shop/signup',asyncHandler(AccessController.signUp));


module.exports = router;
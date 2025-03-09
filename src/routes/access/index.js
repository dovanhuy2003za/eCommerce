const exprees = require('express');
const AccessController = require('../../controllers/access.controllers');
const router = exprees.Router();

//signup
router.post('/shop/signup',AccessController.signUp)
//signin
// router.post('/signin',(req,res,next)=>{
//     return res.status(200).json({
//         message:"signin!!",})
// })

module.exports = router;
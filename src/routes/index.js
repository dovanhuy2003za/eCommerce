const exprees = require('express');
const { route } = require('.');
const router = exprees.Router();

router.use('/v1/api',require('./access'))

// router.get('',(req,res,next)=>{
//     const strCompress='hello'
//     return res.status(200).json({
//         message:"welcome!!",
        
//     })
// })

module.exports = router;
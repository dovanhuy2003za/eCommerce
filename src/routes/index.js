const exprees = require('express');
const router = exprees.Router();

router.get('',(req,res,next)=>{
    const strCompress='hello'
    return res.status(200).json({
        message:"welcome!!",
        
    })
})

module.exports = router;
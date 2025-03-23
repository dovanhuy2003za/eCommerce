'use strict'
const {findId} = require('../services/apiKey.service');
const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'Authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'forbidden  error'
            });
        }
        //check objkey
        const objKey = await findId(key);
        if (!objKey) {
            return res.status(403).json({
                message: 'forbidden  error'
            });
        }
        req.objKey = objKey;
        return next();
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const permission = (permission) => {
    return (req,res,next)=>{
       if(!req.objKey.permissions){
              return res.status(403).json({
                message:"permission denied"
              })
       }
       console.log('permission:: ',req.objKey.permissions);
       const validPermission = req.objKey.permissions.includes(permission);
       if(!validPermission){
           return res.status(403).json({
               message:"permission denied"
           })
       }
         return next();
    }
}
const asyncHandler = fn =>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next)
    }
}
module.exports = {
    apiKey,permission,asyncHandler
}

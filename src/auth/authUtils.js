
const jwt=require('jsonwebtoken');

const createTokenPair=async(playload,publicKey,privateKey)=>{
    try {
        //access token
        const accessToken=await jwt.sign(playload,privateKey,{
            algorithm:'RS256',
            expiresIn:'2 days'
        });
        //refresh token
        const refreshToken=await jwt.sign(playload,privateKey,{
            algorithm:'RS256',
            expiresIn:'7 days'
        });
        //verify access token
        await jwt.verify(accessToken,publicKey,(err,decoded)=>{
            if(err){
                console.error(`error verify`,err);
            }else{
                console.log(`decoded verify`,decoded);
            }    
        });
        return {accessToken,refreshToken};
    } catch (error) {
        
    }
}

module.exports={
    createTokenPair
}
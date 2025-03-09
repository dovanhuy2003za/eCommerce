const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const RoleShop={
   SHOP:'SHOP',
   WRITER:'WRITER',
   EDITOR:'EDITOR', 
   ADMIN:'ADMIN' 
}

class AccessService{
    static signup=async (name, email, password) => {
        try {
            //step1: check if the email already exists
            const holderShop = await shopModel.findOne({email}).lean();
            if (holderShop) {
                return{
                    code:'xxx',
                    message:'shop already registered',
                }
            }
            const passwordHash = await bcrypt.hash(password,10);
            const newShop=await Shop.create({
                name,
                email,
                password:passwordHash,
                roles:[RoleShop.SHOP]
            });
            if (newShop) {
                //create privateKey, publicKey
                const{privateKey,publicKey}=crypto.generateKeyPairSync('rsa',{
                    modulusLength:4096,
                })
                console.log({privateKey,publicKey})//save collection KeyStore
            }    
        } catch (error) {
            return{
                code:'xxx',
                message:error.message,
                status:'error'
            }
        }

    }

}

module.exports = new AccessService();
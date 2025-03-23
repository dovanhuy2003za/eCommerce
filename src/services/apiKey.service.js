'use strict'
const crypto = require('crypto');
const apiKeyModel = require('../models/apikey.model');

const findId = async (key) => {
        // const newkey=await apiKeyModel.create({key:crypto.randomBytes(16).toString('hex'),permissions:['0000']});
        // console.log(newkey);
        const objKey = await apiKeyModel.findOne({ key,status:true }).lean();
        return objKey   
}



module.exports = {
    findId
}
'use strict'
const e = require("express");
const { Schema, model, Types} = require("mongoose");
const Document_Name='ApiKey';
const Collection_Name='ApiKeys';
var apiKeySchema = new Schema({
    key:{
        type: String,
        required: true,
        unique: true
    },  
    status:{
        type: Boolean,
        default: true
    },
    permissions:{
        type: [String],
        required: true,
        enum: ['0000','1111','2222']
    },
},{
    timestamps:true,
    collection:Collection_Name    
});
module.exports =model(Document_Name, apiKeySchema);

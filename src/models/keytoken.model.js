const { Schema, model, default: mongoose } = require("mongoose");
const Document_Name='Key';
const Collection_Name='Keys';
var keyTokenSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },  
    publicKey:{
        type: String,
        required: true
    },
    refreshToken:{
        type: Array,default: []
    },
},{
    timestamps:true,
    collection:Collection_Name    
});
module.exports =model(Document_Name, keyTokenSchema);

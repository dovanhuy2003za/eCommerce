const {model,Schema,Types} = require('mongoose'); // Erase if already required
const Document_Name='shop';
const Collection_Name='shops';
// Declare the Schema of the Mongo model
var shopSchema = new Schema({
    name:{
        type:String,
        trim:true,
        maxLength:50
    },
    email:{
        type:String,
        trim:true,
        unique:true
    },
    
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    verfify:{
        type:Schema, Types, Boolean,
        default:false
    },
    roles:{
        type:Array,
        default:[]
    }
},{
    timestamps:true,
    collection:Collection_Name    
});

//Export the model
module.exports = mongoose.model(Document_Name, shopSchema);
const { model, Schema, Types, default: mongoose } = require('mongoose'); // Erase if already required
const Document_Name = 'Shop';
const Collection_Name = 'Shops';

// Declare the Schema of the Mongo model
var shopSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify: {
        type: Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: Collection_Name
});

// Export the model
module.exports = mongoose.model(Document_Name, shopSchema);
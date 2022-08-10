const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    //this is for hide node other user , only seen only admin user your node
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // end hiding proces
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        default: "general"
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('notes', NotesSchema);
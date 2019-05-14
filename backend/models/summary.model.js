const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let summary = new Schema({
    date: {
        type: Date, 
        default: Date.now
    },
    user: {
        type: String,
        default: "Unknown"
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    basket: {
        type: JSON
    }  
});

module.exports = mongoose.model("Summary", summary)
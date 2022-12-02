const mongoose = require('mongoose');
const articleSchema = mongoose.Schema({
    title:{type:String,require:true},
    plu : {type:Number,require:true},
    moyenne : {type:Number}
});
module.exports = mongoose.model('Article',articleSchema);
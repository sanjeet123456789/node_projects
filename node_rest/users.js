const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    id:{
        type:String

    },
    name:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model('users',schema)
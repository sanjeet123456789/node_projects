const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/sanjeet',{userNewUrlParser:true},(err)=>{
    if(!err){console.log('Mongodb Connection Successful')}
    else{console.log('Error in DB Connection:'+err)}

});
require('./employee.model')
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/sanjeet',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){console.log('Mongodb Connection Successful')}
    else{console.log('Error in DB Connection:'+err)}

});
mongoose.set('useFindAndModify',false);
require('./employee.model');

const moongoose=require('mongoose');
var employeeSchema=new moongoose.Schema({
    fullName:{
        type: String
    },
    email:{
        type: String
    },
    mobile:{
        type: String
    },
    city:{
        type: String
    }
});
moongoose.model('Employee',employeeSchema);
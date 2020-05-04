const mongoose=require('mongoose');
var employeeSchema=new mongoose.Schema({
    fullName: {
        type: String,
        require:'This field is required.'
    },
    email: {
        type: String
    },
    mobile:{ 
        type: String
    },
    city: {
        type: String
    }
});

// custom validation for email
/*employeeSchema.path('email').validate((val)=>{
    //emailRegex="";
    return emailRegex.test(val);
},'invalid e-mail');*/
mongoose.model('Employee',employeeSchema);

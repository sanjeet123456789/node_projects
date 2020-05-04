const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Employee=mongoose.model('Employee');
const Handlebars = require('handlebars');
router.get('/',(req,res)=>{
    res.render("employee/addOrEdit",{
        viewTitle : "Insert Employee"
    });
});


router.post('/',(req,res)=>{
	console.log("hi")
   console.log(req.body);
    //check to insert or update
console.log(req.body.fullName);
console.log(req.body.id=='');
    if(req.body.id=='')
        insertrecord(req,res);
    	else
        	updateRecord(req,res);
});
function insertrecord(req,res){
	console.log("insert record");
    var employee=new Employee();
    employee.fullName=req.body.fullName;
    employee.email=req.body.Email;
    employee.mobile=req.body.Mobile;
    employee.city=req.body.City;
 console.log(employee.fullName,employee.email,employee.mobile,employee.city);
    employee.save((err,doc)=>{
        if(!err)
            res.redirect('employee/list');
        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit",{
                    viewTitle : "Insert Employee",
                    employee:req.body
                });
            }
            else{
                console.log('erro during inserting record intdatabse');
            }
        }
    });
}

function updateRecord(req,res){
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){res.redirect('employee/list');}
        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit",{
                    viewTitle : "Insert Employee",
                    employee:req.body
                });
            }else{
                console.log('erro during inserting record intdatabse');
            }
        }
    });
}
router.get('/list',(req,res)=>{

    Employee.find((err,docs)=>{
	for(let file of docs){
		console.log(file.fullName);
		}
        if(!err){
            res.render("employee/list",{
                list:docs
		
            });
        }else{
            console.log('Error in retrieving employee list:'+err);

        }
    });
});
function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case   'fullName':
                body['fullNameError']=err.errors[field].message;
                break;
            case 'email':
                body['emailError']=err.errors[fields].message;
                break;
            default:
                break;

        }
    }
}
router.get('/:id',(req,res)=>{
    Employee.findById(req.parser.id,(err,doc)=>{
        if(!err){
            res.render("employee/addOrEdit",{
                viewTitle:"update Employee",
                employee:doc
            });
        }
    });
});
router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove(req.params.id,(req,res)=>{
        if(!err){
            res.redirect('/employee/list');
        }else{
            console.log('Error in employee delete'+err);
        }
    });
});
module.exports=router;

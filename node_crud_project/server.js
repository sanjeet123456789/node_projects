require('./models/db');
const express=require('express');
const path=require('path');
const exhbs=require('express-handlebars');
const bodyparser=require('body-parser');
const employeeController=require('./controller/employeeController');
var app=express();

//for body parser for post get/post method
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exhbs({extname:'hbs',defaultLayout:'mainlayout',layoutsDir:__dirname+'/views/layouts/'}));
app.set('view engine','hbs');

app.listen(3000,()=>{
    console.log('crud project started on port 3000');
});
app.use('/employee',employeeController);

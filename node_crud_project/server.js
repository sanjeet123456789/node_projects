require('./models/db');
const express=require('express');
var app=express();
app.listen(3000,()=>{
    console.log('crud project started on port 3000');
});

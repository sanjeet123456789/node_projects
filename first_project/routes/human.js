const express=require('express');
const route=express.Router();


route.use((req,res,next)=>{
console.log('middleware for human');
next();
})
route.get('/pal',(req,res)=>{
	res.send('pal');
})
route.get('/amit',(req,res)=>{
res.send('amit');

})
module.exports=route;

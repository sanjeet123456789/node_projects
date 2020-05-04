const express=require('express')
const mongoose=require('mongoose')
const users=require('./users')
const app=express()
mongoose.connect('mongodb://localhost:27017/sanjeet',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){console.log('Mongodb Connection Successful')}
    else{console.log('Error in DB Connection:'+err)}

});
let db=mongoose.connection
db.once('open',()=>console.log('connectedto da'))
/*
const users=[
    {
        id:1,
        name:"sanjeet"
    },
    {
        id:2,
        name:"sanjeet 2"
    },
    {
        id:3,
        name:"sanjeet 3"
    },
    {
        id:4,
        name:"sanjeet 4"
    },
    {
        id:5,
        name:"sanjeet 5"
    },
    {
        id:6,
        name:"sanjeet 6"
    },
    {
        id:7,
        name:"sanjeet 7"
    },
    {
        id:8,
        name:"sanjeet 8"
    },
    {
        id:9,
        name:"sanjeet 9"
    },
    {
        id:10,
        name:"sanjeet 10"
    },
    {
        id:11,
        name:"sanjeet 11"
    },
    {
        id:12,
        name:"sanjeet 13"
    }
];
*/
// inserting data into database
//const data=mongoose.connection
/*data.once('open',async()=>{
    if(await users.countDocuments().exec())return
    Prommise.all([
        users.create({name:"users 45"}),
        users.create({name:"users 46"}),

        users.create({name:"users 47"}),
        users.create({name:"users 48"}),
        users.create({name:"users 49"}),
        users.create({name:"users 50"}),
        users.create({name:"users 51"}),
        users.create({name:"users 52"}),
        users.create({name:"users 53"}),
        users.create({name:"users 54"}),

    ])
})*/
//paginate this users array
app.get('/users',paginateUser(users),(req,res)=>{
    
    //curl 'http://localhost:300/users?page=2&limit=3'
    res.json(res.paginatedResult)
})

//creating middleware function
function paginateUser(model){
    return async(req,res,next)=>{
    const page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    console.log(page);
    console.log(limit);
    const startIndex=(page-1)*limit;
    const endindex=page*limit
    
    const results={}

    if(startIndex>0){
        results.previous={
            page:page-1,
            limit:limit
        };
    }
    if(endindex< await model.countDocuments().exec()){
        results.next={
            page:page+1,
            limit:limit
        };
    }
    //results.result=model.slice(startIndex,endindex)
    try{
        returns.result=await model.find().limit(limit).skip(startIndex).exec()
        console.log(results.next.page);
        res.paginatedResult=results
        //res.json(results)
        next()
    }catch(e){
        res.status(500).json({message:e.message})
    }
    }
}

app.listen(3000,()=>{
    console.log("server is listining onport 3000")
})
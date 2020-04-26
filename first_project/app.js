/* node express */



const express= require('express');
const path=require('path');
const bodyParser=require('body-parser');
const Joi=require('joi');
const app = express();

app.use('/public',express.static(path.join(__dirname,'static')));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'static','first-page.html'));

});
app.get('/pal',(req,res)=>{

	res.send('another route');
});
app.get('/pal/:name/:age',(req,res)=>{
	console.log(req.params);
	console.log(req.query);
	res.send('using routes params \t'+req.params.name+":"+req.params.age);

});
app.listen(3000);

/* httppost request and body ParserModule */

app.get('/email',(req,res)=>{
	res.sendFile(path.join(__dirname,'static','email-form.html'));

});
app.post('/email',(req,res)=>{
	console.log(req.body);
	console.log(req.body.email+""+req.body.password);
	/* user input validation and JOI */
	const schema=Joi.object().keys({
	email : Joi.string().trim().email().required(),
	password : Joi.string().min(5).max(10).required()
	});

	Joi.validate(req.body,schema,(err,result)=>{
	if(err){
		console.log(err);
		res.send('Error');
	}
	
	console.log(result);
	res.send('sucesfully posted')
	
	})
	///res.send('successfully posted data')
	/* working with json and body parser */
	//res.json({success:true});

});
/* more on validation*/
//const joi=require('joi');
const arrayString=['sanjeet','pal','amit'];
const arrayObjects=[{example:'example1'},{example:'example2'}]
const userInput={
personalInfo:{
	house:'123',
	city:'patna',
	state:'br'},
perferences:arrayString
};


const personalInfoSchema=Joi.object().keys({
house : Joi.string().trim().required(),
city : Joi.string().trim().required(),
state : Joi.string().trim().length(2).required()


})
const perferencesSchema=Joi.array().items(Joi.string());

const schema=Joi.object().keys({
personalInfo : personalInfoSchema,
perferences : perferencesSchema
});

Joi.validate(userInput,schema,(err,result)=>{
if(err)
	console.log(err);
else
	console.log(result);

})


/* EJB Templates with Express */

app.get('/ejs/:userQuery',(req,res)=>{
	res.render('index',{data:{userQuery:req.params.userQuery,
searchResults:['book1','book2','book3'],
loggedIn:true,
username:'sanjeet pal',

}});
	

});



/*middle ware */
//remove middle to implement for all request
app.use('/middleware',(req,res,next)=>{
	console.log(req.url,req.method)
	next();

}); 
app.get('/middleware',(req,res)=>{
	res.send('MiddleWare');
});



/* Express Router */
const human =require('./routes/human');
app.use('/human',human);











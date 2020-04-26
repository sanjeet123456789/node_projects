//sanjeet pal
const pal=require('./pal')
const EventEmitter=require('events');
const eventEmitter=new EventEmitter();


console.log("hello world from node js");
console.log(pal);
console.log(pal.sum(2,4));
console.log(pal.pi);
console.log(new pal.palObject());


/* Event module */

eventEmitter.on('tutorial',(num1,num2)=>{
	console.log('tutorial event has occurred');
	console.log(num1+num2);
});
eventEmitter.emit('tutorial',2,4);


class Person extends EventEmitter{
	constructor(name){
		super();
		this._name = name;	
	}
	get name(){
		return this._name;
	}

}

/* readInput module */
let sanjeet=new Person('sanjeet pal');
let amit=new Person('amit kumar');
amit.on('name',()=>{
	console.log('my name is '+amit.name);

});
sanjeet.on('name',()=>{

	console.log('my name is'+sanjeet.name);
});
sanjeet.emit('name');
amit.emit('name');



/* read line module*/
const readline=require('readline');
 readl=readline.createInterface({input:process.stdin,output:process.stdout});
let num1=Math.floor((Math.random()*10)+1);
let num2=Math.floor((Math.random()*10)+1);
let answer=num1+num2;

readl.question(`what is ${num1}+ ${num2}? \n `,
(userInput)=>{
	if(userInput.trim() == answer){
	readl.close();

	}else{
	readl.setPrompt('Incorrest response please try again \n');
	readl.prompt();
	readl.on('line',(userInput)=>{
			if(userInput.trim()==answer)
				readl.close();
			else{
				readl.setPrompt(`your answer is incorrect ${userInput} \n`);
readl.prompt();		
			}
		});
	}
});

readl.on('close',()=>{
	console.log("correct answer");
});



/* file system module */

const fs=require('fs');
//cretin a file

//cannot be use for large files file size should be within buffer size 
fs.writeFile('example.txt',"this will be inserted in file",(err)=>{
	if(err){
		console.log(err);
	}else{console.log("file successfully created");
	fs.readFile('example.txt','utf8',(err,file)=>{
		if(err){console.log(err);}else{console.log(file);}
	});
	
	}
	
});
fs.rename('example.txt','example5.txt',(err)=>{
	if(err){console.log(err);}else{console.log('sucessfully rename file');}

});
fs.appendFile('example5.txt',"this is appended data",(err) =>{
	if(err){console.log(err);}else{console.log('sucessfully appended data');}

});

fs.unlink('example5.txt',(err)=>{
	if(err){console.log(err);}else{console.log('sucessfully deleted file');}


});

fs.mkdir('pal',(err)=>{
	if(err){console.log(err);}else{console.log("successfully created..");

	fs.rmdir('pal',(err)=>{
		if(err){
		console.log(err);
		}else{
		console.log("successfully deleted the folder");
		}
	});

	}

});
fs.writeFile('./pal/pal.txt',"this text is inside pal.txt",(err)=>{
	if(err){console.log(err);}else{console.log('sucessfully created file');}

});
/*
fs.unlink('./pal/pal.txt',(err)=>{
	if(err){console.log(err);}else{console.log('deleted all file s of folder pal');}

});
fs.rmdir('pal',(err)=>{

	if(err){console.log(err);}else{console.log('folder deleted');}

});*/
/*
fs.readdir('pal',(err,files)=>{
	if(err)
		console.log(err);
	else{
		for(let file of files){
		
			fs.unlink('./pal/'+file,(err)=>{

				if(err){
				console.log(err);				
				}else{
				console.log('all files has been deleted');
				}
			});
		}	
	}

});*/

/* Readable and writeable streams */
// can be use for large files
const zlib=require('zlib'); 
const gzip=zlib.createGzip();
const gunzip=zlib.createGunzip();
const readStream=fs.createReadStream('./pal/Plain Text.txt','utf8');
const writeStream=fs.createWriteStream('./pal/Plain Text2.txt.gz');
/*
readStream.on('data',(chunk)=>{
	console.log(chunk);
	writeStream.write(chunk);
});*/
/*
readStream.pipe(writeStream);
*/

readStream.pipe(gzip).pipe(writeStream);

const readStream2=fs.createReadStream('./pal/Plain Text2.txt.gz');
const writeStream2=fs.createWriteStream('./pal/testuncompress.txt');

//readStream2.pipe(gunzip).pipe(writeStream2);


/* Http Server and Http Module */
/*const http=require('http')
const server=http.createServer((req,res)=>{
if(req.url==='/'){

res.write('Hello world from sanjeet pal');
res.end();
}else{
res.write('another page');
res.end();

}

});
server.listen('3000');
*/

/* http using file system */
const http=require('http');
//const fs=require('fs');
http.createServer((req,res)=>{
	const readStream3=fs.createReadStream('./pal/static/first-page.html');
	res.writeHead(200,{'Content-type':'text/html'});
	readStream3.pipe(res);
}).listen(3000);









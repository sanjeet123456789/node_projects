const sum = (num1,num2) => num1+num2;
const pi=3.14;
class palObject{
	constructor(){

	console.log("pal object createing")
	}


}

//module.exports.pi=pi;
//module.exports.palObject=palObject;
//module.exports.sum=sum;
module.exports={sum:sum,pi:pi,palObject:palObject}

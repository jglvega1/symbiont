console.log("this is symbiont");

let fs = require('fs');

let path = process.argv[2] || "main.sym"
console.log('compaling ', path)

let test = null;

let file = test || fs.readFileSync(path,{encoding:'utf8'});

//console.log(file)



let chars = file.split("");

//agrupamos palabras por espacios en blanco(que se mantienen por el momento)
function wordify(cs) {
	let spliters = [" ","\n","\t","\r",":",".","=","+","-","-","<",">","*","/","%","|","!","&","?",";"]
	let word = "";
	let result = [];
	for(let c of cs){
		if (spliters.includes(c)) {
			if (word.length>0) {
				result.push(word);
				word = "";
			}
			result.push(c);
		} else {
			word += c
		}
	}
	if (word.length > 0) {
		result.push(word);
			word = "";
	}
	return result
}

let words = wordify(chars);


//agrupamos operadores complejos
function operify (ws) {
	let opList = {
		'=' : (i)=>{
			return result
		}
	};
	let result = [];
	for (var i = 0; i < ws.length; i++) {
		ws[i]
	}
	return result;
}
let op = operify(words);

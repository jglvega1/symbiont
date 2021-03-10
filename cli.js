console.log("this is symbiont");

let fs = require('fs');

let path = process.argv[2] || "main.sym"
console.log('compaling ', path)

let test = null;

let file = test || fs.readFileSync(path,{encoding:'utf8'});

//console.log(file)



//Analisis lexico
	//agrupar y/o dividir el texto por:
			//strings
			//commentarios
			//operadores
			//espacios en blanco
			//agrupadores
			//separadores
let special = {
	" ": ()=>{
		return undefined
	},
	"[": ()=>{
		return undefined
	},
	"]": ()=>{
		return undefined
	},
	"{": ()=>{
		return undefined
	},
	"}": ()=>{
		return undefined
	},
	"(": ()=>{
		return undefined
	},
	")": ()=>{
		return undefined
	},
	"\n": ()=>{
		return undefined
	},
	"\r": ()=>{
		return undefined
	},
	":": ()=>{
		let result = {
			type: 'edit attr',
			value: 'n/a',
			len: 1
		};
		return result
	},
	"+": (next)=>{
		let result = {
			type: 'sum',
			value: 'n/a',
			len: 1
		};
		if (next == "+") {
			result.type = "increment"
			result.len = 2
		} else if (next == "=") {
			result.type = "sum and asign"
			result.len = 2
		}
		return result
	},
	"=": (next)=>{
		let result = {
			type: 'asign',
			value: 'n/a',
			len: 1
		};
		if (next == "=") {
			result.type = "compare"
			result.len = 2
		}
		return result
	}
}
function tokenize(chars, i){
	let result = {
		type: "id",
		value: "",
		len: 0
	};
	let j;
	for (j = i; j < chars.length; j++) {
		let char = chars[j];
		//console.log(char)
		if (char in special) {
			if (result.value.length > 0){
				break;
			} else {
				let r = special[char](chars[j + 1]);
				for(k in r){
					result[k] = r[k]
				}
				break;
			}
		} else {
			result.value += char
			result.len++
		}
	}
	//console.log(result)
	return result;
}

//agroupers
let agroupers = {
	"[":"]",
	"\"":"\"",
	"\'":"\'",
	"(":")",
	"{":"}"
}
function agroup(chars, init){
	let result = {
		type : "agroup",
		value : init,
		content: [],
		len: 2
	}
	if ((init == "'") || (init == '"')) {
		for (var i = 0; i < chars.length; i++) {
			if (chars[i] == agroupers[init]) {
				break;
			} else {
				result.content += chars[i]
				result.len++
			}
		}
	} else {
		let c = parse(chars.slice(i), agroupers[init]);
		result.content= c;
		for(let n of c){
			result.len += n.len
		}
	}
	return result;
}

//Parser AST
	//ast
function parse(txt, end) {
	//dividir el texto en caracteres si no lo esta
	let chars;
	if (Array.isArray(txt)) {
		chars = txt;
	} else{
		chars = txt.split("")
	}

	//analisis
	let result = [];
	for (var i = 0; i < chars.length; i++) {
		console.log(chars[i])
		if (end != undefined) {
			if (chars[i] == end) {
				console.log('end: ',chars[i])
				break;
			}
		}
		if (chars[i] in agroupers) {
			let g = agroup(chars.slice(i+1), chars[i]);
			i+=g.len-1;
			result.push(g);
		} else {
			let token = tokenize(chars, i);
			if (!((token.type=="id")&&(token.value.length <= 0))) {
				if (token.type=="sum and asign") {
					i+=token.len;
					let b = tokenize(chars, i)
					while ((b.type=="id")&&(b.value.length <= 0)){
						if (!((token.type=="id")&&(token.value.length <= 0))){
							break
						}
					} 
					token.content = [result.pop(), b];
					i+=b.len-1;
				} else if (token.type=="edit attr") {
					i+=token.len;
					let b = tokenize(chars, i);
					token.content = [result.pop(), b];
					i+=b.len-1;
				} else {
					i+=token.len-1;
				}
				result.push(token);
				//console.log('scasdcas',i)
			}
		}
	}
	return result;
}
let a = parse(file);
console.log('\n\nresult:\n');
console.dir(a,{depth:null});
//config env
const specialChars = [//list of special chars
	"=","+","-","*","/", //aritmetic
	"<",">", //compare
	"%", //maths
	"|","!","&", //logic
	"?", //especial
	";",",",//separators
	".", ":", //sentences
	"{","}","[","]","(",")", //agroupers
	"'", '"', //strings
	"\n", "\t", " ", "\r"//white spaces
	];

//get chars
function getChars (txt) {
	return txt.split("");//split the input by chars
}

//let words
function getWords (arr) {
	let result = [];
	let word = "";
	for(let char of arr) {
		if (specialChars.includes(char)) {
			if (word.length > 0) {
				result.push(word);
				word = "";
			}
			result.push(char);
		} else{
			word += char;
		}
	}
	if (word.length > 0) {
		result.push(word);
		word = "";
	}
	return result;
}

//remove comments
function cleanComments(arr){
	let result = [];
	let isCommentLine = false;
	let isCommentBlock = false;
	for (var i = 0; i < arr.length; i++) {
		let word = arr[i];
		let next = arr[i + 1];
		//console.log(word, next, "cl", isCommentLine, "cb", isCommentBlock);
		if (((word == "/") && (next == word)) && (isCommentBlock == false)) {
			console.log("\tIs a Comment")
			isCommentLine = true;
			i+=1;
		} else if (((word == "/") && (next == "*")) && (isCommentLine == false)) {
			console.log("\tIs a Comment")
			isCommentBlock = true;
			i+=1;
		} else if (isCommentLine) {
			if (word == "\n"){
				isCommentLine = false;
				result.push(word);
			}
		} else if (isCommentBlock) {
			if (word == "*"){
				if (next == "/") {
					isCommentBlock = false;
					i+=1;
				}
			}
		} else {
			result.push(word);
		}
	}
	return result;
}

//remove white spaces

//let tokens
let model = (ln, t, v, c) => {
	return {
		line:ln,
		type: t,
		value: v
	}
}
//generete error messages

function init (txt) {
	let charList = getChars(txt);
	let cleanedComments = cleanComments(charList);
	return getWords(cleanedComments);
}

module.exports = txt => init(txt)
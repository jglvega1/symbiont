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

//agroup string
function agroupStr (arr) {
	let result = [];
	let str = ["'",'"'];
	let warp = undefined;
	let word = ""
	for(let item of arr) {
		//console.log(item, word, warp)
		if (str.includes(item)) {
			if (warp == undefined) {
				warp = item;
			} else {
				if (word.length > 0) {
					result.push(word);
					word = "";
				}
				warp = undefined;
			}
		} else {
			if (warp != undefined) {
				word += item;
			} else {
				if (word.length > 0) {
					result.push(word);
					word = "";
				}
				result.push(item);
			}
		}
	}
	if (word.length > 0) {
		result.push(word);
		word = "";
	}
	return result;
}


//remove white spaces
function cleanWhiteSpaces (arr) {
	let result = [];
	let ws = [" ", ' ', "\t","\r"];
	for(let item of arr) {
		if (ws.includes(item)) {
			//console.log('is in ws')
		} else {
			result.push(item);
		}
	}
	return result;
}

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
	let stringAgruped = agroupStr(cleanedComments);
	let words = getWords(stringAgruped);
	words = cleanWhiteSpaces(words);
	return words;
}

module.exports = txt => init(txt)
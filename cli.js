console.log("this is symbiont");

let fs = require('fs');

let path = process.argv[2] || "main.sym"
console.log('compaling ', path)

let test = `
"asda sadkcnksdc jns";
asd sda sdac;
`;

let file = test || fs.readFileSync(path,{encoding:'utf8'});

//console.log(file)


//lexical analisis
let lex = require('./lexical.js')(file);
console.log(lex)
//sintax
//semantic
//intermediate code gen
//code optimizer
//target code
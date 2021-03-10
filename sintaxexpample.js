//coments
	// //for one line
	/**/ //for block

//Standar structure
id: [attr]; //only initialized
[attr] = val; //anonimuse
id: [attr] = val; //complete
id = val; //set

//attr struct
key = val;

//dom and css static
id: [attr] = {}; //complete
[attr] = {}; // anonymuse
id: [attr]; // only initialized

//fn, dom and css
id: [attr] = () -> {}; //complete
[attr] = () -> {}; //anonymous
id: [attr]; // only initialized

//callbacks
id; //content
id [attr]; //edit attr from id
id(); //runs the content of id
id [attr] (); //run and edit


//arimetica y algebra
a + b; //suma
a - b; //resta
a * b; //mult
a / b; //div
a ** b; //pow
a!; //factorial in num class but invert in bool
|a|; //absolute
a % b; //residue

Log [base=10] (n)//logarithm in base 10
a.root(b); //root where b is the index
E [lim=infinity i=0] (i++);//sumatory
//expamle
E [lim=5 i=0] (|((i+1)! ** 2) * -3|)//


//compuertas logicas
a && b; //and
a || b; //or
a!; //not
a !& b; //nand
a !| b; //nor


//memoria
a //reference
&a //mutable reference
*a //clone
a? //ask existence

const express= require("express")
const morgan= require("morgan")
const app=express();
var env = process.argv[2] || 'dev';

app.use(express.static('public'));
app.use(morgan('dev'));

switch (env) {
    case 'dev':
        var host="67.205.184.22"
        break;
    case 'prod':
        var host="localhost"
        break;
}

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : host,
    user     : 'shape_hosting',
    password : 'Shape2020@',
    database : 'shape_hosting'
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});
connection.end();

app.all('/',(req,res)=>{
	res.render("index.ejs");
})

app.post('/auth',(req,res)=> {
    res.send("Hola");
})








switch (env) {
    case 'dev':
        app.listen(3000, ()=>{
			console.log("Running");
		});
        break;
    case 'prod':
        app.listen();
        break;
}
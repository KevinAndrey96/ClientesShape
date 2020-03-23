const express= require("express")
const morgan= require("morgan")
const app=express();
var env = process.argv[2] || 'dev';
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');

//app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

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

app.get('/',(req,res)=>{
	res.render("index.ejs");
});

app.post('/auth',(req,res)=> {
  res.writeHead(200, {'Content-Type': 'application/json'});
    var message = 'It works!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);
});








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
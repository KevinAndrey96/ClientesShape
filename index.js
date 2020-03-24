const express= require("express")
const morgan= require("morgan")
const errorHandler = require('strong-error-handler');
const writeErrorToResponse = require('strong-error-handler').writeErrorToResponse;
const errHandlingOptions = {debug: true}
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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(errorHandler({
  debug: true,
  log: true,
}));
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

app.all('/auth',(req,res)=> {
    res.render("wait.ejs");
});


switch (env) {
    case 'dev':
        /*app.listen(3000, ()=>{
			console.log("Running");
		});*/
    app.listen();
        break;
    case 'prod':
        app.listen();
        break;
}
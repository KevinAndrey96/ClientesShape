const express= require("express")
const morgan= require("morgan")
const { User } = require('./models')
const crypto = require("crypto")
const swal = require('sweetalert');
const session = require('express-session')
var cookieParser = require('cookie-parser')

const errorHandler = require('strong-error-handler');
const writeErrorToResponse = require('strong-error-handler').writeErrorToResponse;
const errHandlingOptions = {debug: true}
const app=express();
var env = process.argv[2] || 'dev';
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');

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

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.get('/',(req,res,next)=>{
	res.render("index",{login: "None"});
  //res.send("Hello");
  next();
});
app.post('/',(req,res)=>{

const users = User.findOne({
   where: {
    email:req.body.EMAIL,
    password:crypto.createHash('sha1').update(req.body.PASS).digest('hex')
  }
}).then(function(users){
  if(users==null)
  {
    res.render("index",{login: "Wrong"})
  }else
  {
    session.USER=users.email
    
    res.redirect("/dashboard");
    //res.send("SEssion correcta"+req.session.USER);
  }
}).catch(function(err){
  console.log('Oops! something went wrong, : ', err);
});
  
})

app.get('/dashboard',function (req,res,next){
  if(session.USER){ 
      res.send('Hola: ' + session.USER);
   }else{
      res.redirect("/")
   }
});

switch (env) {
    case 'dev':
        app.listen(3000, ()=>{
          console.log("Running");
        });
    //app.listen();
        break;
    case 'prod':
        app.listen();
        break;
}
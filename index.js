const express= require("express")
const morgan= require("morgan")
const { User } = require('./models')
const crypto = require("crypto")
const passport = require('passport');
//const swal = require('sweetalert');
const session = require('express-session')
//var cookieParser = require('cookie-parser')

//const errorHandler = require('strong-error-handler');
//const writeErrorToResponse = require('strong-error-handler').writeErrorToResponse;
//const errHandlingOptions = {debug: true}
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
/*app.use(errorHandler({
  debug: true,
  log: true,
}));*/
app.use(bodyParser.json({ limit: "50mb" }));

/*app.use(cookieParser());*/
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboardcat',
  cookie: {
    path    : '/',
    httpOnly: false,
    maxAge  : 24*60*60*1000
  }
}))


app.use(passport.initialize());
app.use(passport.session());
//require('./path/to/passport/config/file')(passport);


const LocalStrategy = require('passport-local').Strategy;

const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
const NisAuthenticated = function (req, res, next) {
  if (!req.isAuthenticated())
    return next();
  res.redirect('/dashboard');
}
passport.use(new LocalStrategy(
  { 
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
  function(req, email, password, done) { 
    const user = User.findOne({
            where: {
                email: email,
                password: crypto.createHash('sha1').update(password).digest('hex')
            }
        }).then(function(user) {
          
            if (!user) {
              console.log("Datos incorrectos")
                return done(null, false, {
                    message: 'Datos incorrectos'
                });
            }
            var userinfo = user.get();
            return done(null, userinfo);
        }).catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        });
    }
  ));



app.get('/',NisAuthenticated,(req,res,next)=>{
  if(req.query.error)
  {
    res.render("index",{login: "Wrong"});
  }
	else
  {
    res.render("index",{login: "None"});
  }

});
/*app.post('/',(req,res)=>{

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
    req.session.USER=users.email
    
    res.redirect("/dashboard");
    //res.send("SEssion correcta"+req.session.USER);
  }
}).catch(function(err){
  console.log('Oops! something went wrong, : ', err);
});
  
})*/
app.post('/',(req,res,next)=>{
  /*  passport.authenticate('local', { 
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash : true
  })*/
  passport.authenticate('local', function(err, user, info) {
    console.log(user)
    if (err) { return next(err); }
    if (!user) {
     return res.redirect('/?error=true'); 
   }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

app.get('/dashboard', isAuthenticated ,function (req,res,next){
  res.send("Bienvenido"+req.user.firstName)
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  /*User.findById(id, function(err, user) {
    cb(err, user);
  });*/
  User.findOne({
        where: {
           id: id
        }
     }).then(function(user) {
        if (!user) {
            return 'ERROR 1234';
        }
        cb(null, user);
     });
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
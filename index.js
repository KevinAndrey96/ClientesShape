const express= require("express")
const morgan= require("morgan")
const { User, Domain, Server } = require('./models')
const crypto = require("crypto")
const passport = require('passport');
const session = require('express-session')

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
app.use(bodyParser.json({ limit: "50mb" }));
app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboardca2',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path    : '/',
    httpOnly: false,
    maxAge  : 24*60*60*1000
  }
}))

app.use(passport.initialize());
app.use(passport.session());

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
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},function(req, email, password, done) { 
  const user = User.findOne({
    where: {
      email: email,
      password: crypto.createHash('sha1').update(password).digest('hex')
    }
  }).then(function(user) {

    if (!user) {
      return done(null, false, {
        message: 'Datos incorrectos'
      });
    }
    var userinfo = user.get();
    return done(null, userinfo);
  }).catch(function(err) {
    console.log("Error:", err);
    return done(null, false, {
      message: 'Algo salió mal'
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
app.post('/',(req,res,next)=>{
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

app.get('/dashboard', isAuthenticated ,async (req,res,next) =>{
  //Domain.findAll().then(domain => domain)
  const domains = await Domain.findAll({
    where: {
      IdUser: req.user.id
    }
  });
  console.log(domains.every(domain => domain instanceof Domain)); // true
  //console.log("All domains:", JSON.stringify(domains, null, 2));

  const servers = await Server.findAll({
    where: {
      IdUser: req.user.id
    }
  });
  console.log(servers.every(server => server instanceof Server)); // true
  res.render("dashboard",{domains: domains, servers:servers})
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
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
    break;
    case 'prod':
    app.listen();
    break;
  }
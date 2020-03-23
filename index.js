const express= require("express")
const app=express();

app.use(express.static('public'));

app.all('/',(req,res)=>{
	res.render("index.ejs");
})

var env = process.argv[2] || 'dev';
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
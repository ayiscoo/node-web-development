
const fs = require('fs');
const express = require('express');

const port =  process.env.PORT || 3000;

const hbs = require('hbs');

var app = express();

// injecting html page in url
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/public'));

//use of middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: | ${req.method} | ${req.url}`;
   console.log(log);
  fs.appendFile('server.log', log + '\n',(err)=>{
            console.log(err);
  });   
  next();
});

hbs.registerHelper('currentYear', ()=>{
   return new Date().getFullYear();

});
// register partial -- no installation for this 

app.set('view engine', 'hbs');


// install hbs to  to handle ur engine dynamically

app.get('/',(req,res)=> {
  res.render('index.hbs',{
        nameUser : 'captain Dunga',
		pageTitle : 'Welcome',
		//currentYear : new Date().getFullYear()
	});

});

app.get('/about', (req,res)=>{

	res.render('about.hbs',{
		pageTitle : 'Help',
		//currentYear : new Date().getFullYear()
	});

	//res.send ('this is the aboutus page');
});

app.get('/bad', (req,res)=>{

	res.send ({
	     404 : 'Error not found',
		 500: 'Server error'
	});
});

app.listen(port,() =>{
     console.log(`server connected on port ${port}`)
});
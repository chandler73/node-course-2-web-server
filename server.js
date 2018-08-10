const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('websiteTitle', () => {
	return 'Chandler Molbert';
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: `Home`,
		myName: 'Chandler Molbert',
		myInfo: 'Software Developer, Opera Singer, Hopeful for the future',
		bioInfo: 'This is where my bio info will go when I get around to it./n' +
			 			 ' Welcome to the site, more content to come.'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: `About`,
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: `Projects`,
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'There was an error.'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});	
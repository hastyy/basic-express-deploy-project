const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');


const PORT = process.env.PORT || 3000;
const app = express();

// Register the intent to use partials and the partials folder directory
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
// app.set is a configuration mechanism that accepts key-value pairs like: <thing-to-configure><value-of-configuration>
// the view engine will look for the /views directory by default
app.set('view engine', 'hbs');

// Logging middleware
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log(err);
    });

    next();
});

// Maintenance middleware
// app.use((req, res, next) => {
//     res.render('maintenance');
// });

// express.static takes the absolute path of the folder to serve
// __dirname is always available and contains the absolute path to the root of the project
//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// A helper is a function that we register to Handlebars and it becomes available
// in any of our Views / Partials. The placeholder for it will be replaced by
// whatever return values it yields. In this case, the current year.
// When we reference something that clearly isn't a partial inside of a .hbs file,
// Handlebars first looks for a helper function with that name and only then will
// look for a variable / property that might've been passed.
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'hastyy',
    //     likes: ['Node.JS', 'Ice cream']
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello there, friend!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request.'
    });
});

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
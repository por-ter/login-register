const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config.
const db = require('./config/keys').MongoURI;

// Connect to Mongo.
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// EJS - Middleware
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    // cookie: { secure: true }
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global vars.
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
} )

// Routes 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
// app.use('/stempeln', require('./routes/stempeln'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server started on port ' + PORT + '.'));
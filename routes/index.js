const express = require ('express');
const router = express.Router();
const { ensureAuthenticated} = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome', { layout: 'Layout2' } ))

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        layout: 'layout',
        username: req.user.username,
        firstname: req.user.firstname,
        lastname: req.user.lastname
    }))

module.exports = router;
const express = require ('express');
const router = express.Router();
const { ensureAuthenticated} = require('../config/auth');

// User model
const User = require('../models/User');

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

// router.put('/dashboard/:id', async (req, res) => {
//     const komm = await User.findByIdAndUpdate(req.params.id, req.body, {})
// })

module.exports = router;
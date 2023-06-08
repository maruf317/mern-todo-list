const express = require('express');
const { Model } = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require ('jsonwebtoken');

// User model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Authenticate User
// @access  Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Perform validation
    if(!email || !password) {
        res.status(400).json({ msg: 'Please enter all fields.' });
    }

    // Check user already exists
    User.findOne({ email: email })
        .then(user => {
            // If an user exists, return 400 with a message
            if(!user) {
                return res.status(400).json({ msg: 'Username does not exist.' });
            }
            
            // Validate password
            // password = typed password, user.password = hashed password from db
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

                    // send token and user
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    );
                })
    });
});

module.exports = router;
const express = require('express');
const { Model } = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');``

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register New User
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Perform validation
    if(!name || !email || !password) {
        res.status(400).json({ msg: 'Please enter all fields.' });
    }

    // Check user already exists
    User.findOne({ email: email })
        .then(user => {
            // If an user exists, return 400 with a message
            if(user) {
                return res.status(400).json({ msg: 'Username already exists.' });
            }
            
            // Create a new user
            const newUser = new User({
                name,
                email,
                password
            });

            // Hash the user's password and save to db
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) {
                        console.log(err);
                        throw err;
                    }
                    // Override password in newUser object with hashed password
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            // Save returns user object, return only some information
                            // i.e. don't send the hashed password as part of the response.
                            res.json({
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        });
                });
            });
    });

});

module.exports = router;
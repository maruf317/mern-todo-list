const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

// @route POST api/items
// @desc Create An Item
// @access Private
// Request header expects user token, item name.
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem
        .save()
        .then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Private
// Request header expects user token, item uuid in mongo.
router.delete('/:id', auth, (req, res) => {
    Item.findByIdAndRemove(req.params.id)
        .then(res.json({ success: true }))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
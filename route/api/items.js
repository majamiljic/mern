const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../model/Item');

// GET all items (api/items)
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1})                  // Sort descending (-1)
        .then(items => res.json(items));    // Because of promise, when we get items, then put them in items variable
});

// POST Item
router.post('/', (req, res) => {
    const newItem = new Item({                      // Creating new Item object with data from the response using body
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));    // Saving it to DB and getting back Item object we just saved
});

// DELETE Item
router.delete('/:id', (req, res) => {                           // Sending id in URL
    Item.findById(req.params.id)                                // Finding Item with that ID in DB (it is a promise)
        .then(item => item.remove()                             // When we find it, then remove it from DB (another promise)
            .then(() => res.json({success: true})))             // Solving promise with returning a json Object that says success: true
        .catch(err => res.status(404).json({success: false}));  // Catching an error
});

module.exports = router;
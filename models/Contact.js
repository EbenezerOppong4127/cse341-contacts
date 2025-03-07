const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    favoriteColor: String,
    birthday: String,
});

// The third argument 'contacts' ensures Mongoose uses this collection name
module.exports = mongoose.model('Contact', contactSchema, 'contacts');

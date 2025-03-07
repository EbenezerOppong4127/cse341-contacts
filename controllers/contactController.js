const Contact = require('../models/Contact');

// ✅ Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Get a single contact by ID
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Create a new contact
exports.createContact = async (req, res) => {
    console.log("POST /contacts called"); // Debugging step
    console.log("Request body:", req.body); // Log request data

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
        console.log("Validation failed: Missing required fields"); // Debug log
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const contact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
        const newContact = await contact.save();
        console.log("New contact created:", newContact); // Debug log
        res.status(201).json(newContact);
    } catch (err) {
        console.error("Error saving contact:", err); // Log error
        res.status(400).json({ message: err.message });
    }
};

// ✅ Update a contact
exports.updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });
        res.json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ Delete a contact
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const Contact = require('../models/Contact');

// ✅ Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Get a single contact by ID
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Create a new contact
exports.createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
        await newContact.save();

        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ Update a contact
exports.updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) return res.status(404).json({ message: "Contact not found" });
        res.status(200).json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ Delete a contact
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.status(200).json({ message: "Contact deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

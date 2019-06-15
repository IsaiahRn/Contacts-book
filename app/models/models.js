import mongoose from 'mongoose';

// Setting up contacts collection
const contacts = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: String,
  email: String,
  homeAddress: String,
  workAddress: String,
  organisation: String,
}, { collection: 'contacts' });

module.exports = mongoose.model('contacts', contacts); // Exporting the created model

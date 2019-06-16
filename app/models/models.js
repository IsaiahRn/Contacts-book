import mongoose from 'mongoose';

// Setting up contacts collection
const { Schema } = mongoose;
const contactSchema = new Schema({
  firstname: String,
  lastname: String,
  telephone: Number,
  email: String,
  homeAddress: String,
  workAddress: String,
  organisation: String,
});

const contacts = mongoose.model('contacts', contactSchema);
export default contacts;

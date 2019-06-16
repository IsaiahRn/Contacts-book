import mongoose from 'mongoose';

// Setting up contacts collection
const { Schema } = mongoose;
const contactSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  telephone: { type: Number, required: true },
  email: { type: String, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
  homeAddress: String,
  workAddress: String,
  organisation: String,
});

const contacts = mongoose.model('contacts', contactSchema);
export default contacts;

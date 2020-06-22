// imports
const mongoose = require('mongoose');

// define contact form schemas
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  textArea: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
      type: Date, default: Date.now
  }
});

// export contactSchema as a model
module.exports.Contact = mongoose.model('Contact', contactSchema);

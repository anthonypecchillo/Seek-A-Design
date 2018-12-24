const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  guests: Number
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
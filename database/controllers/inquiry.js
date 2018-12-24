const Inquiry = require('../models/inquiry.js');

const findInquiryAndUpdate = (inquiryData, callback) => {
  const conditions = {
    firstName: inquiryData.firstName,
    lastName: inquiryData.lastName
  };
  
  const update = inquiryData;  // This is only done for educational purposes. (`update` matches the docs...may or may not leave this.)
  
  const options = {
    new: true,
    upsert: true,
    rawResult: true
  };

  Inquiry.findOneAndUpdate(conditions, update, options, (err, doc) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, doc)
    }
  });
};

module.exports = findInquiryAndUpdate;

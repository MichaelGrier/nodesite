const mycontact = require('../models/Contact');

exports.createContactPost = (req, res) => {
  // log request body to console for verification
  console.log(JSON.stringify(req.body));

  // create new object using Contact constructor
  // pass request body values to new object
  const contact = new mycontact.Contact(req.body);
  // update counter and save new object to db
  contact.save((err) => {
    // if (err) throw err;
    if (err) {
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach((key) => {
        errorArray.push(err.errors[key].message);
      });
      return res.render('contacterrors', { errors: errorArray });
    }
    // redirect to thank-you page
    res.redirect('/thank-you');
  });
};

// render all documents in contacts collection to showcontacts.pug
exports.showContacts = (req, res) => {
  mycontact.Contact.find({}, (err, result) => {
    res.render('showcontacts', { contacts: result });
  });
};

// find last entry in database, grab the value of 'firstName' and 
// interpolate that value in thank-you.pug
exports.findLastEntry = (req, res) => {
  mycontact.Contact.find()
    .sort({ date: -1 })
    .limit(1)
    .exec((err, result) => {
      if (err) throw error;
      res.render('thank-you', { firstName: result[0].firstName });
    });
};


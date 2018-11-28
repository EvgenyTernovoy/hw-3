const db = require('../model/db');
const sendMail = require('../libs/sendMail');

module.exports = {
  get: (req, res) => {
    const data = {
      msgemail: req.flash('mail')[0],
      skills: db.get('skills').value(),
      products: db.get('products').value()
    };

    res.render('pages/index', data);
  },
  post: (req, res) => sendMail(req.body).then((info) => {
    req.flash('mail', info.message);
    return res.redirect('/#mail-status');
  })
};

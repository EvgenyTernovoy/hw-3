const db = require('../model/db');
const uploadFile = require('../libs/upload');

module.exports = {
  get: (req, res) => {
    if (req.session.auth) {
      res.render('pages/admin', {msgfile: req.flash('file')[0]});
    }

    return res.redirect('/login');

  },
  updateSkills: (req, res) => {
    if (!req.session.auth) {
      return res.redirect('/login');
    }

    const body = req.body;

    for ( let skill in body) {
      if (body[skill] === '') {
        continue;
      }

      db.get('skills')
        .find({ name: skill })
        .assign({ number: body[skill]})
        .write();
    }

    return res.redirect('/admin');

  },
  uploadProduct: (req, res, next) => uploadFile(req).then(info => {
    req.flash('file', info.message);
    return res.redirect('/admin');
  })
};

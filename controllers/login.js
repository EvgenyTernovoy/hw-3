const db = require('../model/db')
const config = require('../config')
const auth = require('../libs/auth')

module.exports = {
  get: (req, res) => {
    if (req.session.auth) {
      return res.redirect('/admin')
    }

    res.render('pages/login', {msgslogin: req.flash('login')[0]})
  },
  postAuthorization: (req, res) => {
    const { email, password } = req.body

    auth.authorization(email, password, (err, status) => {
      if (err) {
        req.flash('login', err.message)
        return res.redirect('/login')
      }

      if (!status.email || !status.pass) {
        req.flash('login', 'Неверный логин или пароль')
        return res.redirect('/login')
      }

      req.session.auth = status.pass

      return res.redirect('/admin')
    })

  }


}

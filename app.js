const express  = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const config = require('./config');

const app = express();
app.set('views', path.join(__dirname, config.views));
app.set('view engine', 'pug');

app.use(express.static(path.join(process.cwd(), config.public)));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(session({
  secret: 'loftschool',
  key: 'login',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 680000
  },
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());


app.use('/', require('./routes/index'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('pages/error', {status: res.statusCode, error: err.message});
});

const server = app.listen(process.env.PORT || config.port, () => {
  console.log(`server listen on ${server.address().port} port`);
});

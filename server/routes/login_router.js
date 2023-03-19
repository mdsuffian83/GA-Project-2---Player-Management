var express = require('express');
const controller = require('../controller/loginController');
var router = express.Router();


// register user
router.post('/register', (req, res) => {
  console.log('req.body=>', req.body);
  if (req.body.password == req.body.confirmPassword) {
    // call api to do register
    controller.register(req, res);
  } else {
    res.render('login_base', {
      title: 'Login System',
      errorMessage: 'Wrong confirmation Password',
      tab: 'Register',
    });
  }
});

// login user
router.post('/login', (req, res) => {
  controller.login(req, res);
});

// route for dashboard
router.get('/dashboard', (req, res) => {
  console.log('Dashboard - Home Page');
  console.log(req.session);
  if (req.session.user && req.session.user_role == 'admin') {
    // console.log('session time=>', req.session.cookie.maxAge);
    res.render('login_dashboard', { user: req.session.user });
  } else {
    res.render('login_base', {
      title: 'Login System',
      errorMessage: 'Unauthorize User',
    });
  }
});

// route for logout
router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send('Error');
    } else {
      res.render('login_base', {
        title: 'Express',
        logout: 'Logout Successfully..!',
      });
    }
  });
});

module.exports = router;

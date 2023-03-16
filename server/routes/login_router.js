var express = require('express');
var router = express.Router();

const credential = {
  email: 'admin@gmail.com',
  password: 'admin123',
  role: 'admin',
};

// login user
router.post('/login', (req, res) => {
  if (
    req.body.email == credential.email &&
    req.body.password == credential.password
  ) {
    req.session.user = req.body.email;
    req.session.user_role = credential.role;
    res.redirect('/route/dashboard');
    // res.end("Login Successful..!");
  } else {
    res.render('login_base', {
      title: 'Login System',
      errorMessage: 'Invalid Username or Password',
    });
    // res.render('/', {errorMessage: "Invalid Username or Password"});
    //res.end("Invalid Username or Password")
  }
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

var AdminModel = require('../model/login');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async (req, res) => {
  console.log('Register=>', req.body);
  // validate request
  if (!req.body) {
    res.status(400).send({ message: 'Register page empty' });
    return;
  }

  const { email, password, nickname } = req.body;
  let newUser;
  try {
    newUser = new AdminModel({
      email: email,
      password: await bcrypt.hash(password, saltRounds),
      nickname: nickname,
    });
  } catch (error) {
    console.log(error);
    res.status(500).render('login_base', {
      title: 'Login System',
      errorMessage: error.message || 'Some error occured while creating a user',
      tab: 'Register',
    });
  }

  //P@ssw0rd

  // save user in the database
  newUser
    .save(newUser)
    .then(data => {
      // res.send(data)
      // res.redirect('/add-task');
      console.log('new admin=>', data);
      res.status(200).render('login_base', {
        title: 'Login System',
        success: 'Register',
        tab: 'Login',
      });
    })
    .catch(err => {
      res.status(500).render('login_base', {
        title: 'Login System',
        errorMessage:
          err.message ||
          'Some error occured while creating a create operation for task',
        tab: 'Register',
      });
    });
};

const login = async (req, res) => {
  const user = await AdminModel.findOne({ email: req.body.email });
  try {
    const isCorrectPw = await bcrypt.compare(req.body.password, user.password);
    if (isCorrectPw) {
      req.session.user = req.body.email;
      req.session.nickname = req.body.nickname;
      req.session.user_role = 'admin';
      res.redirect('/route/dashboard');
    } else {
      res.render('login_base', {
        title: 'Login System',
        errorMessage: 'Invalid Username or Password',
        tab: 'Login',
      });
    }
  } catch (error) {
    console.log(error);
    res.render('login_base', {
      title: 'Login System',
      errorMessage: 'Invalid Username or Password',
      tab: 'Login',
    });
  }
};

module.exports = {
  login,
  register,
};

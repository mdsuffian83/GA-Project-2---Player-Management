const AdminModel = require('../model/login');

const isAuthorised = async (req, res, next) => {
  console.log('checkUserIsAuthorised=>', req.session);
  if (req.session.user == undefined || req.session.userId == undefined) {
    res.render('login_base', {
      title: 'Login System',
      errorMessage: 'Unauthorize User',
    });
  } else {
    console.log('req.session.userId', req.session.userId);
    const admin = await AdminModel.findById(req.session.userId).exec();
    console.log('admin=>', admin);
    res.locals.user = admin;
    next();
    //cb(req, res);
  }
};

module.exports = { isAuthorised };

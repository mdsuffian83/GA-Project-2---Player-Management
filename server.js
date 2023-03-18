const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const session = require('express-session'); // from login system
const { v4: uuidv4 } = require('uuid'); // from login system
const router = require('./server/routes/router');
const loginRouter = require('./server/routes/login_router');

const connectDB = require('./server/database/connection');

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.json()); // from login system
app.use(bodyparser.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');
// app.set("views",path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// from login system
app.use(
  session({
    secret: uuidv4(),
    resave: true, // true because touch is not implemented, will clear session data
    saveUninitialized: false,
    //  cookie: { maxAge: 10000, originalMaxAge: 10000 },
  })
);

// load static assets for login from login systm
// app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// load routers
app.use('/', router);

// login routers
// app.use('/', require('./server/routes/login_router'))

// from login system
app.use('/route', loginRouter);

// from login system home route
app.get('/', (req, res) => {
  res.render('login_base', { title: 'Login System' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

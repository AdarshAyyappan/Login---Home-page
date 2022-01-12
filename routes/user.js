var express = require('express');
const { response } = require('../app');
var router = express.Router();
const session = require('express-session');
const { load } = require('nodemon/lib/config');

var userLogin = {
  name: 'Adarsh',
  emailId: 'adarshayyappan007@gmail.com',
  password: '123'
}
var adminLogin = {
  name: 'Afsal',
  emailId: 'afsal@gmail.com',
  password: '321'
}
let car = [
  {
    name: 'Ford',
    price: '53.999',
    description: 'GT-6',
    image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    name: 'Benz',
    price: '49.999',
    description: 'S-class',
    image: 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    name:'Nissan',
    image:'https://images.pexels.com/photos/9187097/pexels-photo-9187097.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description:'V4',
    price: '53.999'
  },
  {
    name:'Ford',
    price: '53.343',
    image:'https://images.pexels.com/photos/4674347/pexels-photo-4674347.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description:'Hevy'
  },
  {
    name:'Audi',
    price: '93.999',
    image:'https://images.pexels.com/photos/10590576/pexels-photo-10590576.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description:'GT 4'
  },
  {
    name:'Audi',
    price: '78.999',
    image:'https://images.pexels.com/photos/10256428/pexels-photo-10256428.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description:'GT9'
  },
  

]
/* GET home page. */
router.get('/', function (req, res, next) {

  let data = req.session.name
  if (req.session.loginVarified) {
// console.log("api call for cookie",);
    let title = 'Home Page'
    res.render('index', { user: true, car, data, title });
  } else {
    //console.log("api call:",req);
    //console.log("api call:",res);
    let title = 'Login Page'
    res.render('user/login', { title });
  }

});
router.get('/login', (req, res) => {
  // console.log("api call:",req);
  let title = 'Login Page'
  res.render('user/login', { title });
})

router.post('/login', (req, res) => {
  if (userLogin.emailId == req.body.email && userLogin.password == req.body.password) {
    req.session.loginVarified = true
    req.session.email = req.body.email
    req.session.password = req.session.password
    req.session.name = userLogin.name
    res.redirect('/');
  } else if (adminLogin.emailId == req.body.email && adminLogin.password == req.body.password) {
    req.session.loginVarified = true
    req.session.email = req.body.email
    req.session.password = req.session.password
    req.session.name = adminLogin.name
    let data = req.session.name
    let title = 'Admin Page'
    res.render('user/product', { user: true, car, data, title })
  } else {
    var error = 'Invalid username or password..'
    res.render('user/login', { error })
  }
})

router.get('/logout', (req, res) => {

  req.session.destroy()
  
  res.redirect('/login')
})

router.get('/signUp', (req, res) => {
  let title = 'Sign Up Page'
  res.render('user/signup', { title })
})

router.post('/signup', (req, res) => {
  console.log('api call :', req.body);
  res.redirect('/')
})

router.get('/products', (req, res) => {
  let title = 'products Page'
  res.render('user/product', { title,car })
})

module.exports = router;

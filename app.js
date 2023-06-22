require('dotenv').config()

var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const mongoose = require("./config/db")
const category = require("./routes/categories")
const product = require("./routes/products")
const register = require("./routes/userLogins/register")
const login = require("./routes/userLogins/login")
const verifyToken = require("./middleware/auth")
const adminRegister = require("./routes/adminLogins/adminRegister")
const adminLogin = require("./routes/adminLogins/adminLogin")
const forget = require("./routes/adminLogins/forget")

const cors = require('cors');
var indexRouter = require('./routes/index')

var app = express()

app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/categories', category)
app.use('/products', product)
app.use('/', register)
app.use('/', login)
app.use('/admin/register', adminRegister)
app.use('/admin/login', adminLogin)
app.use('/', forget)
app.post("/welcome", verifyToken, (req, res) => {
  res.status(200).send("Welcome 🙌 ")
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

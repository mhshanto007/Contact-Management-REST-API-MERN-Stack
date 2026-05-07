require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

// middleware
app.use(express.json())
app.use(cors())

// DB connect
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// routes
const contactRoutes = require('./routes/contactRoutes')
const userRoutes = require('./routes/userRoutes')
// use routes
app.use('/contacts', contactRoutes)
app.use('/api/users', userRoutes)
// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})




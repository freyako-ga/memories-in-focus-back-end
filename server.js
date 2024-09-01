require('dotenv').config();
// dotenv.config()
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')

// Router files
const testJWTRouter = require('./controllers/test-jwt')
const usersRouter = require('./controllers/users')
const profilesRouter = require('./controllers/profiles')
const photosRouter = require('./controllers/photos.js')

//Middleware
const verifyToken = require('./middleware/verify-token.js')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`connected to mongoDB ${mongoose.connection.name}.`)
})

app.use(cors())

app.use(express.json())

app.use(morgan('dev'))



//Routes go here
app.use('/test-jwt', testJWTRouter)
app.use('/users', usersRouter)
app.use('/profiles', profilesRouter)
app.use('/photos', photosRouter)



app.listen(3000, () => {
    console.log('the express app is ready')
})
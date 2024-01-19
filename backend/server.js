const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorM')
const PORT = process.env.PORT || 8000
const connectDB = require('./config/db')


// conect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

 app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to this support app'})

 })
//routes
app.use('/api/users', require ('./routes/userRoutes'))
app.use(errorHandler)

 app.listen(PORT, () => console.log(`server started on port ${PORT}`))
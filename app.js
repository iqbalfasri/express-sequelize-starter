require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000

const userRoute = require('./src/routes/user.route')

const app = express()

// Cors
app.use(cors())

// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Initialize routes
app.use('/user', userRoute)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

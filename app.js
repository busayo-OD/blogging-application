const express = require('express')
const morgan = require('morgan')
const blogRoutes = require('./routes/blogRoutes')
const {connectToMongoDB} = require('./db');

require("dotenv").config()

const app = express()

const PORT = process.env.PORT

// Connect to MongoDB
connectToMongoDB();

// register view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

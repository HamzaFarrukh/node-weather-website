const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')

const app = express()
const port = process.env.PORT || 3000 //Heroku port or default port=3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') // hbs (handlebars) - Templating engine for Express
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    // 1st arg: Name of the handle bar inside web-server/views which we are rendering for our home page i.e: index.html
    // 2nd arg: An object passed whose value we want on hbs dynamically
    res.render('index', {   
        title: "Weather App",
        name: "Hamza Farrukh"
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {   
        title: "About",
        name: "Hamza Farrukh"
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {   
        title: "Help",
        name: "Hamza Farrukh",
        message: "This is help page"
    }) 
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }


    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
             return res.send({
                error: 'Error: ' + error
             })
        }
        forecast(latitude, longitude, (error, { temperature, description} = {}) => {
             if(error) {
                return res.send({
                    error: 'Error: ' + error
                 })
             }
             res.send({
                Location: location,
                Temperature: temperature,
                Description: description,
                address: req.query.address
             })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: "Hamza Farrukh",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: "Hamza Farrukh",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log('Server started on port: ' + port)
})
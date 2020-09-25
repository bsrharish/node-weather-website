const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handle bars engine and views button
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get ('', (req, res)  => {
    res.render('index',{
        title: 'Weather',
        name: 'Harish Balakrishnan'
    })
})

app.get ('/about', (req, res)  => {
    res.render('about',{
        title: 'About me',
        name: 'Harish Balakrishnan'
    })
})

app.get ('/help', (req, res)  => {
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Harish Balakrishnan'
    })
})

app.get ('/weather', (req, res) =>{
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a location details'
        })
    }

    geocode(req.query.address, (error, {longitude,latitude,location}={})=> {
        if(error){
            return res.send({error})
        }

        forecast(longitude,latitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=> {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    } 

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404 Error',
        name: 'Harish Balakrishnan',
        error: 'Help article not found'
    })
})

app.get ('*', (req, res) =>{
    res.render('404',{
        title: '404 Error',
        name: 'Harish Balakrishnan',
        error: 'Page not found'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port' + port)
})
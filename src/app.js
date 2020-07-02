const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const weather = require('./weather')
app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'MichaelÊ'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Weather App',
        name: 'MichaelÊ'
    })
})
app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help ',
        name: 'MichaelÊ',
        helpText: 'This is some helpful text'
    })
})
app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'What is the location you are looking for ?'
        })
    }
    weather.geocode(req.query.address, (error, {latitude, longitude, location} ={}) =>{
        if(error){
            return res.send({error})
        }
        weather.forecast( longitude,latitude, (error,forecastData ) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
    console.log(req.query.address)

})

app.get('*', (req, res) => {
    res.send('404 page')
})
app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})

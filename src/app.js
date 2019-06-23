const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../temps/views')
const partialsPath = path.join(__dirname, '../temps/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Application Météo',
        name: 'Lester Violeta'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
         title: 'A propos moi',
         name: 'Lester'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Je t'aide",
        name: 'Phillip',
        helpText: "voila! je t'aide"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Donnez un emplacement s'il vous plait"
        })
    }
    const location = req.query.address
    
    geocode(location, (error,{ latitude, longitude, location} = {})=> {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({error})
            }
            res.send({
                address: location,
                weather: data
            })
          })
        })
    // res.send({
    //     weather: "unavailable",
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404: What are you doing here?",
        name: "Lester Phillip Violeta",
        errorMessage: 'There is no page for this help article'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404: What are you doing here?",
        name: "Lester Phillip Violeta",
        errorMessage: "Page does not exist"
    })
})

app.listen(port, () => {
    console.log("Le server est actif! Sur port " + port)
})
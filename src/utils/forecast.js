const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a43de070c465ac023e85c9c089b368b6/' + latitude +',' + longitude + '?units=si'
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback("Le connexion internet est indisponible!", undefined)
        } else if (body.error){
            callback("L'emplacement est introuvable! Reessayer encore!", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + "C degrees out. There is a " + body.daily.data[0].precipProbability + " percent chance of rain.")
        }
    })
}

module.exports = forecast
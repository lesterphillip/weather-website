const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGVzdGVycGhpbGxpcCIsImEiOiJjandnaGdybTExOGhqNDFvNnF0eHE4NDhsIn0.mO1ROUTF6W-AtKBI0oMzVA'
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback("Le connexion internet est indisponible", undefined)
        } else if (body.features.length === 0){
            callback("L'emplacement est introuvable. Reessayer encore.", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
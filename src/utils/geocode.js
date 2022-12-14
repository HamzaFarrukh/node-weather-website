const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ ' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFtemFmIiwiYSI6ImNsMzFwdjF3YTFjamEzYnNiamJ3cmJ4MnQifQ.M2WNj3ns7bATZk33zyFZ8w&limit=1'

    request({ url, json:true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to service!', undefined)
        } else if (body.features.length === 0) {
            callback('Invalid search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode
const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=601f64c566250f9c5db30c72e199221f&query= '+ longitude + ',' + latitude + '&units=m'

    request({url, json:true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to service!', undefined)
        } 
        else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                description: body.current.weather_descriptions[0]
            })
        }
    })

}
 
module.exports = forecast

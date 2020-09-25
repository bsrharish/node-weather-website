const request = require('request')

const forecast =(long,lati, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f9197b7317ff8c0da811de14058d095d&query='+ encodeURIComponent(long) +','+ encodeURIComponent(lati) +'&units=f'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect weather service !', undefined)
        } else if(body.error){
            callback('Unable to find location !', undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out with ' + body.current.humidity +' degrees Humidity.'
            )
        }
    })
}

module.exports = forecast
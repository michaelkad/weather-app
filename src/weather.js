const chalk = require('chalk')
const request = require('request')
const address = process.argv[2]
// request({url: url, json: true}, (eer, response) =>{
//    const feel = response.body.current.feelslike
//     console.log(response.body.current.weather_descriptions[0]+ " .It is currently "+response.body.current.temperature+ " degrees and feels like " +feel + " degrees")
// })
//
// request({url: urlCoord, json: true}, (err, res) => {
//     const latitute = res.body.features[0].center[1]
//     const longitute = res.body.features[0].center[0]
//     console.log(res.body.features[0].text, latitute, longitute)
// })
const forecast = (longitutde, lagitude, callback )=> {
    const url = 'http://api.weatherstack.com/current?access_key=f69fc25027dc28a916eda72e176cd4bc&query='+lagitude+','+longitutde+'&units=f'
    request({ url,json: true}, (err, {body}) => {
        if(err) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0]+ " .It is currently "+body.current.temperature+ " degrees and feels like " + body.current.feelslike + " degrees" )
        }
    })

}

const geocode= (address, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWljaGFlbGthZDEzIiwiYSI6ImNrYzJqNThsdTAwcG8ydHAwa3hlbHRkMmMifQ.kX6XG5b2F4NKMf_gaNbYbg&limit=1'
    request({url, json: true}, (err, {body})=>{
        if(err){
            callback('Unable to connect to location', undefined)
        }else if(body.features.length === 0){
            callback(chalk.bold.red('Unable to find location'), undefined)
        }else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude :  body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
geocode(address, (err, {latitude, longitude, location} )=> {
    if (err){
        return console.log(err)
    }
    //console.log('Error', err)
    //console.log("data", data)
    forecast(latitude,longitude, (err, fData) =>{
        if (err){
            return console.log(err)
        }
        console.log(location)
        console.log(chalk.bold.green("data: "), fData)
    })
})

module.exports ={
    geocode: geocode,
    forecast: forecast
}

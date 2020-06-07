const request =require('request')

const geocode =(address,callback)=>
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2hhcmF0aGt1bWFyOTgiLCJhIjoiY2thc2o0bHVzMnMwdDJ0cDZ6OHN6dmgzNSJ9.udzuqxBLQ2Pt0x1JexUfzA&limit=1'
     request({url:url,json : true},(error,{body}) => {
            if(error)
            {
                 callback('unable to connect to location services',undefined)
            }
            else if(body.features.length === 0)
            {
                 callback('unable to find location, Try another search',undefined)
            }
            else
            {
                 callback(undefined,
                    {
                         latitude : body.features[0].center[1],
                         longitude: body.features[0].center[0],
                         place:  body.features[0].place_name
                    } )}
     })
}

module.exports=geocode


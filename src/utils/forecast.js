const request=require('request')

const forecast = (la,lo,callback)=>
{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+la+'&lon='+lo+'&%20exclude=hourly,daily&appid=2449a8bb54a02d2a42e3b5a53ffacc65&units=metric'
     
     request({url:url,json:true},(error,{body})=> {
          if(error)
          {
              callback('unable to connect to server',undefined)
          }
          else if(body.message)
          {
              callback('no location found',undefined)
          }
          else
          {
              callback(undefined,"Weather description: "+body.current.weather[0].description+'. It is currently '+body.current.temp+' degree out. Daily Temperature minimum is '+body.daily[0].temp.min+" and temperature maximum is "+body.daily[0].temp.max)
          }
     })
}

module.exports=forecast
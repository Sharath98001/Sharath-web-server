const path=require('path')
const express = require('express')
const hbs = require('hbs')
const request =require('request')
const geocode=require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = heroku.env.PORT || 3000

//Define paths for Express Config
const PublicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join('__dirname','../templates/views')
const partialsPath= path.join('__dirname','../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to use
app.use(express.static(PublicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name: " Sharath Kumar"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:"Sharath Kumar"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        name:'Sharath Kumar',
        helptext:"This is some helpful text"
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address)
    {
        return res.send(
            {
                error: "Please Provide address"
            }
        )
    }

    
    geocode(req.query.address,(error,{latitude,longitude,place} = {} )=>{
          if(error)
          {
              return res.send({
                  error
              }    )
          }

          forecast(latitude,longitude,(error,forecastdata)=>{
                  if(error)
                  {
                      return res.send({
                          error
                      })
                  }

                  res.send({
                      forecast:forecastdata,
                      location:place,
                      address:req.query.address
                  })
          })
    })


     
        //  forecast: "It is raining",
        //  location:"pjhiladelphia",
        //  address: req.query.address
     
} )

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return res.send({
            error:"you must provide search item"
        })
    }

      
        console.log(req.query.search)
        res.send({
            products:[]
        })
})

app.get('/help/*',(req,res)=>{
     res.render('404',{
         title:"404",
        errorMessage: 'Help article is not found',
        name:"Sharath Kumar"
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        title:'404',
        name:'Sharath Kumar',
        errorMessage:"page not found"
    })
})

app.listen(port,()=>
{
    console.log("Server is up on port "+port)
})
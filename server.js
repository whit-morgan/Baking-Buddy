const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'baking-buddy'

    MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response) => {
    db.collection('recipes').find().sort().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.get('/api/:recipeName',(request, response)=>{
    db.collection('recipes').find().toArray()
    .then(data => {       
        response.json(data)
        console.log(data)
    })
    .catch(error => console.error(error))
})

app.post('/addRecipe', (request, response) => {
    db.collection('recipes').insertOne({recipeName: request.body.recipeName, ingredient: request.body.ingredient, ingredientAmount: request.body.ingredientAmount, ingredientMeasurement: request.body.measurement, instructions: request.body.instructions})
    .then(result => {
        console.log('Recipe Added')
        response.redirect('/')
    })
    .catch(error => console.log(error))
})

app.delete('/deleteRecipe', (request, response) => {
    db.collection('recipes').deleteOne({recipeName: request.body.recipeName})
    .then(result => {
        console.log('Recipe Deleted')
        response.json('Recipe Deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const PetRoute = require('./routes/PetRoute.js')
const cors = require('cors')

app.listen(PORT, () => {
    console.log(`Servidor ligado => http://localhost:${PORT}`)
})

app.get('/', (req,res) => {
    res.send('pets')
})

app.use(
    cors(),
    express.json(),
    PetRoute
)
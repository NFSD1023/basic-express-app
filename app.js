const express = require('express')
const app = express()
const port = 5001

const cors = require('cors')


const countriesRouter = require('./routes/countriesRouter')
const citizensRouter = require('./routes/citizensRouter')

app.use(express.json())
app.use(cors())


app.use('/countries', countriesRouter)
app.use('/citizens', citizensRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
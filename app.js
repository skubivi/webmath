const express = require('express')
const config = require('config')
const sequelize = require('./db')
const cors = require('cors')

const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

const PORT = config.get('port') || 5000


async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('App has been started on port', PORT, '...'))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()


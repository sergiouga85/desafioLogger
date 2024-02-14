import express from 'express'
import { engine } from 'express-handlebars'
import { PORT } from './config/config.js'
import { apiRouter } from './routers/api/api.router.js'
import { webRouter } from './routers/web/web.router.js'
import { logger} from './utils/logger.js'
import { passportInitialize } from './middlewares/authentication.js'
import { cookies } from './middlewares/cookies.js'
import { loggerTestEndpoint } from './controllers/loggerTestControllers.js'
import { loggerInRequest } from './middlewares/logger.js'



export const app = express()

app.engine('handlebars', engine())

app.listen(PORT, () => {
  logger.info(`servidor escuchando peticiones en puerto: ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookies)
app.use(passportInitialize)
app.use(loggerInRequest);


app.use('/static', express.static('./static'))

app.use('/api', apiRouter)
app.use('/', webRouter)

app.get('/loggerTest', loggerTestEndpoint)
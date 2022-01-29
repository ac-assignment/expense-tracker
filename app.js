import express from 'express'
import session from 'express-session'
import hbs from '#configs/handlebar.js'

import '#configs/mongoose.js'


const app = express()

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(session())
// app.use()
// app.use()

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
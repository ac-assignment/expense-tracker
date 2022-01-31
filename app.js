import express from 'express'
import session from 'express-session'
import methodOverride from 'method-override'
import flash from 'connect-flash'
import viewData from '#middleware/viewData.js'
import hbs from '#configs/handlebar.js'
import usePassport from '#configs/passport.js'
import router from '#routers/index.js'
import '#configs/mongoose.js'

const app = express()

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
usePassport(app)
app.use(viewData)
app.use(router)

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})

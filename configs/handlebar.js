import { create } from 'express-handlebars'

export default create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    isAllTruthy: (isAuthenticated, userName) => isAuthenticated && userName
  }
})

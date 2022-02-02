import { create } from 'express-handlebars'

export default create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    ifAllTruthy: (isAuthenticated, userName, options) => {
      if (isAuthenticated && userName) {
        return options.fn(this)
      }
      return options.inverse(this)
    },
    ifIdEqual: (id1, id2, options) => {
      if (id1.equals(id2)) {
        return options.fn(this)
      }
      return options.inverse(this)
    }
  }
})

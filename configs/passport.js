import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import bcrypt from 'bcryptjs'
import User from '#models/user.js'

export default (app) => {
  //初始化
  app.use(passport.initialize())
  app.use(passport.session())
  //設定登入策略
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    },
    async (req, email, password, done) => {
      try {
        
      } catch (error) {
        
      }
    }
  ))
  
  //序列化/反序列化
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (err) {
      done(err, false)
    }
  })
}
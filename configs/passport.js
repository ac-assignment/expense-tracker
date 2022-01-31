import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import bcrypt from 'bcryptjs'
import User from '#models/user.js'

export default (app) => {
  //初始化
  app.use(passport.initialize())
  app.use(passport.session())
  //一般登入
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email }).lean()
        if (!user) {
          req.flash('error', '此信箱尚未註冊')
          req.flash('email', email)
          return done(null, false)
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          req.flash('error', '信箱或密碼錯誤')
          req.flash('email', email)
          return done(null, false)
        }
        return done(null, user)
      } catch (err) {
        return done(err, false)
      }
    }
  ))
  //Google登入
  //序列化/反序列化
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    } catch (err) {
      done(err, false)
    }
  })
}
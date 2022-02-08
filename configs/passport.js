import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
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
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, name } = profile._json
      try {
        const existUser = await User.findOne({ email })
        if (existUser) {
          return done(null, existUser)
        }
        
        const randomPassword = Math.random().toString(36).slice(-8)
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(randomPassword, salt)
        const user = await User.create({ name, email, password: hash })
        return done(null, user)
      } catch (err) {
        return done(err, false)
      }
    }
  ))
  //序列化/反序列化
  passport.serializeUser((user, done) => {
    return done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  })
}

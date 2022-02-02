import express from 'express'
import passport from 'passport'
import bcrypt from 'bcryptjs'
import { allowUnAuth } from '#middleware/auth.js'
import User from '#models/user.js'
const router = express.Router()

router.get('/login', allowUnAuth, (req, res) => {
  const email = req.flash('email')
  return res.render('login', { email })
})
router.post('/login', allowUnAuth,
  (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      req.flash('error', '輸入不完整')
      req.flash('email', email)
    }
    return next()
  },
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
  })
)
router.get('/register', allowUnAuth, (req, res) => {
  return res.render('register')
})
router.post('/register', allowUnAuth,
  async (req, res, next) => {
    const { body, body: { name, email, password, confirmPassword } } = req
    const errors = []
    
    if (!email || !password || !confirmPassword) {
      errors.push({ message: '輸入不完整，請重新檢查。' })
    }
    for (const key of ['email', 'password', 'confirmPassword']) {
      if (body[key].includes(' ')) {
        errors.push({ message: '信箱與密碼請勿包含空白' })
        break
      }
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符！' })
    }
    body.name = name.trim() //返回註冊頁面前移除name空白
    if (errors.length) {
      return res.render('register', { errors, body })
    }
    try {
      const user = await User.findOne({ email }).lean()
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        return res.render('register', { errors, body })
      }
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      await User.create({ name: name.trim(), email, password: hash })
      return res.redirect('/user/login')
    } catch (err) {
      return next(err)
    }
  }
)
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已經成功登出')
  return res.redirect('/user/login')
})

export default router

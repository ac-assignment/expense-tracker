import express from 'express'
import { authenticator } from '#middleware/auth.js'
import record from './modules/record.js'
import user from './modules/user.js'
import home from './modules/home.js'

const router = express.Router()

router.use('/record', authenticator, record)
router.use('/user', user)
router.use('/', authenticator, home)

export default router

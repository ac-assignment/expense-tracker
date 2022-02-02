import express from 'express'
import { allowAuth } from '#middleware/auth.js'
import record from './modules/record.js'
import user from './modules/user.js'
import home from './modules/home.js'

const router = express.Router()

router.use('/record', allowAuth, record)
router.use('/user', user)
router.use('/', allowAuth, home)

export default router

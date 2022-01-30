import express from 'express'
import Record from '#models/record.js'
const router = express.Router()

router.get('/', async (req, res) => {
  const user_id = req.user._id
  const recordList = await Record.find({ user_id }).lean()
  res.render('index', recordList)
})

export default router

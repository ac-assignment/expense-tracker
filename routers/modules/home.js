import express from 'express'
import moment from 'moment'
import Category from '#models/category.js'
import Record from '#models/record.js'
const router = express.Router()

router.get('/', async (req, res) => {
  const user_id = req.user._id
  const recordList = await Record.find({ user_id }).lean()
  recordList.forEach((record) => {
    record.date = moment(record.date).format('YYYY-MM-DD')
  })
  const categoryList = await Category.find().lean()
  res.render('index', { recordList, categoryList })
})

export default router

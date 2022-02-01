import express from 'express'
import moment from 'moment'
import { setCategoryList } from '#middleware/viewData.js'
import Record from '#models/record.js'
const router = express.Router()

router.get('/', setCategoryList, async (req, res, next) => {
  const user_id = req.user._id
  try {
    const recordList = await Record
      .find({ user_id })
      .populate('category_id', 'class_name')
      .sort({ date: 'desc' })
      .lean()
    //日期格式化
    recordList.forEach((record) => {
      record.date = moment(record.date).format('YYYY-MM-DD')
    })
    const totalAmount = recordList
      .map(record => record.amount)
      .reduce((previous, current) => previous + current)
    
    res.render('home', { recordList, totalAmount })
  } catch (err) {
    next(err)
  }
})

export default router

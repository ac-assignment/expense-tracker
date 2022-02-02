import express from 'express'
import moment from 'moment'
import { setCategoryList } from '#middleware/viewData.js'
import Category from '#models/category.js'
import Record from '#models/record.js'
const router = express.Router()

router.get('/', setCategoryList, async (req, res, next) => {
  const user_id = req.user._id
  const { category_id } = req.query
  try {
    const isExist = category_id ? await Category.exists({ _id: category_id }) : false
    const query = isExist ? { user_id, category_id } : { user_id }
    const recordList = await Record
      .find(query)
      .populate('category_id', 'class_name')
      .sort({ date: 'desc' })
      .lean()
    //日期格式化
    recordList.forEach((record) => {
      record.date = moment(record.date).format('YYYY/MM/DD')
    })
    const totalAmount = recordList
      .map(record => record.amount)
      .reduce((previous, current) => previous + current, 0)
    
    res.render('home', { recordList, totalAmount, category_id })
  } catch (err) {
    next(err)
  }
})

export default router

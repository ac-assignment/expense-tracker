import express from 'express'
import moment from 'moment'
import { setCategoryList } from '#middleware/viewData.js'
import Category from '#models/category.js'
import Record from '#models/record.js'
const router = express.Router()

/* 新增一筆支出 - 頁面 */
router.get('/create', setCategoryList, async (req, res, next) => {
  try {
    return res.render('create')
  } catch (err) {
    return next(err)
  }
})
/* 新增一筆支出 */
router.post('/', async (req, res, next) => {
  const user_id = req.user._id
  const record = { ...req.body, user_id }
  try {
    await Record.create(record)
    return res.redirect('/')
  } catch (err) {
    return next(err)
  }
})
/* 編輯支出 - 頁面 */
router.get('/:id/edit', setCategoryList, async (req, res, next) => {
  const user_id = req.user._id 
  const _id = req.params.id
  try {
    const record = await Record.findOne({ _id, user_id }).lean()
    record.date = moment(record.date).format('YYYY-MM-DD')
    return res.render('edit', { record })
  } catch (err) {
    return next(err)
  }
})
/* 編輯支出 */
router.put('/:id', setCategoryList,
  async (req, res, next) => {
    const user_id = req.user._id
    const _id = req.params.id
    const { name, date, category_id, amount } = req.body
    try {
      if (!name || !date || !category_id || !amount) {
        req.error = '所有欄位都是必填'
        return next()
      }
      const isExist = await Category.exists({ _id: category_id })
      if (!isExist) {
        req.error = '請輸入有效類別'
        return next()
      }
      const record = await Record.findOneAndUpdate({ _id, user_id }, req.body, { runValidators: true })
      if (!record) {
        throw new Error('操作錯誤')
      }
      return res.redirect('/')
    } catch (err) {
      return next(err)
    }
  },
  /* 顯示錯誤訊息並回填原始資料 */
  async (req, res, next) => {
    const user_id = req.user._id
    const _id = req.params.id
    try {
      const record = await Record.findOne({ _id, user_id }).lean()
      record.date = moment(record.date).format('YYYY-MM-DD')
      return res.render('edit', { error: req.error, record })
    } catch (err) {
      return next(err)
    }
  }
)
/* 刪除一筆支出頁面 */
router.delete('/:id', async (req, res, next) => {
  const user_id = req.user._id
  const _id = req.params.id
  try {
    await Record.findOneAndDelete({ _id, user_id })
    return res.redirect('/')
  } catch (err) {
    return next(err)
  }
})

export default router

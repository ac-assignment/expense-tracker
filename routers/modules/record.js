import express from 'express'
import { setCategoryList } from '#middleware/viewData.js'
import Record from '#models/record.js'
const router = express.Router()

/* 新增一筆支出 - 頁面 */
router.get('/create', setCategoryList, async (req, res, next) => {
  try {
    return res.render('create')
  } catch (err) {
    next(err)
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
    next(err)
  }
})
/* 編輯支出 - 頁面 */
router.get('/:id/edit', setCategoryList, async (req, res, next) => {
  const user_id = req.user._id 
  const _id = req.params.id
  try {
    const record = await Record.findOne({ _id, user_id })
    return res.render('edit', { record })
  } catch (err) {
    next(err)
  }
})
/* 編輯支出 */
router.put('/:id', async (req, res, next) => {
  try {
    
  } catch (err) {
    next(err)
  }
})
/* 刪除一筆支出頁面 */
router.delete('/:id', async (req, res, next) => {
  const user_id = req.user._id
  const _id = req.params.id
  try {
    await Record.findOneAndDelete({ _id, user_id })
    res.redirect('/')
  } catch (err) {
    next(err)
  }
})

export default router

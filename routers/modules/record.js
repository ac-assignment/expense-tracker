import express from 'express'
import Record from '#models/record.js'
import Category from '#models/category.js'
const router = express.Router()

/* 新增一筆支出 - 頁面 */
router.get('/create', async (req, res, next) => {
  const categoryList = await Category.find().lean()
  return res.render('create', { categoryList })
})
/* 新增一筆支出 */
router.post('/', async (req, res) => {
  const user_id = req.user._id
  const entity = { ...req.body, user_id }
  await Record.create(entity)
  
  return res.redirect('/')
})
/* 編輯支出 - 頁面 */
router.get('/:id/edit', async (req, res) => {
  const categoryList = await Category.find().lean()
  return res.render('edit', { categoryList })
})
/* 編輯支出 */
router.put('/:id', (req, res) => {
  
})
/* 刪除一筆支出頁面 */
router.delete('/:id', (req, res) => {
  console.log(req.params)
})

export default router

import db from '#configs/mongoose.js'
import Category from '#models/category.js'

const SEED_CATEGORY = [
  { name: '家居物業', class_name: 'fa-home' },
  { name: '交通出行', class_name: 'fa-shuttle-van' },
  { name: '休閒娛樂', class_name: 'fa-grin-beam' },
  { name: '餐飲食品', class_name: 'fa-utensils' },
  { name: '其他', class_name: 'fa-pen' },
]

db.once('open', async () => {
  try {
    await Category.insertMany(SEED_CATEGORY)
    console.log('done')
  } catch (err) {
    console.log(err)
  } finally {
    process.exit()
  }
})

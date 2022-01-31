import db from '#configs/mongoose.js'
import Category from '#models/category.js'

const SEED_CATEGORY = [
  { _id: 1, name: '家居物業' },
  { _id: 2, name: '交通出行' },
  { _id: 3, name: '休閒娛樂' },
  { _id: 4, name: '餐飲食品' },
  { _id: 0, name: '其他' },
]

db.once('open', async () => {
  try {
    await Category.insertMany(SEED_CATEGORY)
  } catch (err) {
    console.log(err)
  } finally {
    process.exit()
  }
})

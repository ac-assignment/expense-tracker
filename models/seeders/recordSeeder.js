import bcrypt from 'bcryptjs'
import db from '#configs/mongoose.js'
import Category from '#models/category.js'
import User from '#models/user.js'
import Record from '#models/record.js'

const SEED_USER = {
  name: 'root',
  email: 'root@gmail.com',
  password: '123'
}
const SEED_RECORD = [
  { name: '買廚具', date: '2022-02-02', amount: 999, category_name: '家居物業' },
  { name: '高鐵返鄉', date: '2022-01-31', amount: 950, category_name: '交通出行' },
  { name: '看電影', date: '2022-02-03', amount: 260, category_name: '休閒娛樂' },
  { name: '聚餐', date: '2022-02-01', amount: 350, category_name: '餐飲食品' },
  { name: '捐款', date: '2022-02-22', amount: 200, category_name: '其他' }
]

db.once('open', async () => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(SEED_USER.password, salt)
    const user = await User.create({ ...SEED_USER, password: hash })
    const categoryList = await Category.find()
    SEED_RECORD.forEach(r => {
      const category = categoryList.find(c => c.name === r.category_name)
      if (!category) {
        throw new Error('類別名稱不存在')
      }
      r.category_id = category._id
      r.user_id = user._id
    })
    await Record.insertMany(SEED_RECORD)
    console.log('done')
  } catch (err) {
    console.log(err)
  } finally {
    process.exit()
  }
})

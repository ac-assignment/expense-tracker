import mongoose from 'mongoose'
const { Schema } = mongoose

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: true
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
})

export default mongoose.model('Record', recordSchema)

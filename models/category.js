import mongoose from 'mongoose'
const { Schema } = mongoose

const categorySchema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
    unique: true
  },
  class_name: {
    type: String,
    required: true
  }
})

export default mongoose.model('Category', categorySchema)

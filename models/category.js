import mongoose from 'mongoose'
const { Schema } = mongoose

const categorySchema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: false,
    unique: true
  }
})

export default mongoose.model('Category', categorySchema)
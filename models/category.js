import mongoose from 'mongoose'
const { Schema } = mongoose

const categorySchema = new Schema({
  name: {
    type: String,
    required: false
  },
  
})

export default mongoose.model('Category', categorySchema)
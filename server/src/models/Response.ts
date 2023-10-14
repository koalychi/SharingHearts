import mongoose from "mongoose"

const responseSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active'],
    required: true,
  },
  author_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  response_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
})

export const Response = mongoose.model('Response', responseSchema)
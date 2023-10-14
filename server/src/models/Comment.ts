import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  author_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  unit_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
})

export const Comment = mongoose.model('Comment', commentSchema)
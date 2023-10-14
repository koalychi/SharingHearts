import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  title: {
    type: String,
    trim: true,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'done' ]
  },
  deadline: {
    type: Date,
  },
  tags: [
    {
      type: String,
      trim: true,
    }
  ],
  owner_Id: {
    type: mongoose.Types.ObjectId,
    required: true,
  }
})

export const Task = mongoose.model('Task', taskSchema)
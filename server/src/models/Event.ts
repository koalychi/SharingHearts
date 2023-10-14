import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
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
    enum: ['open', 'found', 'finish' ]
  },
  dateTime: Date,
  duration: Number,
  place: {
    type: String,
    trim: true
  },
  tags: [
    {
      type: String,
      trim: true,
    }
  ],
  author_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  }
})

export const Event = mongoose.model('Event', eventSchema)
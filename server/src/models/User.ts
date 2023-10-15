import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import { emailRegexp } from "../configs";

const userSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  first_name: {
    type: String,
    trim: true,
    required: true
  },
  last_name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: emailRegexp
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 8
  },
  university: {
    type: String,
    trim: true,
  },
  major: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  contacts: {
    type: String,
    trim: true,
  },
  tags: [
    {
      type: String,
      trim: true,
    }
  ],
  tasks: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }
],
})


userSchema.pre('save', async function (next) {
  if (process.env.SALT) {
    let salt = await bcrypt.genSalt(+process.env.SALT);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
  next();
})

export const User = mongoose.model('User', userSchema);
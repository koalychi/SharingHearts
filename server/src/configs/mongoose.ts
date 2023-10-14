import mongoose from 'mongoose'

export const connectDB = () => {
  const dbLink = process.env.DB_LINK
  if (!dbLink) throw Error("No Database link provided")
  
  mongoose.connect(dbLink)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'DB connection error:'))
  db.once('open', console.log.bind(console, 'DB connected!'))
}
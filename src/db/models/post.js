import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    contents: String,
    tags: [String],
  },
  { timestamps: true },
)

// arg1 is the singular for of the name of the collection in the db
export const Post = mongoose.model('post', postSchema)

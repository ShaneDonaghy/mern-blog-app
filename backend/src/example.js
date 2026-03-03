import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

initDatabase()

const post = new Post({
  title: 'Hello From Mongoose',
  author: 'Shane Donaghy',
  contents: 'Lorem ipsum is underrated as database filler, but I love it',
  tags: ['book', 'mongoose', 'shane donaghy'],
})

const createdPost = await post.save()
await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: 'Hello AGAIN From Mongoose' },
})

const posts = await Post.find()
console.log(posts)

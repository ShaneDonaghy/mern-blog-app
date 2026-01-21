import mongoose from 'mongoose'
import { describe, expect, test } from '@jest/globals'
import { createPost } from '../services/posts.js'
import { Post } from '../db/models/post.js'

describe('creating posts test',  () => {
  test('with all parameters - should succeed', async () => {
    const post = {
      title: 'A Book I Wrote',
      author: 'Shane Donaghy',
      contents: 'This is a book I first wrote when reading about MongoDB',
      tags: ['MongoDB', 'Mongoose', 'Shane Donaghy'],
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(createdPost._id);
    expect(foundPost).toEqual(expect.objectContaining(post));
    expect(foundPost.createdAt).toBeInstanceOf(Date);
    expect(foundPost.updatedAt).toBeInstanceOf(Date);
  });

  test('without title should fail', async () => {
    const post = {
      author: 'Shane Donaghy',
      contents: 'This is a book I first wrote when reading about MongoDB',
      tags: ['MongoDB', 'Mongoose', 'Shane Donaghy'],
    };
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  });

  test('with only title should succeed', async () => {
    const post = {
      title: 'Just a Title'
    }
    const createdPost = await createPost(post);
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  });

})


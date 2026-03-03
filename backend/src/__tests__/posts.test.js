import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import {
  createPost, deletePost,
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  updatePost,
} from '../services/posts.js'
import { Post } from '../db/models/post.js'

let createdSamplePosts;
const author = 'Shane Donaghy';
const tag = 'feelings';

beforeEach(async () => {
  await Post.deleteMany({})
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)
    createdSamplePosts.push(await createdPost.save())
  }
})

describe('creating posts test', () => {
  test('with all parameters - should succeed', async () => {
    const post = {
      title: 'A Book I Wrote',
      author,
      contents: 'This is a book I first wrote when reading about MongoDB',
      tags: ['MongoDB', 'Mongoose', 'Shane Donaghy'],
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(createdPost._id)
    expect(foundPost).toEqual(expect.objectContaining(post))
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  test('without title should fail', async () => {
    const post = {
      author: 'Shane Donaghy',
      contents: 'This is a book I first wrote when reading about MongoDB',
      tags: ['MongoDB', 'Mongoose', 'Shane Donaghy'],
    }
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  test('with only title should succeed', async () => {
    const post = {
      title: 'Just a Title',
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

const samplePosts = [
  {
    title: 'Get Confident, Stupid',
    author,
    tags: ['confidence', tag, 'self-help'],
  },
  {
    title: 'Learning how to feel',
    author: 'Felicity Stockhart',
    tags: [tag, 'self-help'],
  },
  {
    title: 'The 2026 Communist Manifesto',
    author: 'Donald Trump',
    tags: ['communism', 'confidence'],
  },
  { title: 'The Art of Not Giving Up' },
]

describe('listing posts', () => {
  test('should return all pots', async () => {
    const posts = await listAllPosts()
    expect(posts.length).toEqual(createdSamplePosts.length)
  });

  test('should return posts sorted by creation date descending', async () => {
    const posts = await listAllPosts()
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    );
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    );
  });

  test('should return posts sorted by updated date ascending', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending'
    });
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    );
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    );
  });

  test('Can filter posts by author', async () => {
    const posts = await listPostsByAuthor(author);
    expect(posts.length).toBe(1)
  });

  test('Can filter posts by tag', async () => {
    const posts = await listPostsByTag(tag);
    expect(posts.length).toBe(2)
  });
})

describe(`get a single post`, () => {
  test('should return a single post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id);
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject());
  });

  test('should not return a non-existent post', async () => {
    const post = await getPostById('000000000000000000000000');
    expect(post).toEqual(null)
  });
});

describe(`update a post`, () => {
  test('should update a post author', async () => {
    const newAuthor = 'James Joyce';
    const post = await updatePost(createdSamplePosts[0]._id, { author: newAuthor });
    expect(post.author).toBe(newAuthor);
    expect(post.updatedAt.getTime()).toBeGreaterThan(post.createdAt.getTime())
  });

  test('should update a post contents', async () => {
    const newContents = 'This is the contents of the post';
    const post = await updatePost(createdSamplePosts[0]._id, { contents: newContents });
    expect(post.contents).toBe(newContents);
    expect(post.updatedAt.getTime()).toBeGreaterThan(post.createdAt.getTime())
  });

  test('should not update a non-existent post', async () => {
    const newAuthor = 'Seamus Heaney';
    const post = await updatePost('000000000000000000000000', { author: newAuthor });
    expect(post).toBe(null);
  });
});

describe('deleting posts', () => {
  test('should delete a post from the database', async () => {
    const result = await deletePost(createdSamplePosts[0]._id);
    expect(result.deletedCount).toBe(1);
    const deletedPost = await getPostById(createdSamplePosts[0]._id);
    expect(deletedPost).toBe(null);
  });

  test('should not delete a non-existent post from the database', async () => {
    const result = await deletePost('000000000000000000000000');
    expect(result.deletedCount).toBe(0);
  });
});
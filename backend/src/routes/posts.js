import {
    listAllPosts,
    listPostsByAuthor,
    listPostsByTag,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from "../services/posts.js";

export function postsRoutes(app) {
    app.get('/api/v1/posts', async (req, res) => {
        const {sortBy, sortOrder, author, tag} = req.query
        const options = {sortOrder, sortBy}
        try {
            if (author && tag) {
                return res
                    .status(400)
                    .json({
                        error: 'query by author or tag, not both'
                    })
            } else if (author) {
                return res.json(await listPostsByAuthor(author, options))
            } else if (tag) {
                return res.json(await listPostsByTag(tag, options))
            } else {
                return res.json(await listAllPosts(options))
            }
        } catch (err) {
            console.error(`Error listing posts: ${JSON.stringify(err)}`)
            return res.status(500).end()
        }
    })

    app.get('/api/v1/posts/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const post = await getPostById(id)
            if(post === null)
                return res.status(404).end()
            return res.json(post)
        } catch (err) {
            console.error(`Error getting post`, err)
            return res.status(500).end()
        }
    })

    app.post('/api/v1/posts', async (req, res) => {
      try {
          const post = await createPost(req.body)
          return res.json(post)
      } catch (err) {
          console.error('Cant create Post', err)
          return res.status(500).end()
      }
    })

    app.patch('/api/v1/posts/:id', async (req, res) => {
        try {
            const post = await updatePost(req.params.id, req.body)
            return res.json(post)
        } catch (err) {
            console.err(`Couldn't Update Post`, err)
            return res.status(500).end()
        }
    })

    app.delete('/api/v1/posts/:id', async (req, res) => {
        try {
            const {deletedCount} = await deletePost(req.params.id)
            if (deletedCount === 0)
                return res.sendStatus(404)
            return res.status(204).end()
        } catch (err) {
            console.error(`Couldn't delete Post`, err)
            return res.status(500).end()
        }
    })
}
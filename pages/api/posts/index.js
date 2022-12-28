// import { getPosts, createPost } from "../../../lib/prisma/post"

// const handler = async (req, res) => {
//     if (req.method === 'GET') {
//       try {
//         const { posts, error } = await getPosts()
//         if (error) throw new Error(error)
//         return res.status(200).json({ posts })
//       } catch (error) {
//         return res.status(500).json({ error: error.message })
//       }
//     }
  
//     if (req.method === 'POST') {
//       try {
//         const data = req.body
//         const { post, error } = await createPost(data)
//         if (error) throw new Error(error)
//         return res.status(200).json({ post })
//       } catch (error) {
//         return res.status(500).json({ error: error.message })
//       }
//     }
  
//     res.setHeader('Allow', ['GET', 'POST'])
//     res.status(425).end(`Method ${req.method} is not allowed.`)
//   }
  
//   export default handler
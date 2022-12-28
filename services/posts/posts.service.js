/**
 * This class holds utility functions for API calls related to posts.
 * 
 */

import { db } from "../../config/firebase";

const postsCollection = collection(db, "posts")
class PostsService {

    static async getAllPosts() {
        return await getDoc(doc(postsCollection, userId)).then(
            async (doc) => {
                if (doc.exists()) {
                    return doc.data();
                } else {
                    throw new Error("User does not exist");
                }
            }
        );
    }

    static async getPostsByUserId() {

    }

}

export default PostsService;
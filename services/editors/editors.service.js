import { collection, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

/**
 * This class holds utility functions for API calls related to editors.
 */
const postCollection = collection(db, "posts")
class EditorsService {

    static async publishPost(postId) {
        return await updateDoc(doc(postCollection, postId), {
            isPublished: true,
            lastPublished: Timestamp.now()
        })
    }

    static async unpublishPost(postId) {
        return await updateDoc(doc(postCollection, postId), {
            isPublished: false,
        })
    }

}

export default EditorsService;
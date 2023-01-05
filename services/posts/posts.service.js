/**
 * This class holds utility functions for API calls related to posts.
 * 
 */


import { collection, doc, getCountFromServer, getDoc, getDocs, query, serverTimestamp, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const postsCollection = collection(db, "posts")

class PostsService {

    static async getAllPosts() {
        return await getDoc(doc(postsCollection)).then(
            async (doc) => {
                if (doc.exists()) {
                    return doc.data();
                } else {
                    throw new Error("No posts");
                }
            }
        );
    }

    static async getPostsCount(userId) {
        const q = query(postsCollection, where("author.id", "==", userId))
        let snapshot = await getCountFromServer(q)
        return snapshot.data().count;
    }

    static async getPostsByUserId(userId) {
        const q = query(postsCollection, where("author.id", "==", userId))
        let posts = [];
        try {
            await getDocs(q)
                .then(async (data) => {
                    data.docs.map(doc => {
                        posts.push(doc.data());
                    })
                })
        }
        catch (error) {
            throw new Error(`Unable to get posts: ${error}`);
        }
        return posts;
    }

    static async getPublishedPostsByUserId(userId) {
        const q = query(postsCollection, where("author.id", "==", userId))
        const qWithPublishedOnly = query(q, where("isPublished", "==", true))
        let posts = [];
        try {
            await getDocs(qWithPublishedOnly)
                .then(async (data) => {
                    data.docs.map(doc => {
                        posts.push(doc.data());
                    })
                })
        }
        catch (error) {
            throw new Error(`Unable to get posts: ${error}`);
        }
        return posts;

    }

    static async uploadPost(author, postData) {
        let newPostRef = doc(postsCollection);
        let post = {
            ...postData,
            id: newPostRef.id,
            author,
            createdAt: Timestamp.now(),
            lastUpdated: Timestamp.now()

        }
        return await setDoc(newPostRef, post)
    }

    static async editPost(changes) {
        let existingPost = doc(postsCollection, changes.id);
        let post = {
            ...changes,
            lastUpdated: Timestamp.now(),
        }
        return await updateDoc(existingPost, post)
    }

    static async saveDraft(author, draftData, setDraftData) {
        if (!author.id) {
            throw new Error("ID is required")
        }
        console.log(setDraftData)
        console.log("saveDraft", author)
        const draftsCollection = collection(db, `users`, `${author.id}`, 'drafts');
        let draftDoc = draftData?.draftId ? doc(draftsCollection, draftData?.draftId) : doc(draftsCollection)

        if (!draftData.draftId) {
            setDraftData({ ...draftData, draftId: draftDoc.id })
            draftData = { ...draftData, draftId: draftDoc.id }
        }

        let draft = {
            ...draftData,
            author: author,
            createdAt: Timestamp.now(),
            lastUpdated: Timestamp.now(),
        }
        return await setDoc(draftDoc, draft)

    }
    static async uploadPostCoverImage(image, postId,
    ) {
        const storageRef = ref(firebaseStorage, `/posts/${postId}`);
        const imageRef = uploadBytes(storageRef, image);
        const url = getDownloadURL((await imageRef).ref);
        return url;
    };

    static async editDraft(draftData, author) {
        const draftsCollection = collection(db, `users`, `${author.id}`, 'drafts');
        const draftToEditRef = doc(draftsCollection)

        let post = {
            ...draftData,
            id: draftToEditRef.id,
            lastUpdated: Timestamp.now(),
        }

        return await updateDoc(doc(draftsCollection, draftData.id), post)
    }

}

export default PostsService;
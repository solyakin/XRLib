/**
 * This class holds utility functions for API calls related to posts.
 * 
 */
import { arrayUnion, collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter, Timestamp, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, firebaseStorage } from "../../config/firebase";

const postsCollection = collection(db, "posts")

class PostsService {

    static async getAllPosts() {
        let posts = [];
        const q = query(postsCollection)
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

    static async getRecentPosts() {
        let posts = [];
        const q1 = query(postsCollection, limit(3), where("isPublished", "==", true), orderBy("createdAt", "asc"))
        try {
            await getDocs(q1)
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
    static async getMyRecentPosts(userId) {
        let posts = [];
        const q = query(postsCollection, limit(3), where("author.id", "==", userId))
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

    static async getPost(postId) {
        return await getDoc(doc(postsCollection, postId)).then(
            async (doc) => {
                if (doc.exists()) {
                    return doc.data();
                } else {
                    throw new Error("Post does not exist");
                }
            }
        );
    }

    static async getPublishedPostBySlug(slug) {
        const publishedOnlyQuery = query(postsCollection, where("isPublished", "==", true))
        const q = query(publishedOnlyQuery, where("customUrlSlug", "==", slug))

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
            //throw new Error(`Unable to get posts: ${error}`);
        }
        if (posts.length) {
            console.log(posts)
            return posts[0]
        }
        else {
            try {
                await getDoc(doc(postsCollection, slug)).then(
                    async (doc) => {
                        if (doc.exists()) {
                            posts.push(doc.data())
                        } else {
                            throw new Error("Draft does not exist");
                        }
                    }
                )
            }
            catch (error) {
                //throw new Error(`Unable to get posts: ${error}`);
            }
        }
        return posts[0];

    }
    static async getDraft(draftId, userId) {
        if (!userId) throw new Error("Pass in a user id!")
        const draftsCollection = collection(db, `users`, `${userId}`, 'drafts');
        return await getDoc(doc(draftsCollection, draftId)).then(
            async (doc) => {
                if (doc.exists()) {
                    return doc.data();
                } else {
                    throw new Error("Draft does not exist");
                }
            }
        );
    }
    static async getAllUnpublishedPosts() {
        const qWithUnpublishedOnly = query(postsCollection, where("isPublished", "==", false))
        let posts = [];
        try {
            await getDocs(qWithUnpublishedOnly)
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
    static async getAllPublishedPosts() {
        const qWithPublishedOnly = query(postsCollection, where("isPublished", "==", true))
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
    static async uploadImageForPostAndGetUrl(fileName, file, userId) {
        const storageRef = ref(firebaseStorage, `/temp/${userId}/${fileName}`);
        let imageExists = false
        try {
            let imageFile = await getDownloadURL(await storageRef)
            if (imageFile) imageExists = true
        }
        catch {
            imageExists = false
        }
        if (imageExists) {
            // delete image from storage
            await deleteObject(storageRef);
        }
        const imageRef = uploadBytes(storageRef, file);
        const url = getDownloadURL((await imageRef).ref);
        return { data: { link: await url } };
    }
    static async getPaginatedPosts(
        startAfterVal,
        take,
    ) {
        let lastPostRef = null;
        let q = startAfterVal
            ? query(
                postsCollection,
                limit(take),
                where("isPublished", "==", true),
                orderBy("createdAt", "asc"),
                startAfter(startAfterVal)
            )
            : query(
                postsCollection,
                where("isPublished", "==", true),
                orderBy("createdAt", "asc"),
                limit(take)
            );


        const postData = await getDocs(q);
        lastPostRef = postData.docs[postData.docs.length - 1];
        const result = postData.docs.map((doc) => doc.data());
        return { posts: result, lastPostRef };
    };

    static async getPostsCountByUserId(userId) {
        const q = query(postsCollection, where("author.id", "==", userId))
        let snapshot = await getCountFromServer(q)
        return snapshot.data().count;
    }
    static async getPostsCount() {
        const q = query(postsCollection)
        let snapshot = await getCountFromServer(q)
        return snapshot.data().count;
    }
    static async getPublishedPostsCount() {
        const q = query(postsCollection, where("isPublished", "==", true))
        let snapshot = await getCountFromServer(q)
        return snapshot.data().count;
    }
    static async getUnpublishedPostsCount() {
        const q = query(postsCollection, where("isPublished", "==", false))
        let snapshot = await getCountFromServer(q)
        return snapshot.data().count;
    }
    static async getUnpublishedPostsByUserId(userId) {
        const q = query(postsCollection, where("author.id", "==", userId))
        const qWithUnpublishedOnly = query(q, where("isPublished", "==", false))
        let posts = [];
        try {
            await getDocs(qWithUnpublishedOnly)
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


    static async getDraftsByUserId(userId) {
        const draftsCollection = collection(db, `users`, `${userId}`, 'drafts');
        const q = query(draftsCollection)
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

    static async uploadPost(author, postData, postImage) {
        let newPostRef = doc(postsCollection);
        let imageUrl = await this.uploadPostCoverImage(postImage, newPostRef.id);
        let post = {
            ...postData,
            id: newPostRef.id,
            author,
            createdAt: Timestamp.now(),
            lastUpdated: Timestamp.now(),
            thumbnailUrl: imageUrl
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
    static async appendImagePathToPost(postId, imagePath, previousImagePaths) {
        let existingPost = doc(postsCollection, postId);

        return await updateDoc(existingPost, { imagePaths: arrayUnion(imagePath) })
    }

    static async publishPost(postId) {
        let existingPost = doc(postsCollection, postId);
        let post = {
            isPublished: true,
            publishedAt: Timestamp.now(),
            lastUpdated: Timestamp.now(),
        }
        return await updateDoc(existingPost, post)
    }
    static async unPublishPost(postId) {
        let existingPost = doc(postsCollection, postId);
        let post = {
            isPublished: false,
            unpublishedAt: Timestamp.now(),
            publishedAt: null,
            lastUpdated: Timestamp.now(),
        }
        return await updateDoc(existingPost, post)
    }


    static async saveDraft(author, draftData, setDraftData) {
        if (!author.id) {
            throw new Error("ID is required")
        }
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
        const storageRef = ref(firebaseStorage, `/posts-cover-images/${postId}`);
        let imageExists = false
        try {
            let imageFile = await getDownloadURL(await storageRef)
            if (imageFile) imageExists = true
        }
        catch {
            imageExists = false
        }
        if (imageExists) {
            // delete image from storage
            await deleteObject(storageRef);
        }
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
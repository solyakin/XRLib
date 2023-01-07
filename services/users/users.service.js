import { collection, getDoc, doc, updateDoc, query, where, getCountFromServer, getDocs } from "firebase/firestore";
import { db, firebaseStorage } from "../../config/firebase";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";

const usersCollection = collection(db, "users")

/**
 * This class holds utility functions for API calls related to users.
 */
class UserService {

    static async getAllUsers() {
        return await getDoc(doc(usersCollection)).then(
            async (doc) => {
                if (doc.exists()) {
                    return doc.data();
                } else {
                    throw new Error("No users");
                }
            }
        );
    }
    /**
     * 
     * @param {Role} role 
     * @returns {Array<User>}
     */
    static async getAllUsersByRole(role) {
        const q = query(usersCollection, where("role", "==", role))
        let users = [];
        try {
            await getDocs(q)
                .then(async (data) => {
                    data.docs.map(doc => {
                        console.log(doc.data())
                        users.push(doc.data());
                    })
                })
        }
        catch (error) {
            throw new Error(`Unable to get users: ${error}`);
        }
        return users;
    }
    /**
    * 
    * @param {Role} role 
    * @returns {Array<User>}
    */
    static async getAllUsersByRoleWithPostCount(role) {
        const q = query(usersCollection, where("role", "==", role))

        let users = [];
        try {
            await getDocs(q)
                .then(async (data) => {
                    data.docs.map(async (doc) => {
                        // Get Post count for each item
                        const postsQuery = query(usersCollection, where("author.id", "==", doc.data().id))
                        let postCount = getCountFromServer(postsQuery)
                        posts.push({ ...doc.data(), postCount });
                    })
                })
        }
        catch (error) {
            throw new Error(`Unable to get users: ${error}`);
        }
        return users;
    }

    /**
        * Gets user data from Firebase DB
        * @param {string} userId 
        * @returns 
        */
    static async getUserData(userId) {
        if (!userId) {
            return
        }
        return await getDoc(doc(usersCollection, userId)).then(
            async (doc) => {
                if (doc.exists()) {
                    return doc.data();
                } else {
                    throw new Error("User does not exist");
                }
            }
        );
    }

    static async updateUserProfile(userId, changes) {
        console.log("updateDoc", changes)
        return await updateDoc(doc(usersCollection, userId), changes)
    }
    static async uploadProfileImageAndGetDownloadUrl(image, userId) {

        const storageRef = ref(firebaseStorage, `/profiles/${userId}`);
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
    }

}

export default UserService;
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

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
        return await updateDoc(doc(usersCollection, userId), {
            ...changes
        })
    }

}

export default UserService;
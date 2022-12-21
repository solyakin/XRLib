import { collection } from "firebase/firestore";
import { db } from "../../config/firebase";

const usersCollection = collection(db, "users")

/**
 * This class holds utility functions for API calls related to users.
 */
class UserService {

    /**
     * Gets user data from Firebase DB
     * @param userId 
     * @returns 
     */

    static async getUserData(userId) {
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

}

export default UserService;
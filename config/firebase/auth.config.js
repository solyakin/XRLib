import { getAuth, GoogleAuthProvider } from "firebase/auth";
import app from "./app.config";


const firebaseAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()


export default firebaseAuth;
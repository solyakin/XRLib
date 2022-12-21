import { getAuth } from "firebase/auth";
import app from "./app.config";


const firebaseAuth = getAuth(app);

export default firebaseAuth;
import { getStorage } from "firebase/storage";
import app from "./app.config";

const firebaseStorage = getStorage(app);

export default firebaseStorage;
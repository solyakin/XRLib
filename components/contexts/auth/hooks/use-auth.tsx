import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const useAuth = () => {
    if (!AuthContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return useContext(AuthContext);
};

export default useAuth;


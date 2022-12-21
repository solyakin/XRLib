import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db, firebaseAuth } from "../../../config/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut as fbSignOut } from "firebase/auth";
import { useToast } from "@chakra-ui/react";
import UserService from "../../../services/users/users.service";
import { collection, doc, setDoc } from "firebase/firestore";


export const AuthContext = React.createContext(null);
const usersCollection = collection(db, "users")

export const AuthProvider = ({ children }) => {
    const toast = useToast();
    const router = useRouter();

    // Loading states
    const [authLoading, setAuthLoading] = useState(false);
    const [signInLoading, setSignInLoading] = useState(false);
    const [signOutLoading, setSignOutLoading] = useState(false);
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
    //Loading states END

    // This represents the user session data from firebase authentication.
    const [currentUser, setCurrentUser] = useState(null);


    //This represents the user's data from the DB

    const [userData, setUserData] = useState(null)


    /**
     * Function called to sign up a new account
     * @param email 
     * @param username 
     * @param password 
     */
    const signUp = async (email, username, password) => {
        setSignUpLoading(true)
        createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then(async (userCredential) => {
                // Signed in and save user to firestore
                const { user } = userCredential;
                setCurrentUser(user);
                await setDoc(doc(usersCollection, userCredential.user.uid), {
                    id: userCredential.user.uid,
                    username: username,
                    email: userCredential.user.email,
                }).then(() => {
                    setSignUpLoading(false);
                });
            })
            .catch((error) => {
                setSignUpLoading(false);
            });

    };

    const signIn = async (
        email,
        password,
    ) => {
        setSignInLoading(true)
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const { user } = userCredential;

                let userData = await UserService.getUserData(user.uid);
                setUserData({ ...userData });
                setSignInLoading(false);
                /// navigate to the returnUrl
                let returnUrl = router.query.returnUrl;

                router.push(returnUrl ? returnUrl : "/");
                toast({
                    title: "Signed in successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

            })
            .catch((error) => {
                setSignInLoading(false)
                const errorMessage = error.message;
                setCurrentUser(null);
                toast({
                    title: "Error",
                    status: "error",
                    description: `${errorMessage.replace(
                        "Firebase",
                        ""
                    )}`,
                    isClosable: true,
                    duration: 3000,
                });
            });
    };

    const resetPassword = async (email) => {

    };

    const signOut = () => {
        setAuthLoading(true);
        fbSignOut(firebaseAuth)
            .then(function () {
                // Sign-out successful.
                setCurrentUser(null);
                setSignOutLoading(false);
            })
            .catch((error) => {
                // An error happened.
                setSignOutLoading(false);
                setCurrentUser(null); // Do we need to do this?

            });

    };

    useEffect(() => {
        setAuthLoading(true);
        /** Subscribe to changes in auth token, if an authenticated user is found, 
         * get the user data from db and propagate the both session and user data in state */

        const unsubscribe = onAuthStateChanged(
            firebaseAuth,
            async (authUser) => {
                console.log("testing", authUser);
                if (authUser) {
                    setCurrentUser(authUser);
                    await UserService.getUserData(authUser.uid).then(async (userData) => {
                        setAuthLoading(false);
                        setUserData({ ...userData });
                        console.log("userData:", userData);

                    });
                }
                else {
                    setCurrentUser(null)
                    setUserData(null)
                    setAuthLoading(false)
                }
            },
            (error) => {
                setCurrentUser(null);
            }
        );
        return () => unsubscribe();
    }, []);


    const value = {
        signUp,
        signOut,
        signIn,
        signInLoading,
        signUpLoading,
        signOutLoading,
        resetPasswordLoading,
        currentUser,
        authLoading,
        userData,
        resetPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
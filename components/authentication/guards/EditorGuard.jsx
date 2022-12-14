import { Center, Spinner, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";



/**
 * This listens to route change events and performs checks to see if the user has the right privileges to access a given route.
 * 
 * This should wrap any admin-only route.
 * @param {*} children: React children that consume the useEffect in this component 
 * @returns 
 */

const EditorGuard = ({ children }) => {

    const color = useColorModeValue("black", "gray.700");
    const { userData, authLoading, authDone } = useAuth() || {};
    const toast = useToast();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 

        if (authDone) {
            editorCheck();

            // on route change start - hide page content by setting authorized to false  
            const hideContent = () => setAuthorized(false);
            router.events.on('routeChangeStart', hideContent);

            // on route change complete - run auth check 
            router.events.on('routeChangeComplete', () => editorCheck)

            // unsubscribe from events in useEffect return function
            return () => {
                router.events.off('routeChangeStart', hideContent);
                router.events.off('routeChangeComplete', () => editorCheck);
            }
        }
    }, [authDone]);

    function editorCheck() {
        // redirect to login page if accessing a private page and not logged in 
        if (authDone) {

            const allowedRoles = ["admin", "editor"]
            // redirect to login page if accessing a private page and not logged in
            if (!allowedRoles.includes(userData?.role)) {
                setAuthorized(false);
                router.push({ pathname: "/404" })
                toast({
                    title: "You are not authorized to access this page. Please login as an editor",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
            else {
                setAuthorized(true)
            }
        }

    }
    if (authLoading && !authorized) {
        return (
            <Center w={"100%"} h={"100vh"} bg={color}>
                <Spinner color="white" />
            </Center>
        )
    }


    if (authorized) {
        return <>{children}</>;
    }
    return (
        <Center w={"100%"} h={"100vh"} bg={color}>
            <Spinner />
        </Center>
    )
}

export default EditorGuard;

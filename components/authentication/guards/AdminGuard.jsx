import { Center, Spinner, useColorModeValue, useToast } from "@chakra-ui/react";
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

const AdminGuard = ({ children }) => {

    const color = useColorModeValue("white", "gray.700");
    const { userData, authLoading } = useAuth() || {};
    const toast = useToast();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 

        if (!authLoading) {
            adminCheck();

            // on route change start - hide page content by setting authorized to false  
            const hideContent = () => setAuthorized(false);
            router.events.on('routeChangeStart', hideContent);

            // on route change complete - run auth check 
            router.events.on('routeChangeComplete', () => adminCheck)

            // unsubscribe from events in useEffect return function
            return () => {
                router.events.off('routeChangeStart', hideContent);
                router.events.off('routeChangeComplete', () => adminCheck);
            }
        }


    }, [authLoading]);

    function adminCheck() {
        // redirect to login page if accessing a private page and not logged in 
        if (!authLoading && userData) {
            if (!(userData?.role === "admin")) {

                // redirect to login page if accessing a private page and not logged in
                if (!(userData?.role === "editor")) {
                    setAuthorized(false);
                    router.push({
                        pathname: '/login',
                        query: { returnUrl: router.asPath }
                    });
                    toast({
                        title: "You are not authorized to access this page. Please login as Editor",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    })
                }
                else {
                    toast({
                        title: "You are not authorized to access this page as an editor. Requires Superadmin Scope",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    })
                    router.push({
                        pathname: '/',
                    });
                }
            }
            else {
                setAuthorized(true);
            }


        }

    }
    if (authLoading) {
        return (
            <Center w={"100%"} h={"100vh"} bg={color}>
                <Spinner color="black" />
            </Center>
        )
    }


    if (authorized) {
        return <>{children}</>;
    }
    return (
        <Center w={"100%"} h={"100vh"} bg={color}>

        </Center>
    )
}

export default AdminGuard;

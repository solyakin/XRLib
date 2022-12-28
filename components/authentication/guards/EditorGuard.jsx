import { Box, Center, Spinner, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";
import useAuth from "../hooks/use-auth";

/**
 * This listens to route change events and performs checks to see if the user has the right priviledges to access a given route.
 * If he does not, he is redirected to the last accessible page and is instructed to login with the right priviledges
 * @param {*} children: React children that consume the useEffect in this component 
 * @returns 
 */
const RouteGuard = ({ children }) => {
    const { currentUser, authLoading, userData } = useAuth() || {};
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    // toast
    const toast = useToast();

    useEffect(() => {
        // on initial load - run auth check 

        authCheck();
        if (!authLoading) {
            // on route change start - hide page content by setting authorized to false  
            const hideContent = () => setAuthorized(false);
            router.events.on('routeChangeStart', hideContent);

            // on route change complete - run auth check 
            router.events.on('routeChangeComplete', authCheck)

            // unsubscribe from events in useEffect return function
            return () => {
                router.events.off('routeChangeStart', hideContent);
                router.events.off('routeChangeComplete', authCheck);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authLoading, currentUser]);

    function authCheck() {
        if (!authLoading) {
            if (!currentUser && router.asPath.includes("/admin")) {
                setAuthorized(false);
                router.push({
                    pathname: '/login',
                    query: { returnUrl: router.asPath }
                });
                toast({
                    title: "You are not authorized to access this page. Please login as superadmin or editor",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                setAuthorized(true);
            }
        }
    }

    if (authLoading) {
        return (
            <Center w={"100%"} h={"100vh"}>
                <Spinner color="black" />
            </Center>
        )
    }

    if (authorized) {
        return <>{children}</>;
    } else {
        // redirect to login and store the current url for redirecting back to after successful login
        return (
            <Center w={"100%"} h={"100vh"}>

            </Center>)

    }
}

export default RouteGuard;
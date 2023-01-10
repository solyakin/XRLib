import '../styles/globals.css'
import { Center, ChakraProvider, Spinner, useToast } from '@chakra-ui/react'
import theme from '../utils/theme';
import { AuthProvider } from '../components/authentication/contexts/AuthContext';
import useAuth from '../components/authentication/hooks/useAuth';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const AppInner = ({ Component, ...rest }) => {
  const { currentUser, authDone } = useAuth();
  const toast = useToast();
/*   useEffect(() => {
    if (currentUser) {
      if (!currentUser.emailVerified) {
        toast({
          title: "You cannot experience the app fully without verifying your account. Check your email.",
          status: "warning",
          duration: 18000,
          isClosable: true,
        });
        // Trigger popup that says you cannot access all the features of this app without a fully verified account
      }
    }
  }, [currentUser]) */
  if (!authDone) {
    <Center>
      <Spinner />
    </Center>
  }
  return (
    <>
      <Component {...rest} />
    </>
  )
}

function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <AppInner Component={Component} pageProps={pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>

  )
}

export default MyApp;


import '../styles/globals.css'
import { ChakraProvider, useToast } from '@chakra-ui/react'
import theme from '../utils/theme';
import { AuthProvider } from '../components/authentication/contexts/AuthContext';
import useAuth from '../components/authentication/hooks/useAuth';
import { useEffect } from 'react';

const AppInner = ({ Component, ...rest }) => {
  const { currentUser } = useAuth();
  const toast = useToast();
  useEffect(() => {
    if (currentUser) {
      if (!currentUser.emailVerified) {
        toast({
          title: "You cannot experience the app fully without verifying your account. Check your email.",
          status: "warning",
          duration: 18000,
          isClosable: true,
        });
        // Popup that says you cannot access all the features of this app without a fully verified account
      }
    }
  }, [currentUser])
  return (
    <>
      <Component {...rest} />
    </>
  )
}

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <AppInner Component={Component} pageProps={pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp;


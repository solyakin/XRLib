import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../utils/theme';
import { AuthProvider } from '../components/authentication/contexts/AuthContext';

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp;


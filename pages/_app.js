import '../styles/globals.css'
import { AnimatePresence, motion } from "framer-motion";
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter} from 'next/router';
import theme from '../utils/theme';

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  return<AnimatePresence mode='wait'>
      <motion.div
      key={router.route}
      initial="intialState"
      animate="animateState"
      exit="existState"
      variants={{
        initialState : {
          opacity : 0,
          background : "black"
        },
        animateState : {
          opacity : 1,
          background : "black"
        },
        existState : {
          opacity : 0,
          background : "black"
        }
      }}
      >
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </motion.div>
  </AnimatePresence>
}

export default MyApp

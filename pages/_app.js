import '../styles/globals.css'
import { AnimatePresence, motion } from "framer-motion";
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter} from 'next/router';

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  return <ChakraProvider>
    <AnimatePresence mode='wait'>
      <motion.div
      key={router.route}
      initial="intialState"
      animate="animateState"
      exit="existState"
      variants={{
        initialState : {
          opacity : 0
        },
        animateState : {
          opacity : 1
        },
        existState : {
          opacity : 0
        }
      }}
      >
          <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  </ChakraProvider>
}

export default MyApp

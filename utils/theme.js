import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const styles = {
    global: props => ({
      body: {
        bg: mode('gray.100', '#141214')(props),
      },
    }),
};
  
const theme = extendTheme({ config })

export default theme
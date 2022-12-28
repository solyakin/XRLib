import React from 'react'
import Image from 'next/image'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    Box,
    Text,
} from '@chakra-ui/react'
import styles from '../styles/Login.module.css'

const SignUp = ({signupClose, signupIsOpen, emailOpen, loginOpen}) => {
  return (
    <Modal onClose={signupClose} isOpen={signupIsOpen} isCentered>
        <ModalOverlay/>
        <ModalContent bg="#000005" borderRadius="md" boxShadow={"dark-lg"} borderColor="white" border="1px">
            <ModalBody mb="8" mt="9" marginLeft="6" marginRight="6">
                <Heading as="h3" mb="6" size="lg" color="white">Sign Up</Heading>
                <Box as='button' 
                onClick={emailOpen}
                borderRadius="full" 
                color="white" 
                border="1px" 
                borderColor="whiteAlpha.500"
                p={3}
                paddingLeft="8"
                marginBottom="5"
                display="flex"
                alignItems="center"
                w="full"
                >
                    <Image src='/Vector (10).svg' width="15" height="15" alt="google"/>
                    <Text ml="3">Sign up with Email</Text>
                </Box>
                <Box as='button' 
                borderRadius="full" 
                color="white" 
                border="1px" 
                borderColor="whiteAlpha.500"
                p={3}
                paddingLeft="8"
                marginBottom="6"
                display="flex"
                alignItems="center"
                w="full"
                >
                    <Image src='/google.svg' width="15" height="15" alt="google"/>
                    <Text ml="3" className={styles.text}>Sign up with Google</Text>
                </Box>
                <Box mt="8">
                    <Text color="whiteAlpha.700" fontSize="sm" textAlign={"center"}>
                        Already have an account? 
                        <span onClick={signupClose} style={{cursor : "pointer", marginLeft : "10px", color : "whitesmoke"}}>Login</span>
                    </Text>
                </Box>
                <Box mt="12" mb="10">
                    <Text color="whiteAlpha.700" textAlign={"center"} fontSize="small">Click “Sign Up” to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.</Text>
                </Box>
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default SignUp
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
    Spinner,
} from '@chakra-ui/react'
import styles from '../styles/Login.module.css'
import useAuth from './authentication/hooks/useAuth'

const SignUp = ({ signupClose, signupIsOpen, emailOpen, loginOpen }) => {
    const { signUpLoading, signUpWithGoogle } = useAuth();

    const handleModal = () => {
        if(signupIsOpen){
            signupClose()
        }
        loginOpen()
    }

    const handleEmail = () => {
        if(signupIsOpen){
            signupClose()
        }
        emailOpen()
    }
    return (
        <Modal onClose={signupClose} isOpen={signupIsOpen} isCentered>
            <ModalOverlay backdropBlur="3xl" background={"rgba(26, 32, 44, 0.6)"}/>
            <ModalContent bg="#000005" borderRadius="md" boxShadow={"dark-lg"} borderColor="white" border="1px" w={[300, 400, 500]}>
                <ModalBody mb="8" mt="9" marginLeft="6" marginRight="6">
                    <Heading as="h3" mb="14" size="lg" color="white">Sign Up</Heading>
                    <Box as='button'
                        onClick={handleEmail}
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
                        <Image src='/Vector (10).svg' width="15" height="15" alt="google" />
                        <Text ml="3">Sign up with Email</Text>
                    </Box>
                    <Box as='button'
                        borderRadius="full"
                        color="white"
                        border="1px"
                        borderColor="whiteAlpha.500"
                        onClick={signUpWithGoogle}
                        p={3}
                        paddingLeft="8"
                        marginBottom="6"
                        display="flex"
                        alignItems="center"
                        w="full"
                    >
                        <Image src='/google.svg' width="15" height="15" alt="google" />
                        <Text ml="3" mr={"6"} className={styles.text}>Sign up with Google</Text>
                        {
                            signUpLoading && <Spinner />
                        }
                    </Box>
                    <Box mt="8">
                        <Text color="whiteAlpha.700" fontSize="sm" textAlign={"center"}>
                            Already have an account?
                            <Text 
                            onClick={handleModal}
                            _hover={{color : "#F40580", cursor: "pointer"}} 
                            color="#F40580"
                            >
                                Login
                            </Text>
                        </Text>
                    </Box>
                    <Box mt="12" mb="10">
                        <Text color="whiteAlpha.700" textAlign={"center"} fontSize="xs">Click “Sign Up” to agree to XRATlas’s Terms of Service and acknowledge that XRAtlas’s Privacy Policy applies to you.</Text>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SignUp
import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    Box,
    Text,
    Input,
    Button,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import styles from '../styles/Login.module.css'
import useAuth from './authentication/hooks/use-auth'

const SignupWithEmail = ({ emailClose, emailIsOpen, checkOpen }) => {
    const { signUp, signUpLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const handleSignUp = async () => {
        await signUp(email, password).then(() => {
            // Toggle the verify email modal. 
            checkOpen()
        })
    }
    return (
        <Modal onClose={emailClose} isOpen={emailIsOpen} isCentered>
            <ModalOverlay />
            <ModalContent bg="#000005" borderRadius="md" boxShadow={"dark-lg"} borderColor="white" border="1px">
                <ModalBody mb="8" mt="9" marginLeft="6" marginRight="6">
                    <Heading as="h3" mb="3" textAlign="center" size="lg" color="white">Sign up with email</Heading>
                    <Text color="whiteAlpha.600" textAlign="center" mb="14" fontSize="small">Enter your email address to create an account.</Text>
                    <Box as='button'
                        color="white"
                        p={3}
                        marginBottom="6"
                        w="full"
                    >
                        <Text ml="3" color="whiteAlpha.800" fontSize="small" className={styles.text}>Your Email</Text>
                        <Input onChange={(e) => setEmail(e.target.value)} mb={"3"} borderRadius="full" borderColor="whiteAlpha.600" />
                        <Text ml="3" color="whiteAlpha.600" fontSize="small" className={styles.text}>Password</Text>
                        <InputGroup>
                            <Input onChange={(e) => setPassword(e.target.value)} type={!show ? "password" : "text"} borderColor="whiteAlpha.800"borderRadius="full"  />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' fontSize="x-small" onClick={() => setShow(!show)}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Button isLoading={signUpLoading} borderRadius="full" background="GrayText" w={"full"} onClick={handleSignUp}>Continue</Button>
                    <Box mt="12" mb="10">
                        <Text color="whiteAlpha.700" textAlign={"center"} fontSize="small">Click “Sign Up” to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.</Text>
                    </Box>
                    <Box textAlign={"center"} onClick={emailClose} cursor="pointer">
                        <Text color="whiteAlpha.500" fontSize="small">Back</Text>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SignupWithEmail
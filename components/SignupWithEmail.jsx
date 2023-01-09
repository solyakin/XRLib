import React, { useState, useEffect } from 'react'
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
import useAuth from './authentication/hooks/useAuth'

const SignupWithEmail = ({ emailClose, emailIsOpen, checkOpen }) => {
    const { signUp, signUpLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [disabled, setDisable] = useState(true);

    useEffect(() => {
        if (email !== "" && password !== "" && confirmPassword === password) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [email, password, confirmPassword])

    const handleSignUp = async () => {
        await signUp(email, password).then(() => {
            // Toggle the verify email modal. 
            emailClose()
            checkOpen()
        })
    }
    return (
        <Modal onClose={emailClose} isOpen={emailIsOpen} isCentered>
            <ModalOverlay backdropBlur="3xl" background={"rgba(26, 32, 44, 0.6)"} />
            <ModalContent bg="#000005" borderRadius="md" boxShadow={"dark-lg"} borderColor="white" border="1px" w={[300, 400, 500]}>
                <ModalBody mb="8" mt="9" marginLeft="6" marginRight="6">
                    <Heading as="h3" mb="3" textAlign="center" size="lg" color="white">Sign up with email</Heading>
                    <Text color="whiteAlpha.600" textAlign="center" mb="6" fontSize="small">Enter your email address to create an account.</Text>
                    <Box
                        color="white"
                        marginBottom="6"
                        w="full"
                    >
                        <Text ml="3" mb="2" color="whiteAlpha.800" fontSize="md" textAlign={"left"} className={styles.text}>Your Email</Text>
                        <Input onChange={(e) => setEmail(e.target.value)} mb={"3"} borderRadius="full" borderColor="whiteAlpha.600" />
                        <Text ml="3" mb="2" color="whiteAlpha.800" fontSize="md" textAlign={"left"} className={styles.text}>Password</Text>
                        <InputGroup mb={'3'}>
                            <Input onChange={(e) => setPassword(e.target.value)} type={!show ? "password" : "text"} borderColor="whiteAlpha.800" borderRadius="full" />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' fontSize="x-small" color="black" onClick={() => setShow(!show)}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Text ml="3" mb="3" color="whiteAlpha.800" fontSize="md" textAlign={"left"} className={styles.text}>Confirm Password</Text>
                        <InputGroup>
                            <Input onChange={(e) => setConfirmPassword(e.target.value)} type={!show ? "password" : "text"} borderColor="whiteAlpha.800" borderRadius="full" />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' fontSize="x-small" color="black" onClick={() => setShow2(!show)}>
                                    {show2 ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Button
                        isLoading={signUpLoading}
                        borderRadius="full"
                        background="GrayText"
                        color="white" w={"full"}
                        disabled={disabled}
                        onClick={handleSignUp}
                        _hover={{ background: "#F40580" }}
                    >
                        Continue
                    </Button>
                    <Box mt="12" mb="10">
                        <Text color="whiteAlpha.700" textAlign={"center"} fontSize="xs">Click “Sign Up” to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.</Text>
                    </Box>
                    <Box textAlign={"center"} onClick={emailClose} cursor="pointer">
                        <Text fontSize="small" color="#F40580" _hover={{ color: "#F40580" }}>Back</Text>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SignupWithEmail
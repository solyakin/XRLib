import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    Box,
    Text,
    FormControl,
    Input,
    FormLabel,
    InputRightElement,
    Button,
    InputGroup,
    HStack
} from '@chakra-ui/react'
import useAuth from './authentication/hooks/useAuth'
import styles from '../styles/Login.module.css'

const Login = ({ loginClose, loginIsOpen, signupOpen, forgetOpen }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [disabled, setDisable] = useState(true);

    const { signIn, signInLoading, signUpWithGoogle } = useAuth()

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const handleModal = () => {
        if(loginIsOpen){
            loginClose()
        }
        signupOpen()
    }

    useEffect (() => {
        if(email !== "" && password !== ""){
            setDisable(false)
        }else{
            setDisable(true)
        }
    },[email, password])
    

    return (
        <div className={styles.login}>
            <Modal onClose={loginClose} isOpen={loginIsOpen} isCentered>
                <ModalOverlay backdropBlur="3xl" background={"rgba(26, 32, 44, 0.5)"}/>
                <ModalContent bg="#000005" borderRadius="lg" boxShadow={"dark-lg"} borderColor="white" border="1px" w={[300, 400, 500]}>
                    <ModalBody mb="8" mt="9" marginLeft="6" marginRight="6">
                        <Heading as="h3" mb="6" size="lg" color="white">Login</Heading>
                        <FormControl isRequired mb="5">
                            <FormLabel color="white">Email</FormLabel>
                            <Input onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="email" placeholder='username@gmail.com' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                        </FormControl>
                        <FormControl isRequired mb="5">
                            <FormLabel color="white">Password</FormLabel>
                            <InputGroup size='md'>
                                <Input onChange={(e) => {
                                    setPassword(e.target.value)
                                }} type={!show ? "password" : "text"} borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' fontSize="x-small" onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Text fontSize="small" color="whiteAlpha.700" cursor="pointer" onClick={forgetOpen}>Forgot password?</Text>
                        <Button
                            isLoading={signInLoading}
                            onClick={() => signIn(email, password)}
                            w="full" 
                            mt="4"
                            borderRadius="full"
                            background="#F40580"
                            color="white"
                            borderColor="white"
                            border="1px"
                            mb="12"
                            disabled={disabled}
                            _disabled={{background : "grey", opacity : "0.6", cursor : "not-allowed"}}
                            _hover={{background : "inherit"}}
                        >
                            Sign In
                        </Button>
                        <Text fontSize="small" textAlign="center" color="whiteAlpha.700" mb="6">or continue with</Text>
                        <HStack spacing="4" textAlign="center">
                            <Box as="button" background="white" onClick={signUpWithGoogle} borderRadius="full" p={3} w="full">
                                <Image src="/google.svg" width={20} height={20} alt="" style={{ margin: "auto" }} />
                            </Box>
                            {/* <Box as="button" background="white" borderRadius="full" p={3} w="full">
                                <Image src="/Vector (11).svg" width={20} height={20} alt="" style={{ margin: "auto" }} />
                            </Box> */}
                            <Box as="button" background="white" borderRadius="full" p={3} w="full">
                                <Image src="/Vector (12).svg" width={20} height={20} alt="" style={{ margin: "auto" }} />
                            </Box>
                        </HStack>
                        <Text color="whiteAlpha.600" mt="8" textAlign="center" fontSize="small">
                            Don’t have an account yet?
                            <span onClick={handleModal} style={{ cursor: "pointer", marginLeft: "10px", color: "whitesmoke" }}>Sign up</span>
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Login
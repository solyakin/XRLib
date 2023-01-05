import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    Box,
    Text,
    Input,
    Button
} from '@chakra-ui/react'
import styles from '../styles/Login.module.css'
import useAuth from './authentication/hooks/useAuth'

const ForgotPassword = ({ forgetClose, forgetIsOpen }) => {
    const [email, setEmail] = useState("")
    const [done, setDone] = useState(false)
    const { resetPassword } = useAuth();

    useEffect(() => {
        // Whenever done is set to true (from reset password function), 
        if (done) alert("Reset password email sent")
    }, [done])
    return (
        <Modal onClose={forgetClose} isOpen={forgetIsOpen} isCentered>
            <ModalOverlay />
            <ModalContent bg="#000005" borderRadius="md" boxShadow={"dark-lg"} borderColor="white" border="1px">
                <ModalBody mb="8" mt="9" marginLeft="6" marginRight="6">
                    <Heading as="h3" mb="3" textAlign="center" size="lg" color="white">Forgot Password</Heading>
                    <Text color="whiteAlpha.600" textAlign="center" mb="14" fontSize="small">Don’t fret. We will send a password reset instruction to your registered email.</Text>
                    <Box as='button'
                        color="white"
                        p={3}
                        marginBottom="6"
                        w="full"
                    >
                        <Text ml="3" color="whiteAlpha.600" fontSize="small" className={styles.text}>Your Email</Text>
                        <Input variant='flushed' onChange={(e) => setEmail(e.target.value)} borderColor="whiteAlpha.600" />
                    </Box>
                    <Button onClick={() => resetPassword(email,setDone)} borderRadius="full" background="#F40580" color="white" w={"full"}>Reset password</Button>
                    <Box mt="12" mb="10">
                        <Text color="whiteAlpha.700" textAlign={"center"} fontSize="small">Click “Sign Up” to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.</Text>
                    </Box>
                    {/* <Box textAlign={"center"} onClick={emailClose} cursor="pointer">
                    <Text color="whiteAlpha.500" fontSize="small">Back</Text>
                </Box> */}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ForgotPassword
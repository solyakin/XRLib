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
    Input,
    Button
} from '@chakra-ui/react'
import Link from 'next/link'
import styles from '../styles/Login.module.css'

const SignupWithEmail = ({emailClose, emailIsOpen}) => {
  return (
    <Modal onClose={emailClose} isOpen={emailIsOpen} isCentered>
        <ModalOverlay/>
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
                    <Text ml="3" color="whiteAlpha.600" fontSize="small" className={styles.text}>Your Email</Text>
                    <Input variant='flushed' borderColor="whiteAlpha.600" />
                </Box>
                <Button borderRadius="full" background="GrayText" w={"full"}>Continue</Button>
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
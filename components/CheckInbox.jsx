import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    Box,
    Text,
    Button,
} from '@chakra-ui/react'

const CheckInbox = ({ checkClose, checkIsOpen, }) => {
  return (
        <Modal onClose={checkClose} isOpen={checkIsOpen} isCentered>
            <ModalOverlay backdropBlur="3xl" background={"rgba(26, 32, 44, 0.6)"}/>
            <ModalContent bg="#000005" borderRadius="md" boxShadow={"dark-lg"} borderColor="white" border="1px" w={[300, 400, 500]}>
                <ModalBody mb="8" mt="9" marginLeft="6" marginRight="6">
                    <Heading as="h3" mb="3" textAlign="center" size="lg" color="white">Check your inbox</Heading>
                    <Text color="whiteAlpha.600" textAlign="center" mb="14" fontSize="small">Click the link we sent to redpitbull@gmail.com to complete your account set-up.</Text>
                    
                    <Button borderRadius="full" background="GrayText" w={"full"} onClick={checkClose}>Continue</Button>
                    <Box mt="12" mb="10">
                        <Text color="whiteAlpha.700" textAlign={"center"} fontSize="small">Click “Sign Up” to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.</Text>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default CheckInbox
import Image from 'next/image'
import React from 'react'
import { ModalOverlay, Modal, ModalBody, ModalContent, Heading, Text, Button, HStack } from '@chakra-ui/react'

const SuccessModal = ({onClose, isOpen}) => {
  return (
    <div>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay background={"rgba(26, 32, 44, 0.7)"}/>
            <ModalContent bg="#000005" borderRadius="md" boxShadow={"dark-lg"} borderColor="white" border="1px">
                <ModalBody mb="8" mt="9" marginLeft="6" marginRight="6">
                    <Heading as="h3" mb="3" textAlign="center" size="md" color="white">Success</Heading>
                    <Image src='/Group1.svg' width="100" height="100" alt=""/>
                    <Text color="whiteAlpha.600" fontSize={"sm"}>Yipee!! We have updated the user list with the new addition.</Text>
                    <HStack>
                        <Button>Add Another</Button>
                        <Button w="100%" mt="12" mb="6" color="white" background={"#F40580"} borderRadius="full" fontSize={"13px"}>Send Invitation</Button>
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default SuccessModal
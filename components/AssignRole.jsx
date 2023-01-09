import React from 'react'
import { Modal, ModalOverlay, Text, ModalBody, ModalContent, Stack, Heading, RadioGroup, Radio, Button } from '@chakra-ui/react';


const AssignRole = ({assignClose, assignIsOpen}) => {
  return (
    <div>
        <Modal onClose={assignClose} isOpen={assignIsOpen} isCentered>
            <ModalOverlay background={"rgba(26, 32, 44, 0.7)"} />
            <ModalContent bg="#000005" borderRadius="md" boxShadow={"dark-lg"} borderColor="white" border="1px">
                <ModalBody mb="8" mt="9" marginLeft="6" marginRight="6">
                    <Heading as="h3" mb="3" textAlign="center" size="md" color="white">Assign role</Heading>
                    <RadioGroup onChange={''} value={''} color="white" fontSize={"sm"}>
                        <Stack direction='column'>
                            <Text color="whiteAlpha.700">Role</Text>
                            <Radio value='Administrator' borderColor={"pink"} size={"sm"} mb="3" colorScheme="pink" alignItems={"baseline"}>
                                Administrator
                                <Text color="#828282" fontSize="12px">Super control; Invite new people, modify site settings etc.</Text>
                            </Radio>
                            <Radio value='Editor' borderColor={"pink"} size={"sm"} mb="3" colorScheme="pink" alignItems={"baseline"}>
                                Editor
                                <Text color="#828282" fontSize="12px">Has access to all posts.</Text>
                            </Radio>
                            <Radio value='Contributor' borderColor={"pink"} size={"sm"} mb="3" colorScheme="pink" alignItems={"baseline"}>
                                Contributor
                                <Text color="#828282" fontSize="12px">Can write and edit their posts. They can’t publish them.</Text>
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    <Button w="100%" mt="12" mb="6" borderRadius="full" fontSize={"13px"}>Submit</Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default AssignRole
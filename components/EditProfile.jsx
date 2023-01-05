import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    FormControl,
    Input,
    FormLabel,
    Button,
    HStack
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from './authentication/hooks/useAuth'
import UserService from '../services/users/users.service'

const EditProfile = ({ onClose, isOpen }) => {
    const { userData } = useAuth();
    const queryClient = useQueryClient();
    const { error, mutate } = useMutation(async (userId, profileData) => {
        return await UserService.updateUserProfile(userId, profileData)
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["profile", userData.id])
                toast({
                    title: "Profile updated successfully!",
                    status: "success",
                    duration: 7000,
                    isClosable: true,
                });
            }
        }
    )
    return (
        <div>
            <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
                <ModalOverlay backdropBlur="3xl" background={"rgba(26, 32, 44, 0.9)"} />
                <ModalContent bg="#000005" borderRadius="lg" boxShadow={"dark-lg"} borderColor="white" border="1px">
                    <ModalBody mb="8" mt="9" marginLeft="6" marginRight="6">
                        <Heading as="h3" mb="6" size="lg" color="white">Profile information</Heading>
                        <FormControl mb="5">
                            <FormLabel color="white" fontSize="sm">Avatar</FormLabel>
                            <Input type="file"
                                borderRadius="full"
                                borderColor="whiteAlpha.400"
                                fontSize="small"
                                color="white"
                                outline="none"
                            />
                        </FormControl>
                        <HStack alignItems="center" gap="6" mb="5">
                            <FormControl isRequired>
                                <FormLabel color="white" fontSize="sm">Name</FormLabel>
                                <Input type="text" placeholder='Solomon' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel color="white" fontSize="sm">Display Name</FormLabel>
                                <Input type="text" placeholder='AS' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            </FormControl>
                        </HStack>
                        <HStack alignItems="center" gap="6" mb="5">
                            <FormControl isRequired>
                                <FormLabel color="white" fontSize="sm">Email</FormLabel>
                                <Input type="email" placeholder='username@gmail.com' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel color="white" fontSize="sm">Phone Number</FormLabel>
                                <Input type="number" placeholder='+234 81 691 14001' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            </FormControl>
                        </HStack>
                        <HStack alignItems="center" gap="6" mb="5">
                            <FormControl isRequired>
                                <FormLabel color="white" fontSize="sm">Website</FormLabel>
                                <Input type="text" placeholder='username.com' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel color="white" fontSize="sm">Facebook Username</FormLabel>
                                <Input type="text" placeholder='solomon' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            </FormControl>
                        </HStack>
                        <HStack alignItems="center" gap="6" mb="5">
                            <FormControl isRequired>
                                <FormLabel color="white" fontSize="sm">Twitter</FormLabel>
                                <Input type="text" placeholder='@username' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel color="white" fontSize="sm">Instagram handle</FormLabel>
                                <Input type="text" placeholder='@IGusername' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            </FormControl>
                        </HStack>
                        <Button
                            w="full" mt="4"
                            borderRadius="full"
                            background="#F40580"
                            color="white"
                            borderColor="white"
                            border="1px"
                            mb="12"
                        >
                            Update
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default EditProfile
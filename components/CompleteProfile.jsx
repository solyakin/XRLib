import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    Box,
    Input,
    Button,
    HStack,
    FormControl,
    FormLabel,
    VStack,
    useToast,
    Text,
} from '@chakra-ui/react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserService from '../services/users/users.service';
import useAuth from './authentication/hooks/useAuth';

const CompleteProfile = ({ profileClose, profileIsOpen }) => {
    const { userData } = useAuth();
    const queryClient = useQueryClient();
    const toast = useToast();
    const [fileToUpload, setFileToUpload] = useState(null)
    const { error, mutate } = useMutation(async ({ userId, profileData }) => {
        return await UserService.updateUserProfile(userId, profileData)
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["profile", userData?.id])
                profileClose();
                toast({
                    title: "Profile updated successfully!",
                    status: "success",
                    duration: 7000,
                    isClosable: true,
                });
            }
        }
    )
    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        setFileToUpload(file);
    }

    const [form_steps, setFormSteps] = useState({
        one1: true,
        two2: false
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            displayName: "",
            //phoneNumber:  "",
            website: "",
            facebookUrl: null,
            twitterUrl: null,
            instagramUrl: null,
            profileSummary: "",
            linkedInUrl: null,
        },
        validationSchema: Yup.object({
            name: Yup.string(),
            displayName: Yup.string().required('Required'),
            phoneNumber: Yup.string(),
            website: Yup.string(),
            facebookUrl: Yup.string(),
            twitterUrl: Yup.string(),
            linkedInUrl: null,
            instagramUrl: Yup.string(),
            profileSummary: Yup.string(),
        }),
        validateOnMount: true,
        onSubmit: async (values, onSubmitProps) => {
            let fileDownloadUrl = null;
            if (fileToUpload) fileDownloadUrl = await UserService.uploadProfileImageAndGetDownloadUrl(fileToUpload, userData?.id)
            console.log({
                ...userData, displayName: values.displayName, name: values.name, twitterUrl: `https://twitter.com/${values.twitterUrl}`, phoneNumber: values.phoneNumber, website: values.website,
                facebookUrl: `https://facebook.com/${values.facebookUrl}`, linkedInUrl: `https://linkedin.com/${values.linkedInUrl}`, profileSummary: values.profileSummary, instagramUrl: `https://instagram.com/${values.instagramUrl}`
            })
            mutate({
                userId: userData?.id, profileData: {
                    ...userData, profileImageUrl: fileDownloadUrl, name: values.name, displayName: values.displayName, twitterUrl: `https://twitter.com/${values.twitterUrl}`, phoneNumber: values.phoneNumber, website: values.website,
                    facebookUrl: `https://facebook.com/${values.facebookUrl}`, linkedInUrl: `https://linkedin.com/${values.linkedInUrl}`, profileSummary: values.profileSummary, instagramUrl: `https://instagram.com/${values.instagramUrl}`
                }
            })
        },
    })

    return (
        <div className=''>
            <Modal onClose={profileClose} isOpen={profileIsOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
                <ModalOverlay />
                <ModalContent bg="#000005" borderRadius="md" boxShadow={"dark-lg"} borderColor="#727070" border="1px" w={[300, 400, 500]}>
                    <ModalBody mb="8" mt="9">
                        <Heading as="h3" mb="3" fontSize="lg" textAlign="center" size="lg" color="white">Complete Profile</Heading>
                        <Box
                            color="white"
                            p={3}
                            marginBottom="6"
                            w="full"
                        >
                            <form onSubmit={formik.handleSubmit}>
                                {
                                    form_steps.one1 && <>
                                        <FormControl mb="4">
                                            <FormLabel color="white" fontSize="sm" fontWeight="light">Avatar</FormLabel>
                                            <Input
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                borderRadius="full"
                                                onChange={handleChangeImage}
                                                borderColor="whiteAlpha.400"
                                                fontSize="small"
                                                color="white"
                                                outline="none"
                                            />
                                        </FormControl>
                                        <HStack gap={3} mb="3">
                                            <FormControl>
                                                <FormLabel color="white" fontSize="sm" fontWeight="light">Name</FormLabel>
                                                <Input
                                                    type="text"
                                                    borderRadius="full"
                                                    borderColor="whiteAlpha.400"
                                                    fontSize="small"
                                                    color="white"
                                                    name={"name"}
                                                    outline="none"
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}

                                                />
                                                {formik.touched.name && formik.errors.name ? (
                                                    <Text color="red.400" fontSize="sm" mt="2">{formik.errors.name}</Text>
                                                ) : null}
                                            </FormControl>
                                            <FormControl >
                                                <FormLabel color="white" fontSize="sm" fontWeight="light">Public display name</FormLabel>
                                                <Input
                                                    type="text"
                                                    borderRadius="full"
                                                    borderColor="whiteAlpha.400"
                                                    name='displayName'
                                                    value={formik.values.displayName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    fontSize="small"
                                                    color="white"
                                                    outline="none"
                                                />
                                                {formik.touched.displayName && formik.errors.displayName ? (
                                                    <Text color="red.400" fontSize="sm" mt="2">{formik.errors.displayName}</Text>
                                                ) : null}
                                            </FormControl>
                                        </HStack>
                                        <HStack mb="3" gap={3}>
                                            <FormControl>
                                                <FormLabel color="white" fontSize="sm" fontWeight="light">Phone number</FormLabel>
                                                <Input
                                                    type="text"
                                                    borderRadius="full"
                                                    borderColor="whiteAlpha.400"
                                                    fontSize="small"
                                                    color="white"
                                                    outline="none"
                                                    name={"phoneNumber"}
                                                    value={formik.values.phoneNumber}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                                    <Text color="red.400" fontSize="sm" mt="2">{formik.errors.phoneNumber}</Text>
                                                ) : null}
                                            </FormControl>
                                        </HStack>
                                        <HStack mb="10">
                                            <FormControl>
                                                <FormLabel color="white" fontSize="sm" fontWeight="light">Website</FormLabel>
                                                <Input
                                                    type="email"
                                                    borderRadius="full"
                                                    borderColor="whiteAlpha.400"
                                                    fontSize="small"
                                                    color="white"
                                                    outline="none"
                                                    name={"website"}
                                                    value={formik.values.website}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.website && formik.errors.website ? (
                                                    <Text color="red.400" fontSize="sm" mt="2">{formik.errors.website}</Text>
                                                ) : null}
                                            </FormControl>
                                        </HStack>
                                        <HStack justifyContent={"flex-end"}>
                                            <Button borderRadius="full" background="#F40580" fontWeight="light" color="white" w="24" _hover={{ border: "1px solid white" }}
                                                onClick={() => setFormSteps({ one1: false, two2: true })}
                                            >
                                                Next
                                                <Image src="/IconArrow.svg" width="12" height="12" alt="" style={{ marginLeft: "8px" }} />
                                            </Button>
                                        </HStack>
                                    </>
                                }
                                {
                                    form_steps.two2 && <VStack>
                                        <FormControl>
                                            <FormLabel color="white" fontSize="sm" fontWeight="light">Facebook</FormLabel>
                                            <Input
                                                borderRadius="full"
                                                borderColor="whiteAlpha.400"
                                                fontSize="small"
                                                color="white"
                                                name={"facebookUrl"}
                                                outline="none"
                                                value={formik.values.facebookUrl}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.facebookUrl && formik.errors.facebookUrl ? (
                                                <Text color="red.400" fontSize="sm" mt="2">{formik.errors.facebookUrl}</Text>
                                            ) : null}
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel color="white" fontSize="sm" fontWeight="light">Instagram</FormLabel>
                                            <Input
                                                borderRadius="full"
                                                borderColor="whiteAlpha.400"
                                                fontSize="small"
                                                color="white"
                                                name={"instagramUrl"}
                                                outline="none"
                                                value={formik.values.instagramUrl}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.instagramUrl && formik.errors.instagramUrl ? (
                                                <Text color="red.400" fontSize="sm" mt="2">{formik.errors.instagramUrl}</Text>
                                            ) : null}
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel color="white" fontSize="sm" fontWeight="light">Twitter</FormLabel>
                                            <Input
                                                borderRadius="full"
                                                borderColor="whiteAlpha.400"
                                                fontSize="small"
                                                name={"twitterUrl"}
                                                color="white"
                                                outline="none"
                                                value={formik.values.twitterUrl}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.twitterUrl && formik.errors.twitterUrl ? (
                                                <Text color="red.400" fontSize="sm" mt="2">{formik.errors.twitterUrl}</Text>
                                            ) : null}
                                        </FormControl>

                                        <FormControl mb="10">
                                            <FormLabel color="white" fontSize="sm" fontWeight="light">Linkedin</FormLabel>
                                            <Input
                                                borderRadius="full"
                                                borderColor="whiteAlpha.400"
                                                fontSize="small"
                                                color="white"
                                                name={"linkedInUrl"}
                                                outline="none"
                                                value={formik.values.linkedInUrl}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.linkedInUrl && formik.errors.linkedInUrl ? (
                                                <Text color="red.400" fontSize="sm" mt="2">{formik.errors.linkedInUrl}</Text>
                                            ) : null}
                                        </FormControl>
                                        <HStack justifyContent="space-between" w="100%" pt="10">
                                            <Button borderRadius="full" border="1px" background="none" borderColor="#F40580" fontWeight="light" color="white" fontSize="sm" w="32" _hover={{ border: "1px solid white" }}
                                                onClick={() => setFormSteps({ one1: true, two2: false })}
                                            >
                                                Previous
                                            </Button>
                                            <Button borderRadius="full" fontSize="sm" disabled={!formik.isValid || formik.isSubmitting} background="#F40580" fontWeight="light" color="white" w="32" isLoading={formik.isSubmitting}
                                                type={"submit"} _hover={{ border: "1px solid white" }}
                                            >
                                                Submit
                                            </Button>
                                        </HStack>
                                    </VStack>
                                }
                            </form>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CompleteProfile
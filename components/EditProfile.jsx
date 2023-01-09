import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    Text,
    FormControl,
    Input,
    FormLabel,
    Button,
    HStack,
    useToast,
    Textarea
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from './authentication/hooks/useAuth'
import UserService from '../services/users/users.service'

const EditProfile = ({ onClose, isOpen }) => {
    const { userData } = useAuth();
    const queryClient = useQueryClient();
    const toast = useToast();
    const [fileToUpload, setFileToUpload] = useState(userData.profileImageUrl || null)
    const formik = useFormik({
        initialValues: {
            displayName: userData?.displayName || "",
            phoneNumber: userData?.phoneNumber || "",
            website: userData?.website || "",
            facebookUrl: userData?.facebookUrl ? userData?.facebookUrl.split('https://facebook.com/')[1] : null,
            twitterUrl: userData?.twitterUrl ? userData.twitterUrl.split('https://twitter.com/')[1] : null,
            instagramUrl: userData.instagramUrl ? userData.instagramUrl.split('https://instagram.com/')[1] : null,
            profileSummary: userData.profileSummary || "",
            linkedInUrl: userData?.linkedInUrl || ""
        },
        validationSchema: Yup.object({
            displayName: Yup.string().required('Required'),
            phoneNumber: Yup.string(),
            website: Yup.string(),
            facebookUrl: Yup.string(),
            twitterUrl: Yup.string(),
            instagramUrl: Yup.string(),
            linkedInUrl: Yup.string(),
            profileSummary: Yup.string(),
        }),
        validateOnMount: true,
        onSubmit: async (values, onSubmitProps) => {
            let fileDownloadUrl = null;
            if (fileToUpload) fileDownloadUrl = await UserService.uploadProfileImageAndGetDownloadUrl(fileToUpload, userData?.id)
            mutate({
                userId: userData?.id, profileData: {
                    ...userData, profileImageUrl: fileDownloadUrl, displayName: values.displayName, twitterUrl: `https://twitter.com/${values.twitterUrl}`, phoneNumber: values.phoneNumber, website: values.website,
                    facebookUrl: `https://facebook.com/${values.facebookUrl}`, linkedInUrl: `https://linkedin.com/${values.linkedInUrl}`, profileSummary: values.profileSummary, instagramUrl: `https://instagram.com/${values.instagramUrl}`
                }
            })
        },
    });
    const { error, mutate } = useMutation(async ({ userId, profileData }) => {
        return await UserService.updateUserProfile(userId, profileData)
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["profile", userData?.id])
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
    return (
        <div>
            <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
                <ModalOverlay backdropBlur="3xl" background={"rgba(26, 32, 44, 0.9)"} />
                <ModalContent bg="#000005" borderRadius="lg" boxShadow={"dark-lg"} borderColor="white" border="1px" w={[300, 400, 500]}>
                    <ModalBody mb="8" mt="9" marginLeft="6" marginRight="6">
                        <Heading as="h3" mb="6" size="lg" color="white">Profile information</Heading>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl mb="5">
                                <FormLabel color="white" fontSize="sm">Avatar</FormLabel>
                                <label style={{ "color": "#F40580", "cursor": "pointer" }} for="uploadImage">{fileToUpload?.name || userData?.profileImageUrl || "Select file"}</label>
                                <Input
                                    hidden
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    borderRadius="full"
                                    id={"uploadImage"}
                                    borderColor="whiteAlpha.400"
                                    fontSize="small"
                                    color="white"
                                    outline="none"
                                    onChange={handleChangeImage}
                                />
                            </FormControl>
                            <HStack alignItems="center" gap="6" mb="5">
                                <FormControl>
                                    <FormLabel color="white" fontSize="sm">Display Name</FormLabel>
                                    <Input type="text" name='displayName' value={formik.values.displayName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='AS' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                                    {formik.touched.displayName && formik.errors.displayName ? (
                                        <Text color="red.400" fontSize="sm" mt="2">{formik.errors.displayName}</Text>
                                    ) : null}
                                </FormControl>
                            </HStack>
                            <HStack alignItems="center" gap="6" mb="5">
                                <FormControl>
                                    <FormLabel color="white" fontSize="sm">Phone Number</FormLabel>
                                    <Input type="string" name='phoneNumber' value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='+234 81 691 14001' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                        <Text color="red.400" fontSize="sm" mt="2">{formik.errors.phoneNumber}</Text>
                                    ) : null}
                                </FormControl>
                            </HStack>
                            <HStack alignItems="center" gap="6" mb="5">

                                <FormControl>
                                    <FormLabel color="white" fontSize="sm">Profile Summary</FormLabel>
                                    <Textarea type="text" name='profileSummary' value={formik.values.profileSummary} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='+234 81 691 14001' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                                    {formik.touched.profileSummary && formik.errors.profileSummary ? (
                                        <Text color="red.400" fontSize="sm" mt="2">{formik.errors.profileSummary}</Text>
                                    ) : null}
                                </FormControl>
                            </HStack>
                            <HStack alignItems="center" gap="6" mb="5">
                                <FormControl>
                                    <FormLabel color="white" fontSize="sm">Website</FormLabel>
                                    <Input type="text" name='website' value={formik.values.website} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='username.com' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                                    {formik.touched.website && formik.errors.website ? (
                                        <Text color="red.400" fontSize="sm" mt="2">{formik.errors.website}</Text>
                                    ) : null}
                                </FormControl>
                                <FormControl>
                                    <FormLabel color="white" fontSize="sm">Facebook Username</FormLabel>
                                    <Input type="text" name='facebookUrl' placeholder='solomon' value={formik.values.facebookUrl} onChange={formik.handleChange} onBlur={formik.handleBlur} borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                                    {formik.touched.facebookUrl && formik.errors.facebookUrl ? (
                                        <Text color="red.400" fontSize="sm" mt="2">{formik.errors.facebookUrl}</Text>
                                    ) : null}
                                </FormControl>
                            </HStack>
                            <HStack alignItems="center" gap="6" mb="5">
                                <FormControl>
                                    <FormLabel color="white" fontSize="sm">Twitter</FormLabel>
                                    <Input type="text" name='twitterUrl' placeholder='@username' value={formik.values.twitterUrl} onChange={formik.handleChange} onBlur={formik.handleBlur} borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                                    {formik.touched.twitterUrl && formik.errors.twitterUrl ? (
                                        <Text color="red.400" fontSize="sm" mt="2">{formik.errors.twitterUrl}</Text>
                                    ) : null}
                                </FormControl>
                                <FormControl>
                                    <FormLabel color="white" fontSize="sm">Instagram handle</FormLabel>
                                    <Input type="text" name='instagramUrl' placeholder='@IGusername' value={formik.values.instagramUrl} onChange={formik.handleChange} onBlur={formik.handleBlur} borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                                    {formik.touched.instagramUrl && formik.errors.instagramUrl ? (
                                        <Text color="red.400" fontSize="sm" mt="2">{formik.errors.instagramUrl}</Text>
                                    ) : null}
                                </FormControl>
                            </HStack>
                            <Button
                                w="full" mt="4"
                                borderRadius="full"
                                background="#F40580"
                                color="white"
                                borderColor="white"
                                border="1px"
                                isLoading={formik.isSubmitting}
                                type={"submit"}
                                mb="12"
                                disabled={!formik.isValid || formik.isSubmitting}
                            >
                                Update
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default EditProfile;
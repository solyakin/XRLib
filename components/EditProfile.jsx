import React from 'react'
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
    HStack
} from '@chakra-ui/react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EditProfile = ({onClose, isOpen}) => {

    const formik = useFormik({
        initialValues: {
            name : "",
            email: "",
            display_name: "",
            phone_number: "",
            website : "",
            facebook : "",
            twitter : "",
            instagram : ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            display_name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone_number: Yup.number(),
            website: Yup.string(),
            facebook: Yup.string(),
            twitter: Yup.string(),
            instagram: Yup.string(),
        }),
        validateOnMount : true,     
        onSubmit: (values, onSubmitProps) => {
          handleSubmit(values, onSubmitProps);
        },
    });

    const handleSubmit = () => {

    }
  return (
    <div>
        <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
            <ModalOverlay backdropBlur="3xl" background={"rgba(0, 0, 0, 0.6)"} />
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
                            <Input type="text" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Solomon' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            {formik.touched.name && formik.errors.name ? (
                                <Text color="red.400" fontSize="sm" mt="2">{formik.errors.name}</Text>
                            ) : null}
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm">Display Name</FormLabel>
                            <Input type="text" name='display_name' value={formik.values.display_name} onChange={formik.handleChange} onBlur={formik.handleBlur}  placeholder='AS' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            {formik.touched.display_name && formik.errors.display_name ? (
                                <Text color="red.400" fontSize="sm" mt="2">{formik.errors.display_name}</Text>
                            ) : null}
                        </FormControl>
                    </HStack>
                    <HStack alignItems="center" gap="6" mb="5">
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm">Email</FormLabel>
                            <Input type="email" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  placeholder='username@gmail.com' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            {formik.touched.email && formik.errors.email ? (
                                <Text color="red.400" fontSize="sm" mt="2">{formik.errors.email}</Text>
                            ) : null}
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm">Phone Number</FormLabel>
                            <Input type="number" name='phone_number' value={formik.values.phone_number} onChange={formik.handleChange} onBlur={formik.handleBlur}  placeholder='+234 81 691 14001' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            {formik.touched.phone_number && formik.errors.phone_number ? (
                                <Text color="red.400" fontSize="sm" mt="2">{formik.errors.phone}</Text>
                            ) : null}
                        </FormControl>
                    </HStack>
                    <HStack alignItems="center" gap="6" mb="5">
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm">Website</FormLabel>
                            <Input type="text" name='website' value={formik.values.website} onChange={formik.handleChange} onBlur={formik.handleBlur}  placeholder='username.com' borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            {formik.touched.website && formik.errors.website ? (
                                <Text color="red.400" fontSize="sm" mt="2">{formik.errors.website}</Text>
                            ) : null}
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm">Facebook Username</FormLabel>
                            <Input type="text" name='facebook' placeholder='solomon' value={formik.values.facebook} onChange={formik.handleChange} onBlur={formik.handleBlur}  borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            {formik.touched.facebook && formik.errors.facebook ? (
                                <Text color="red.400" fontSize="sm" mt="2">{formik.errors.facebook}</Text>
                            ) : null}
                        </FormControl>
                    </HStack>
                    <HStack alignItems="center" gap="6" mb="5">
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm">Twitter</FormLabel>
                            <Input type="text" name='twitter' placeholder='@username' value={formik.values.twitter} onChange={formik.handleChange} onBlur={formik.handleBlur}  borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            {formik.touched.twitter && formik.errors.twitter ? (
                                <Text color="red.400" fontSize="sm" mt="2">{formik.errors.twitter}</Text>
                            ) : null}
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm">Instagram handle</FormLabel>
                            <Input type="text" name='instagram' placeholder='@IGusername' value={formik.values.instagram} onChange={formik.handleChange} onBlur={formik.handleBlur}  borderRadius="full" borderColor="whiteAlpha.400" fontSize="small" color="white" outline="none" />
                            {formik.touched.instagram && formik.errors.instagram ? (
                                <Text color="red.400" fontSize="sm" mt="2">{formik.errors.instagram}</Text>
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
                        mb="12"
                        disabled={!formik.isValid || formik.isSubmitting}
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
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
} from '@chakra-ui/react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

const CompleteProfile = ({profileClose, profileIsOpen}) => {

    const [form_steps, setFormSteps] = useState({
        one1 : true,
        two2 : false
    })

    const formik = useFormik({
        initialValues: {
            
        },
        validationSchema: Yup.object({
            
        }),
        validateOnMount: true,
        onSubmit: async (values, onSubmitProps) => {

        }
    })

    console.log(form_steps)
  return (
    <div className=''>
        <Modal onClose={profileClose} isOpen={profileIsOpen} isCentered>
            <ModalOverlay />
            <ModalContent bg="#000005" borderRadius="md" boxShadow={"dark-lg"} borderColor="white" border="1px" w={[300, 400, 500]}>
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
                                                borderColor="whiteAlpha.400"
                                                fontSize="small"
                                                color="white"
                                                outline="none"
                                                // onChange={handleChangeImage}
                                            />
                                        </FormControl>
                                        <FormControl mb="4">
                                            <FormLabel color="white" fontSize="sm" fontWeight="light">Cover Image</FormLabel>
                                            <Input
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                borderRadius="full"
                                                borderColor="whiteAlpha.400"
                                                fontSize="small"
                                                color="white"
                                                outline="none"
                                                // onChange={handleChangeImage}
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
                                                    outline="none"
                                                    onChange={formik.handleChange}
                                                />
                                            </FormControl>
                                            <FormControl >
                                                <FormLabel color="white" fontSize="sm" fontWeight="light">Public display name</FormLabel>
                                                <Input
                                                    type="text"
                                                    borderRadius="full"
                                                    borderColor="whiteAlpha.400"
                                                    fontSize="small"
                                                    color="white"
                                                    outline="none"
                                                    onChange={formik.handleChange}
                                                />
                                            </FormControl>
                                        </HStack>
                                        <HStack mb="3" gap={3}>
                                            <FormControl>
                                                <FormLabel color="white" fontSize="sm" fontWeight="light">Email</FormLabel>
                                                <Input
                                                    type="email"
                                                    borderRadius="full"
                                                    borderColor="whiteAlpha.400"
                                                    fontSize="small"
                                                    color="white"
                                                    outline="none"
                                                    onChange={formik.handleChange}
                                                />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel color="white" fontSize="sm" fontWeight="light">Phone number</FormLabel>
                                                <Input
                                                    type="text"
                                                    borderRadius="full"
                                                    borderColor="whiteAlpha.400"
                                                    fontSize="small"
                                                    color="white"
                                                    outline="none"
                                                    onChange={formik.handleChange}
                                                />
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
                                                    onChange={formik.handleChange}
                                                />
                                            </FormControl>
                                        </HStack>
                                        <HStack justifyContent={"flex-end"}>
                                            <Button borderRadius="full" background="#F40580" fontWeight="light" color="white" w="24" _hover={{border : "1px solid white"}} 
                                            onClick={() => setFormSteps({one1 : false, two2 : true})}
                                            >
                                                Next
                                                <Image src="/IconArrow.svg" width="12" height="12" alt="" style={{marginLeft : "8px"}}/>
                                            </Button>
                                        </HStack>   
                                </>
                            }
                            {
                                form_steps.two2 && <VStack>
                                    <FormControl>
                                        <FormLabel color="white" fontSize="sm" fontWeight="light">Facebook</FormLabel>
                                        <Input
                                            type="email"
                                            borderRadius="full"
                                            borderColor="whiteAlpha.400"
                                            fontSize="small"
                                            color="white"
                                            outline="none"
                                            onChange={formik.handleChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel color="white" fontSize="sm" fontWeight="light">Twitter</FormLabel>
                                        <Input
                                            type="email"
                                            borderRadius="full"
                                            borderColor="whiteAlpha.400"
                                            fontSize="small"
                                            color="white"
                                            outline="none"
                                            onChange={formik.handleChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel color="white" fontSize="sm" fontWeight="light">Instagram</FormLabel>
                                        <Input
                                            type="email"
                                            borderRadius="full"
                                            borderColor="whiteAlpha.400"
                                            fontSize="small"
                                            color="white"
                                            outline="none"
                                            onChange={formik.handleChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel color="white" fontSize="sm" fontWeight="light">Medium</FormLabel>
                                        <Input
                                            type="email"
                                            borderRadius="full"
                                            borderColor="whiteAlpha.400"
                                            fontSize="small"
                                            color="white"
                                            outline="none"
                                            onChange={formik.handleChange}
                                        />
                                    </FormControl>
                                    <FormControl mb="10">
                                        <FormLabel color="white" fontSize="sm" fontWeight="light">Linkedin</FormLabel>
                                        <Input
                                            type="email"
                                            borderRadius="full"
                                            borderColor="whiteAlpha.400"
                                            fontSize="small"
                                            color="white"
                                            outline="none"
                                            onChange={formik.handleChange}
                                        />
                                    </FormControl>
                                    <HStack justifyContent="space-between" w="100%" pt="10">
                                        <Button borderRadius="full" border="1px" background="none" borderColor="#F40580" fontWeight="light" color="white" fontSize="sm" w="32" _hover={{border : "1px solid white"}} 
                                        onClick={() => setFormSteps({one1 : true, two2 : false})}
                                        >
                                            Previous
                                        </Button>
                                        <Button borderRadius="full" fontSize="sm" background="#F40580" fontWeight="light" color="white" w="32" _hover={{border : "1px solid white"}} 
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
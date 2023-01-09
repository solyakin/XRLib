import React from 'react'
import Head from 'next/head';
import {
    Container,
    Box,
    Text,
    Button,
    RadioGroup, Radio,
    Input, FormControl, FormLabel, Heading,
    useDisclosure, Modal, ModalOverlay, ModalBody, ModalContent, Stack, Textarea
    Tabs, TabList, TabPanels, Tab, TabPanel,
    useDisclosure, Modal, ModalOverlay, ModalBody, ModalContent, Stack, Textarea
} from '@chakra-ui/react'
import Header from '../components/Header';
import styles from '../styles/accounts.module.css';
import AdminGuard from '../components/authentication/guards/AdminGuard';
    
import Header from '../components/Header';
import styles from '../styles/accounts.module.css';
import { useQuery } from '@tanstack/react-query';
import UserService from '../services/users/users.service';
import AdminTable from '../components/AdminTable';
import EditorTable from '../components/EditorTable';
import ContributorTable from '../components/ContributorTable';

const Accounts = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, setValue] = React.useState('1')
    const { data: adminData } = useQuery({
        queryKey: ['admin-users'], queryFn: async () => {
            return await UserService.getAllUsersByRole("admin")
        }, onSuccess: (data) => {

        },

    },
    )

    const { data: contributorData } = useQuery({
        queryKey: ['contributor-users'], queryFn: async () => {
            return await UserService.getAllUsersByRole("contributor")
        }, onSuccess: (data) => {

        },
    },
    )
    const { data: editorData } = useQuery({
        queryKey: ['editor-users'], queryFn: async () => {
            return await UserService.getAllUsersByRole("editor")
        }, onSuccess: (data) => {

        },

    },
    )


    return (
        <div className={styles.accounts}>
            <Head>
                <title>XRAtlas</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/xr.jpeg" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
            </Head>
            <main>
                <Header />
                <AdminGuard>
                    <Container maxW={"1200px"} pt="2em">
                        <HStack justifyContent="space-between">
                            <Text as="h1" fontSize="4xl">USERS</Text>
                            <Button
                                onClick={onOpen}
                                bg="transparent"
                                background={"#F40580"}
                                borderRadius="full"
                                color="white"
                                _hover={{
                                    border: "1px",
                                    borderColor: "white"
                                }}
                            >
                                <Image src='/Vector (22).svg' width="9px" alt='' mr="10px" />
                                <Text fontSize="xs">Add User</Text>
                            </Button>
                        </HStack>
                        <Box>
                            <Tabs colorScheme={"pink"}>
                                <TabList>
                                    <Tab>
                                        Admin
                                        <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">{adminData ? String(adminData.length) : "0"}</Tag>
                                    </Tab>
                                    <Tab>
                                        Editor
                                        <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">{editorData ? String(editorData.length) : "0"}</Tag>
                                    </Tab>
                                    <Tab>
                                        Contributor
                                        <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">{contributorData ? String(contributorData.length) : "0"}</Tag>
                                    </Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <AdminTable />
                                    </TabPanel>
                                    <TabPanel>
                                        <EditorTable />
                                    </TabPanel>
                                    <TabPanel>
                                        <ContributorTable />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Container>
                </AdminGuard>

                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay background={"rgba(26, 32, 44, 0.7)"} />
                    <ModalContent bg="#000005" borderRadius="md" boxShadow={"dark-lg"} borderColor="white" border="1px">
                        <ModalBody mb="8" mt="9" marginLeft="6" marginRight="6">
                            <Heading as="h3" mb="3" textAlign="center" size="md" color="white">Add New User</Heading>
                            <FormControl isRequired mb="5">
                                <FormLabel color="whiteAlpha.700">Email</FormLabel>
                                <Input type="email" placeholder='username@gmail.com' borderRadius="md" borderColor="whiteAlpha.400" fontSize="small" color="white" boder="1px" outline="none" />
                            </FormControl>
                            <RadioGroup onChange={setValue} value={value} color="white" fontSize={"sm"}>
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
                            <FormControl color="white" fontSize={"13px"} mt="4">
                                <FormLabel color="whiteAlpha.700" fontSize={"13px"}>Custom message (optional)</FormLabel>
                                <Textarea borderColor="whiteAlpha.400"></Textarea>
                                <Text color="whiteAlpha.700" fontSize={"11px"} mt="2">0/400 characters </Text>
                            </FormControl>
                            <Button w="100%" mt="12" mb="6" borderRadius="full" fontSize={"13px"}>Send Invitation</Button>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </main>
        </div>
    )
}

export default Accounts;
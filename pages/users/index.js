import React, { useState } from 'react'
import Head from 'next/head';
import {
    Container,
    Box,
    Text,
    Button,
    RadioGroup, Radio,
    Input, FormControl, FormLabel, Heading,
    HStack, Tags, Tag,
    useDisclosure, Modal, ModalOverlay, ModalBody, ModalContent, Stack, Textarea,
    Tabs, TabList, TabPanels, Tab, TabPanel, useToast,
} from '@chakra-ui/react'
import Header from '../../components/Header';
import styles from '../../styles/accounts.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UserService from '../../services/users/users.service';
import AdminTable from '../../components/AdminTable';
import EditorTable from '../../components/EditorTable';
import ContributorTable from '../../components/ContributorTable';
import AdminGuard from '../../components/authentication/guards/AdminGuard'
import AssignRole from '../../components/AssignRole';
import { AddIcon } from '@chakra-ui/icons';

const Accounts = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const queryClient = useQueryClient();
    const { isOpen: assignIsOpen, onOpen: assignOpen, onClose: assignClose } = useDisclosure();
    const [selectedUser, setSelectedUser] = useState(null);
    const [value, setValue] = React.useState('1')
    const [memberData, setMemberData] = useState(null)
    const [memberRole, setMemberRole] = useState(undefined)
    const [inviteData, setInviteData] = useState({ email: "", customMessage: "" })
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

    const { error, mutate: mutateUserRoles, isLoading } = useMutation(async ({ userId, role, setRoleToChangeTo }) => {
        return await UserService.updateUserRole(userId, role).then(() => setRoleToChangeTo(null))
    },
        {
            onSuccess: () => {
                toast({
                    title: "Role updated successfully!",
                    status: "success",
                    duration: 7000,
                    isClosable: true,
                });
                setMemberRole(undefined);
                setInviteData(undefined);
                onClose();
                queryClient.invalidateQueries(['editor-users'])
                queryClient.invalidateQueries(['admin-users'])
                queryClient.invalidateQueries(['contributor-users'])
            },
            onError: (err) => {
                toast({
                    title: `Operation failed: ${err}`,
                    status: "error",
                    duration: 7000,
                    isClosable: true,
                });
            }
        }
    )
    return (
        <div className={styles.accounts}>
            <Head>
            <title>XRAtlas</title>
            <meta name="description" content="XR Atlas focuses on exploring Extended Reality(XR), Artificial intelligence (AI), and Metaverse technologies, to better understand how these technologies are shaping the collective future of the human race!"></meta>
            <meta property="og:title" content="Exploring extended reality, aritificial intelligence and Meteverse"></meta>
            <meta property="og:description" content="XR Atlas focuses on exploring Extended Reality(XR), Artificial intelligence (AI), and Metaverse technologies, to better understand how these technologies are shaping the collective future of the human race!"></meta>
            <meta property="og:url" content="https://xratlas.vercel.app/"></meta>
            <meta property="og:type" content="website"></meta>
            <meta property="og:image" content="https://xratlas.vercel.app/Group%2073.svg"></meta>
            <meta property="og:image:secure_url" content="https://xratlas.vercel.app/Group%2073.svg"></meta>
            <meta property="og:image:width" content="1200"></meta>
            <meta property="og:image:height" content="628"></meta>
            <meta property="og:image:alt" content="XR Atlas logo"></meta>
            <meta property="og:image:type" content="image/svg"></meta>
            <link rel="icon" href="/icon-xra.png" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
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

                                <HStack>
                                    <AddIcon />
                                    <Text fontSize="xs">Promote Member</Text>
                                </HStack>
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
                                        <AdminTable setSelectedUser={setSelectedUser} assignOpen={assignOpen} mutateRole={mutateUserRoles} />
                                    </TabPanel>
                                    <TabPanel>
                                        <EditorTable setSelectedUser={setSelectedUser} assignOpen={assignOpen} mutateRole={mutateUserRoles} />
                                    </TabPanel>
                                    <TabPanel>
                                        <ContributorTable setSelectedUser={setSelectedUser} assignOpen={assignOpen} mutateRole={mutateUserRoles} />
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
                            <Heading as="h3" mb="3" textAlign="center" size="md" color="white">Promote a member</Heading>
                            <FormControl isRequired mb="5">
                                <FormLabel color="whiteAlpha.700">Email</FormLabel>
                                <Input value={inviteData?.email} onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                                    onBlur={async () => {
                                        await UserService.checkMemberWithEmailExistsAndReturnMember(inviteData?.email).then(member => setMemberData(member))
                                    }}
                                    type="email" placeholder='username@gmail.com' borderRadius="md" borderColor="whiteAlpha.400" fontSize="small" color="white" boder="1px" outline="none" />
                                {
                                    memberData &&
                                    <Text color={"green"}>
                                        Member exists
                                    </Text>

                                }
                                {
                                    !memberData &&
                                    <Text color={"red"}>
                                        Member does not exist
                                    </Text>
                                }
                            </FormControl>
                            <RadioGroup onChange={setMemberRole} value={memberRole} color="white" fontSize={"sm"}>
                                <Stack direction='column'>
                                    <Text color="whiteAlpha.700">Role</Text>
                                    <Radio value='admin' borderColor={"pink"} size={"sm"} mb="3" colorScheme="pink" alignItems={"baseline"}>
                                        Administrator
                                        <Text color="#828282" fontSize="12px">Super control; Invite new people, modify site settings etc.</Text>
                                    </Radio>
                                    <Radio value='editor' borderColor={"pink"} size={"sm"} mb="3" colorScheme="pink" alignItems={"baseline"}>
                                        Editor
                                        <Text color="#828282" fontSize="12px">Has access to all posts.</Text>
                                    </Radio>
                                    <Radio value='contributor' borderColor={"pink"} size={"sm"} mb="3" colorScheme="pink" alignItems={"baseline"}>
                                        Contributor
                                        <Text color="#828282" fontSize="12px">Can write and edit their posts. They can’t publish them.</Text>
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                            <Button w="100%" mt="12" mb="6" onClick={() => mutateUserRoles({ userId: memberData?.id, role: memberRole, setRoleToChangeTo: setMemberRole })} borderRadius="full" disabled={!memberData || memberData?.email !== inviteData.email} fontSize={"13px"}>Send Invitation</Button>
                        </ModalBody>
                    </ModalContent>
                </Modal>
                <AssignRole assignIsOpen={assignIsOpen} isLoading={isLoading} mutateRole={mutateUserRoles} assignClose={assignClose} selectedUser={selectedUser} />
            </main>
        </div>
    )
}

export default Accounts;
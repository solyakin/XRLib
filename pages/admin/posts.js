import React from 'react'
import Head from 'next/head';
import {
    Table,
    Thead,
    Tbody, Tr,Th,Td, TableContainer,
    Container,
    Box,
    Text,
    HStack,
    Button,
    Image,
    Tag,
    RadioGroup, Radio,
    Input, FormControl, FormLabel, Heading,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Menu,MenuButton,MenuList,MenuItem,
    useDisclosure, Modal, ModalOverlay, ModalBody, ModalContent, Stack, Textarea
  } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, } from '@chakra-ui/icons';
import Header from '../../components/Header';
import styles from '../../styles/accounts.module.css';

const AdminPosts = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, setValue] = React.useState('1')

  return (
    <div className={styles.accounts}>
        <Head>
            <title>XRAtlas</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/xr.jpeg" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        </Head> 
        <main>
            <Header />
            <Container maxW={"1200px"} pt="2em">
                <HStack justifyContent="space-between">
                    <Text as="h1" fontSize="4xl">POSTS</Text>
                    <Button
                    onClick={onOpen}
                    bg="transparent"
                    background={"#F40580"}
                    borderRadius="full"
                    color="white"
                    _hover={{
                        border : "1px",
                        borderColor : "white"
                    }}
                    >
                        <Image src='/sign.svg' width="12px" alt='' mr="10px" />
                        <Text fontSize="xs">New</Text>
                    </Button>
                </HStack>
                <Box>
                <Tabs colorScheme={"pink"}>
                    <TabList>
                        <Tab>
                            All
                            <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">120</Tag>
                        </Tab>
                        <Tab>
                            Draft
                            <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">2</Tag>    
                        </Tab>
                        <Tab>
                            Published
                            <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">2</Tag>
                        </Tab>
                        <Tab>
                            Comments
                            <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">2</Tag>
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <TableContainer mt="2rem" color="whiteAlpha.900">
                                <Table variant='unstyled'>
                                    <Thead>
                                    <Tr background="#333333" color="whiteAlpha.700">
                                        <Th>Title</Th>
                                        <Th>Author</Th>
                                        <Th>Email address</Th>
                                        <Th>Status</Th>
                                        <Th isNumeric></Th>
                                    </Tr>
                                    </Thead>
                                    <Tbody borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"}>
                                        <Tr borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"}>
                                            <Td>Lorem ipsum dolor sit amet</Td>
                                            <Td>Solomon Brown</Td>
                                            <Td fontSize="sm" color="#BDBDBD">Published <br></br> <Text as="span">20 Jun 2022</Text></Td>
                                            <Td>
                                                <Tag background={"#27AE60"} color="whiteAlpha.900">Published</Tag>
                                            </Td>
                                            <Td display={"flex"} justifyContent="flex-end">
                                                <Menu isLazy>
                                                    <MenuButton>
                                                        <Image src="/Vector (23).svg" width="13px" walt=""/>
                                                    </MenuButton>
                                                    <MenuList background="black" borderColor="#1B1919" minW={"40px"} py="5">
                                                        <MenuItem 
                                                            mb="3" 
                                                            background="#000000" 
                                                            _hover={{background : "white", color : "black"}}
                                                            fontSize={"sm"}
                                                        >
                                                            Edit
                                                        </MenuItem>
                                                        <MenuItem 
                                                            mb="3" 
                                                            background="#000000" 
                                                            _hover={{background : "white", color : "black"}}
                                                            fontSize={"sm"}
                                                        >
                                                            View
                                                        </MenuItem>
                                                        <MenuItem 
                                                            background="#000000" 
                                                            _hover={{background : "white", color : "black"}}
                                                            fontSize={"sm"}
                                                        >
                                                            Unpublish
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </Td>
                                        </Tr>
                                        <Tr borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"}>
                                            <Td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ad</Td>
                                            <Td>Babatunde</Td>
                                            <Td fontSize="sm" color="#BDBDBD">Published <br></br> <Text as="span">20 Jun 2022</Text></Td>
                                            <Td isNumeric>
                                                <Tag background={"#4F4F4F"} color="whiteAlpha.900">Trashed</Tag>
                                            </Td>
                                            <Td display={"flex"} justifyContent="flex-end">
                                                <Image src="/Vector (23).svg" width="13px" walt=""/>
                                            </Td>
                                        </Tr>
                                        <Tr borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"}>
                                            <Td>Lorem ipsum dolor sit amet</Td>
                                            <Td>Ada samuel</Td>
                                            <Td fontSize="sm" color="#BDBDBD">Published <br></br> <Text as="span">20 Jun 2022</Text></Td>
                                            <Td>
                                                <Tag background={"#F2994A"} color="whiteAlpha.900">In draft</Tag>
                                            </Td>
                                            <Td display={"flex"} justifyContent="flex-end">
                                                <Image src="/Vector (23).svg" width="13px" walt=""/>
                                            </Td>
                                        </Tr>
                                        <Tr borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"}>
                                            <Td>Lorem ipsum dolor sit amet</Td>
                                            <Td>Solomon Brown</Td>
                                            <Td fontSize="sm" color="#BDBDBD">Published <br></br> <Text as="span">20 Jun 2022</Text></Td>
                                            <Td>
                                                <Tag background={"#27AE60"} color="whiteAlpha.900">Published</Tag>
                                            </Td>
                                            <Td display={"flex"} justifyContent="flex-end">
                                                <Menu isLazy>
                                                    <MenuButton>
                                                        <Image src="/Vector (23).svg" width="13px" walt=""/>
                                                    </MenuButton>
                                                    <MenuList background="black" borderColor="#1B1919" minW={"40px"} py="5">
                                                        <MenuItem 
                                                            mb="3" 
                                                            background="#000000" 
                                                            _hover={{background : "white", color : "black"}}
                                                            fontSize={"sm"}
                                                        >
                                                            Edit
                                                        </MenuItem>
                                                        <MenuItem 
                                                            mb="3" 
                                                            background="#000000" 
                                                            _hover={{background : "white", color : "black"}}
                                                            fontSize={"sm"}
                                                        >
                                                            View
                                                        </MenuItem>
                                                        <MenuItem 
                                                            background="#000000" 
                                                            _hover={{background : "white", color : "black"}}
                                                            fontSize={"sm"}
                                                        >
                                                            Unpublish
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </Td>
                                        </Tr>
                                        <Tr borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"}>
                                            <Td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ad</Td>
                                            <Td>Babatunde</Td>
                                            <Td fontSize="sm" color="#BDBDBD">Published <br></br> <Text as="span">20 Jun 2022</Text></Td>
                                            <Td isNumeric>
                                                <Tag background={"#4F4F4F"} color="whiteAlpha.900">Trashed</Tag>
                                            </Td>
                                            <Td display={"flex"} justifyContent="flex-end">
                                                <Image src="/Vector (23).svg" width="13px" walt=""/>
                                            </Td>
                                        </Tr>
                                        <Tr borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"}>
                                            <Td>Lorem ipsum dolor sit amet</Td>
                                            <Td>Ada samuel</Td>
                                            <Td fontSize="sm" color="#BDBDBD">Published <br></br> <Text as="span">20 Jun 2022</Text></Td>
                                            <Td>
                                                <Tag background={"#F2994A"} color="whiteAlpha.900">In draft</Tag>
                                            </Td>
                                            <Td display={"flex"} justifyContent="flex-end">
                                                <Image src="/Vector (23).svg" width="13px" walt=""/>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel>
                        <p>drafts!</p>
                        </TabPanel>
                        <TabPanel>
                        <p>Published!</p>
                        </TabPanel>
                        <TabPanel>
                        <p>Comment!</p>
                        </TabPanel>
                    </TabPanels>
                    </Tabs>
                </Box>
            </Container>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay background={"rgba(26, 32, 44, 0.7)"}/>
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

export default AdminPosts;
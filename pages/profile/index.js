import React from 'react'
import Header from '../../components/Header'
import Head from 'next/head'
import { Grid, GridItem, Container, Box, Text, Heading, HStack, Button, Stack, useDisclosure } from '@chakra-ui/react';
import styles from '../../styles/user.module.css'
import Image from 'next/image'
import useAuth from '../../components/authentication/hooks/useAuth';
import Link from 'next/link'
import EditProfile from '../../components/EditProfile'

const user = () => {

    const { currentUser } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
   
  return (
    <div className={styles.user}>
        <Head>
            <title>XRAtlas</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/xr.jpeg" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        </Head> 
        <main>
            <Header />
            <Container maxW="1200px">
                <div className="">
                    <Heading mt="10" mb="4">PROFILE</Heading>
                    <div>
                    <Grid gridTemplateColumns={'310px 1fr 310px'} gap={2}>
                        <GridItem border="1px" borderColor="whiteAlpha.500" borderRadius="3xl" p={3}>
                            <Text mt="4">Summary</Text>
                            <Text fontSize="14px">Lorem ipsum dolor sit amet consectetur. Blandit facilisi ut leo ut in venenatis. Semper morbi eu aliquam at eu vestibulum gravida nibh. Nec dictum feugiat ut pharetra odio.</Text>
                            <Box marginTop="14rem">
                                <Text mt="4" color="whiteAlpha.600">Connect with me</Text>
                                <Box mt="4" justifyContent="left" textAlign="left">
                                    <Box display="flex" gap="2" mb="4" justifyContent="flex-start">
                                        <Image src="/Vector (13).svg" width="14" height="14" alt="" />
                                        <Text fontSize="14px" ml="2">Facebook</Text>
                                    </Box>
                                    <Box display="flex" gap="2" mb="4">
                                        <Image src="/Vector (14).svg" width="14" height="14" alt="" />
                                        <Text fontSize="14px" ml="2">Twitter </Text>
                                    </Box>
                                    <Box display="flex" gap="2" mb="4">
                                        <Image src="/Vector (15).svg" width="14" height="14" alt="" />
                                        <Text fontSize="14px" ml="2"> Instagram</Text>
                                    </Box>
                                    <Box display="flex" gap="2" mb="4">
                                        <Image src="/Vector (16).svg" width="14" height="14" alt="" />
                                        <Text fontSize="14px" ml="2">Linkedin</Text>
                                    </Box>
                                </Box>
                            </Box>
                        </GridItem>
                        <GridItem px={3}>
                            <Box position="relative">
                                <Image src="/image 1.svg" width="100" height="340" alt="" className={styles.profile_image} />
                                <Box 
                                variant="unstyled"
                                __css={{
                                    position : "absolute",
                                    bottom : "0",
                                    width : "100%",
                                    height : "90px",
                                    background: "linear-gradient(179.34deg, rgba(0, 0, 0, 0) 0.57%, #000000 99.43%)",
                                    padding : "2em"
                                }}
                                >
                                    <HStack>
                                        <img src={currentUser?.photoURL} srcSet={currentUser?.photoURL} width="50" height="50" alt="" style={{borderRadius : "7px"}}/>
                                        <Text fontSize="14px" fontWeight="bold">{currentUser?.displayName}</Text>
                                    </HStack>
                                </Box>
                            </Box>

                            <Box border="1px" borderColor="whiteAlpha.500" borderRadius="3xl" p={3} mt="3">
                                <HStack justifyContent="space-between">
                                    <Button background="#F40580" color="white" borderRadius="full" fontSize="14px">
                                        <Image src="/medal.svg" width="16" height="16" alt=""  style={{marginRight : "10px"}}/> 
                                        Contributor
                                    </Button>
                                    <Button 
                                    onClick={onOpen}
                                    borderRadius="full" 
                                    color="white" 
                                    border="1px" 
                                    borderColor=""
                                    background="transparent"
                                    fontSize="14px"
                                    minW="120px"
                                    _hover={{color : "white"}}
                                    >
                                        <Image src="/edit.svg" width="16" height="16" alt="" style={{marginRight : "10px"}}/> 
                                        Edit
                                    </Button>
                                </HStack>
                                <Box mt="5" pb="6" borderTop="1px" borderColor="whiteAlpha.500">
                                    <HStack mt="3">
                                        <HStack flex="0.5">
                                            <Image src="/photo.png" width="16" height="16" alt=""  style={{marginRight : "10px"}}/> 
                                            <Box maxW="170px">
                                                <Text fontSize="14px">Name</Text>
                                                <Text fontSize="14px">{currentUser?.displayName}</Text>
                                            </Box>
                                        </HStack>
                                        <HStack flex="0.5">
                                            <Image src="/Group.svg" width="16" height="16" alt=""  style={{marginRight : "10px"}}/> 
                                            <Box maxW="170px">
                                                <Text fontSize="14px">Display Name </Text>
                                                <Text fontSize="14px">A.Aot</Text>
                                            </Box>
                                        </HStack>
                                    </HStack>
                                    <HStack mt="6" gap="3">
                                        <HStack flex="0.5">
                                            <Image src="/mail.svg" width="16" height="16" alt=""  style={{marginRight : "10px"}}/> 
                                            <Box maxW="170px">
                                                <Text fontSize="14px">Email address</Text>
                                                <Text fontSize="14px">{currentUser?.email}</Text>
                                            </Box>
                                        </HStack>
                                        <HStack flex="0.5">
                                            <Image src="/Shape.svg" width="16" height="16" alt=""  style={{marginRight : "10px"}}/> 
                                            <Box>
                                                <Text fontSize="14px">Phone number</Text>
                                                <Text fontSize="14px">{currentUser?.phoneNumber}</Text>
                                            </Box>
                                        </HStack>
                                    </HStack>
                                    <HStack mt="6">
                                        <HStack flex="0.5">
                                            <Image src="/Icon.svg" width="16" height="16" alt=""  style={{marginRight : "10px"}}/> 
                                            <Box maxW="170px">
                                                <Text fontSize="14px">website</Text>
                                                <Text fontSize="14px" color="#F40580">Hello@carrotlabs.co</Text>
                                            </Box>
                                        </HStack>
                                        
                                    </HStack>
                                </Box>
                            </Box>
                        </GridItem>
                        <GridItem border="1px" borderColor="whiteAlpha.500" borderRadius="3xl" p={3}>
                            <Text mt="3">Posts</Text>
                            <Stack gap="4" mt="2" borderTop="1px" borderColor="whiteAlpha.500">
                                <HStack mt="2">
                                    <Text borderRadius="md" background="#2D2F33" color="white" py="1" px="2">0</Text>
                                    <Text>Total Post</Text>
                                </HStack>
                                <HStack>
                                    <Text borderRadius="md" background="#2D2F33" color="white" py="1" px="2">0</Text>
                                    <Text>Saved Post</Text>
                                </HStack>
                                <HStack>
                                    <Text borderRadius="md" background="#2D2F33" color="white" py="1" px="2">0</Text>
                                    <Text>Total Comments</Text>
                                </HStack>
                            </Stack>
                            <Box mt="12">
                                <HStack borderBottom="1px" borderColor="whiteAlpha.500" justifyContent="space-between">
                                    <Text>Recent</Text>
                                    <Text color="whiteAlpha.500" fontSize="sm" _hover={{color : "white"}}>
                                        <Link href="/profile/published">See All</Link>
                                    </Text>
                                </HStack>
                                <Box borderBottom="1px" borderColor="whiteAlpha.500" pt="2" pb="2">
                                    <HStack justifyContent="flex-end">
                                        <Text color="#F40580" fontSize="14px">5 mins read</Text>
                                    </HStack>
                                    <Text fontSize="14px">Mediated Reality: A Superset of VR, AR and MR</Text>
                                    <HStack justifyContent="flex-end">
                                        <Text fontSize="14px">4 Days Ago</Text>
                                    </HStack>
                                </Box>
                                <Box borderBottom="1px" borderColor="whiteAlpha.500" pt="2" pb="2">
                                    <HStack justifyContent="flex-end">
                                        <Text color="#F40580" fontSize="14px">5 mins read</Text>
                                    </HStack>
                                    <Text fontSize="14px">Mediated Reality: A Superset of VR, AR and MR</Text>
                                    <HStack justifyContent="flex-end">
                                        <Text fontSize="14px">4 Days Ago</Text>
                                    </HStack>
                                </Box>
                                <Box borderBottom="1px" borderColor="whiteAlpha.500" pt="2" pb="2">
                                    <HStack justifyContent="flex-end">
                                        <Text color="#F40580" fontSize="14px">5 mins read</Text>
                                    </HStack>
                                    <Text fontSize="14px">Mediated Reality: A Superset of VR, AR and MR</Text>
                                    <HStack justifyContent="flex-end">
                                        <Text fontSize="14px">4 Days Ago</Text>
                                    </HStack>
                                </Box>
                            </Box>
                        </GridItem>
                    </Grid>
                    </div>
                </div>
                <EditProfile isOpen={isOpen} onClose={onClose}/>
            </Container>
        </main>
    </div>
  )
}

export default user
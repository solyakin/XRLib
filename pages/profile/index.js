import React from 'react'
import Header from '../../components/Header'
import Head from 'next/head'
import { Grid, GridItem, Container, Box, Text, Heading, HStack, Button, Stack, useDisclosure, useToast } from '@chakra-ui/react';
import styles from '../../styles/user.module.css'
import Image from 'next/image'
import { useQuery } from "@tanstack/react-query"
import useAuth from '../../components/authentication/hooks/useAuth';
import Link from 'next/link'
import EditProfile from '../../components/EditProfile'
import PostsService from '../../services/posts/posts.service';
import SignedInGuard from '../../components/authentication/guards/SignedInGuard';
import UserService from '../../services/users/users.service';
import { date } from 'yup';
import timeAgo from '../../utils/dateToTimeAgo';
import timestampToDate from '../../utils/timestamp-to-date';

const Profile = () => {

    const { currentUser, userData: userD, setUserData } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const { data: userData } = useQuery({
        queryKey: ['profile', userD?.id], queryFn: async () => {
            return await UserService.getUserData(userD?.id)
        }, onSuccess: (data) => {


        },

    },
    )
    const { data: myRecentPosts } = useQuery({
        queryKey: ['recent-posts', userD?.id], queryFn: async () => {
            return await PostsService.getMyRecentPosts(userD?.id)
        },

    },
    )

    const { isLoading, data: postCount } = useQuery({
        queryKey: ['post-count', userData?.id], queryFn: async () => {
            return await PostsService.getPostsCountByUserId(userData.id)
        }, onSuccess: (data) => {
            //console.log(data)
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "Error fetching posts. Please refresh the page",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        },
    },
    )

    // console.log(currentUser)

    return (
        <div className={styles.user}>
            <Head>
                <title>Profile | XRAtlas</title>
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
            <SignedInGuard>
                <main>
                    <Header />
                    <Container maxW="1200px">
                        <div className="">
                            <Heading mt="2" mb="3" fontSize={"lg"}>PROFILE</Heading>
                            <div>
                                <Grid gridTemplateColumns={{ lg: '310px 1fr 310px', sm: "block" }} gap={2}>
                                    <GridItem border="1px" borderColor="whiteAlpha.500" borderRadius="3xl" p={3} display={{ lg: "block", sm: "none" }}>
                                        <Text mt="4">Summary</Text>
                                        <Text fontSize="14px">{userData?.profileSummary}</Text>
                                        <Box marginTop="14rem">
                                            <Text mt="4" color="whiteAlpha.600">Connect with me</Text>
                                            <Box mt="4" justifyContent="left" textAlign="left">
                                                {
                                                    userData?.facebookUrl &&
                                                    <Box display="flex" gap="2" mb="4" justifyContent="flex-start">
                                                        <Image src="/Vector (13).svg" width="14" height="14" alt="" />
                                                        <Link href={userData.facebookUrl} target={"_blank"}>
                                                            <Text fontSize="14px" ml="2">Facebook</Text>
                                                        </Link>
                                                    </Box>
                                                }
                                                {
                                                    userData?.twitterUrl &&

                                                    <Box display="flex" gap="2" mb="4">
                                                        <Image src="/Vector (14).svg" width="14" height="14" alt="" />
                                                        <Link href={userData.twitterUrl} target={"_blank"}>
                                                            <Text fontSize="14px" ml="2">Twitter </Text>
                                                        </Link>
                                                    </Box>}
                                                {
                                                    userData?.instagramUrl &&

                                                    <Box display="flex" gap="2" mb="4">
                                                        <Image src="/Vector (15).svg" width="14" height="14" alt="" />
                                                        <Link href={userData.instagramUrl} target={"_blank"}>
                                                            <Text fontSize="14px" ml="2"> Instagram</Text>
                                                        </Link>

                                                    </Box>
                                                }
                                                {

                                                    userData?.linkedInUrl &&

                                                    <Box display="flex" gap="2" mb="4">
                                                        <Image src="/Vector (16).svg" width="14" height="14" alt="" />
                                                        <Link href={userData.linkedInUrl} target={"_blank"}>
                                                            <Text fontSize="14px" ml="2">Linkedin</Text>
                                                        </Link>

                                                    </Box>
                                                }
                                            </Box>
                                        </Box>
                                    </GridItem>
                                    <GridItem px={3}>
                                        <Box position="relative">
                                            <Image src="/image 1.svg" width="100" height="340" alt="" className={styles.profile_image} />
                                            <Box
                                                variant="unstyled"
                                                __css={{
                                                    position: "absolute",
                                                    bottom: "0",
                                                    width: "100%",
                                                    height: "90px",
                                                    background: "linear-gradient(179.34deg, rgba(0, 0, 0, 0) 0.57%, #000000 99.43%)",
                                                    padding: "2em"
                                                }}
                                            >
                                                <HStack>
                                                    <img src={userData?.profileImageUrl || "/AVATAR.svg"} srcSet={userData?.profileImageUrl || "/AVATAR.svg"} width="50" height="50" alt="" style={{ borderRadius: "7px", height : "50px", objectFit : "cover" }} />
                                                    <Text fontSize="14px" fontWeight="bold">{currentUser?.displayName}</Text>
                                                </HStack>
                                            </Box>
                                        </Box>

                                        <Box border="1px" borderColor="whiteAlpha.500" borderRadius="3xl" p={3} mt="3">
                                            <HStack justifyContent="space-between">
                                                <Button background="#F40580" color="white" borderRadius="full" fontSize="14px">
                                                    <Image src="/medal.svg" width="16" height="16" alt="" style={{ marginRight: "10px" }} />
                                                    <Text textTransform={"capitalize"}>{userData?.role || "member"}</Text>
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
                                                    _hover={{ color: "white" }}
                                                >
                                                    <Image src="/edit.svg" width="16" height="16" alt="" style={{ marginRight: "10px" }} />
                                                    Edit
                                                </Button>
                                            </HStack>
                                            <Box mt="5" pb="6" borderTop="1px" borderColor="whiteAlpha.500">
                                                <HStack mt="3" display={{ sm: "block", lg: "flex" }}>
                                                    <HStack flex="0.5">
                                                        <Image src="/photo.png" width="16" height="16" alt="" style={{ marginRight: "10px" }} />
                                                        <Box maxW="170px">
                                                            <Text fontSize="14px">Name</Text>
                                                            <Text fontSize="14px">{currentUser?.displayName || userData?.name}</Text>
                                                        </Box>
                                                    </HStack>
                                                    <HStack flex="0.5" mt={{ sm: "5" }}>
                                                        <Image src="/Group.svg" width="16" height="16" alt="" style={{ marginRight: "10px" }} />
                                                        <Box maxW="170px">
                                                            <Text fontSize="14px">Display Name </Text>  
                                                            <Text fontSize="14px">{userData?.displayName || userData?.displayName}</Text>
                                                        </Box>
                                                    </HStack>
                                                </HStack>
                                                <HStack mt="6" gap="3" display={{ sm: "block", lg: "flex" }}>
                                                    <HStack flex="0.5">
                                                        <Image src="/mail.svg" width="16" height="16" alt="" style={{ marginRight: "10px" }} />
                                                        <Box maxW="170px">
                                                            <Text fontSize="14px">Email address</Text>
                                                            <Text fontSize="14px">{currentUser?.email}</Text>
                                                        </Box>
                                                    </HStack>
                                                    <HStack flex="0.5">
                                                        <Image src="/Shape.svg" width="16" height="16" alt="" style={{ marginRight: "10px" }} />
                                                        <Box>
                                                            <Text fontSize="14px">Phone number</Text>
                                                            <Text fontSize="14px">{userData?.phoneNumber || "Not set"}</Text>
                                                        </Box>
                                                    </HStack>
                                                </HStack>
                                                <HStack mt="6">
                                                    <HStack flex="0.5">
                                                        <Image src="/Icon.svg" width="16" height="16" alt="" style={{ marginRight: "10px" }} />
                                                        <Box maxW="170px">
                                                            <Text fontSize="14px">website</Text>
                                                            <Text fontSize="14px" color="#F40580">{userData?.website}</Text>
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
                                                <Text borderRadius="md" background="#2D2F33" color="white" py="1" px="2">{postCount || 0}</Text>
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
                                                <Text color="whiteAlpha.500" fontSize="sm" _hover={{ color: "white" }}>
                                                    <Link href="/profile/my-post">See All</Link>
                                                </Text>
                                            </HStack>
                                            {
                                                myRecentPosts && myRecentPosts.length < 1 && (
                                                    <Text>
                                                        Nothing to see here...
                                                    </Text>
                                                )
                                            }
                                            {
                                                myRecentPosts && myRecentPosts.map((post, index) => {
                                                    return (
                                                        <Box borderBottom="1px" borderColor="whiteAlpha.500" pt="2" pb="2" key={index}>
                                                            <HStack justifyContent="flex-end">
                                                                <Text color="#F40580" fontSize="14px">{post.readMinutes} mins read</Text>
                                                            </HStack>
                                                            <Text fontSize="14px">{post.title}</Text>
                                                            <HStack justifyContent="flex-end">
                                                                <Text fontSize="14px">{timeAgo(timestampToDate(post.createdAt))}</Text>
                                                            </HStack>
                                                        </Box>
                                                    )
                                                })
                                            }
                                        </Box>
                                    </GridItem>
                                </Grid>
                            </div>
                        </div>
                        <EditProfile isOpen={isOpen} onClose={onClose} />
                    </Container>
                </main>
            </SignedInGuard>
        </div>
    )
}

export default Profile;
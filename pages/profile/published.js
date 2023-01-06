import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import styles from '../../styles/profile.module.css'
import Image from 'next/image'
import { Avatar, Center, Container, Spinner, useToast, Tabs, Tag, Tab, TabPanel, TabList, TabPanels } from '@chakra-ui/react'
import Link from 'next/link'
import useAuth from '../../components/authentication/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import PostsService from '../../services/posts/posts.service'
import ContributorGuard from '../../components/authentication/guards/ContributorGuard'


const Published = () => {
    const { userData } = useAuth();
    const toast = useToast();
    const { isLoading, data } = useQuery({
        queryKey: ['posts', userData?.id], queryFn: async () => {
            console.log(userData?.id)
            return await PostsService.getPublishedPostsByUserId(userData?.id)
        }, onSuccess: (data) => {
            console.log(data)
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
    return (
        <ContributorGuard>
            <div className={styles.profile}>
                <Head>
                    <title>XRAtlas</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/xr.jpeg" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
                </Head>
                <main className={styles.main}>
                    <Header />
                    <Container maxW="950px" mt="6">
                        <div className={styles.wrapper}>
                            <div className={styles.title}>
                                <h2>Your Posts</h2>
                                <Link href="/profile/create">
                                    <button>
                                        <Image src="/sign.svg" width="14" height="14" alt="" />
                                        New post
                                    </button>
                                </Link>
                            </div>
                            <Tabs colorScheme={"pink"}>
                                <TabList>
                                    <Tab>
                                        Published
                                        <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">2</Tag>
                                    </Tab>
                                    <Tab>
                                        Draft
                                        <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">2</Tag>    
                                    </Tab>
                                    <Tab>
                                        Comments
                                        <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">2</Tag>
                                    </Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <div className={styles.list}>
                                            {
                                                isLoading && (
                                                    <Center>
                                                        <Spinner />
                                                    </Center>
                                                )
                                            }
                                            {
                                                data && data.map((post, index) => {
                                                    return (
                                                        <Link href={encodeURIComponent(`/${post.id}`)} key={index}>
                                                            <div className={styles.newsletter}>
                                                                <div className={styles.content}>
                                                                    <div className={styles.text}>
                                                                        <h3>{post.title}</h3>
                                                                        <p>{post.content.substring(0, 290)}...</p>
                                                                    </div>
                                                                    <div className={styles.author}>
                                                                        <Avatar size={"sm"} src={post.author.profileImageUrl} />
                                                                        <p style={{ textTransform: "capitalize" }}>{post.author.displayName}<span> · {post.readMinutes} mins read</span></p>
                                                                    </div>
                                                                </div>
                                                                <div className={styles.photo}>
                                                                    <img src={post.thumbnailUrl} width={"140px"} height={"140px"} alt="" />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                    <p>Draft</p>
                                    </TabPanel>
                                    <TabPanel>
                                    <p>Comments</p>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                    </Container>
                </main>
            </div>
        </ContributorGuard>
    )
}

export default Published;
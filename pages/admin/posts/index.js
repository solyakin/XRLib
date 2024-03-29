import React from 'react'
import Head from 'next/head';
import {
    Table,
    Thead,
    Tbody, Tr, Th, Td, TableContainer,
    Container,
    Box,
    Text,
    HStack,
    Image,
    Tag,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Menu, MenuButton, MenuList, MenuItem,
    useToast, Center, Spinner
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PostsService from '../../../services/posts/posts.service'
import Header from '../../../components/Header';
import styles from '../../../styles/accounts.module.css';
import timestampToDate from '../../../utils/timestamp-to-date';
import EditorGuard from '../../../components/authentication/guards/EditorGuard';
import { useRouter } from 'next/router';

const AdminPosts = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const router = useRouter();
    const { isLoading: allPostsLoading, data: allPosts } = useQuery({
        queryKey: ['all-posts'], queryFn: async () => {
            return await PostsService.getAllPosts();
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
    }
    )
    const { isLoading: allUnpublishedPostsLoading, data: allUnpublishedPosts } = useQuery({
        queryKey: ['all-unpublished-posts'], queryFn: async () => {
            return await PostsService.getAllUnpublishedPosts()
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
    const { isLoading: allPublishedPostsLoading, data: allPublishedPosts } = useQuery({
        queryKey: ['all-published-posts'], queryFn: async () => {
            return await PostsService.getAllPublishedPosts()
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

    const { error, mutate: publishPost, isLoading } = useMutation(async ({ postId }) => {
        return await PostsService.publishPost(postId);
    },
        {
            onSuccess: () => {
                toast({
                    title: "Post published successfully!",
                    status: "success",
                    duration: 7000,
                    isClosable: true,
                });
                queryClient.invalidateQueries(['all-posts'])
                queryClient.invalidateQueries(['all-published-posts'])
                queryClient.invalidateQueries(['all-unpublished-posts'])
                queryClient.invalidateQueries(['recent-posts'])

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
    const { error: unpublishError, mutate: unpublishPost, isLoading: unpublishLoading } = useMutation(async ({ postId }) => {
        return await PostsService.unPublishPost(postId);
    },
        {
            onSuccess: () => {
                toast({
                    title: "Post unpublished successfully!",
                    status: "success",
                    duration: 7000,
                    isClosable: true,
                });
                queryClient.invalidateQueries(['all-published-posts'])
                queryClient.invalidateQueries(['all-posts'])
                queryClient.invalidateQueries(['all-unpublished-posts'])
                queryClient.invalidateQueries(['recent-posts'])
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
        <EditorGuard>
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
                    <Container maxW={"1200px"} pt="2em">
                        <HStack justifyContent="space-between">
                            <Text as="h1" fontSize="4xl">POSTS</Text>

                        </HStack>
                        <Box>
                            <Tabs colorScheme={"pink"}>
                                <TabList>
                                    <Tab>
                                        All
                                        <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">{allPosts?.length || 0}</Tag>
                                    </Tab>
                                    <Tab>
                                        Published
                                        <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">{allPublishedPosts?.length || 0}</Tag>
                                    </Tab>
                                    <Tab>
                                        Unpublished
                                        <Tag ml={"2"} size="sm" borderRadius="full" background={"#F40580"} color="whiteAlpha.900">{allUnpublishedPosts?.length || 0}</Tag>
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
                                                        <Th>Publish Date</Th>
                                                        <Th>Status</Th>
                                                        <Th isNumeric></Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"}>
                                                    {
                                                        allPostsLoading && (
                                                            <Center>
                                                                <Spinner />
                                                            </Center>
                                                        )
                                                    }
                                                    {
                                                        allPosts && allPosts.map((post, index) => {
                                                            return (
                                                                <Tr borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"} key={index}>
                                                                    <Td>{post.title}</Td>
                                                                    <Td>{post.author.displayName}</Td>
                                                                    {post.isPublished && <Td fontSize="sm" color="#BDBDBD">Published <br></br> <Text as="span">{timestampToDate(post.publishedAt, true) || timestampToDate(post.lastUpdated, true) || timestampToDate(post.createdAt, true)}</Text></Td>}
                                                                    {!post.isPublished && <Td fontSize="sm" color="#BDBDBD">N/A</Td>}
                                                                    <Td>
                                                                        {post.isPublished && <Tag background={"#27AE60"} color="whiteAlpha.900">Published</Tag>}
                                                                        {!post.isPublished && <Tag background={"#4F4F4F"} color="whiteAlpha.900">Unpublished</Tag>}
                                                                    </Td>
                                                                    <Td display={"flex"} justifyContent="flex-end">
                                                                        <Menu isLazy>
                                                                            <MenuButton>
                                                                                <Image src="/Vector (23).svg" width="13px" alt="" />
                                                                            </MenuButton>
                                                                            <MenuList background="black" borderColor="#1B1919" minW={"40px"} py="5">
                                                                                <MenuItem
                                                                                    mb="3"
                                                                                    background="#000000"
                                                                                    onClick={() => { router.push({ pathname: `./posts/edit/${post.id}` }) }}
                                                                                    _hover={{ background: "white", color: "black" }}
                                                                                    fontSize={"sm"}
                                                                                >
                                                                                    Edit
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    mb="3"
                                                                                    background="#000000"
                                                                                    onClick={() => { router.push({ pathname: `./posts/${post.id}` }) }}
                                                                                    _hover={{ background: "white", color: "black" }}
                                                                                    fontSize={"sm"}
                                                                                >
                                                                                    View
                                                                                </MenuItem>
                                                                                {
                                                                                    post.isPublished &&
                                                                                    <MenuItem
                                                                                        onClick={() => unpublishPost({ postId: post.id })}
                                                                                        background="#000000"
                                                                                        _hover={{ background: "white", color: "black" }}
                                                                                        fontSize={"sm"}
                                                                                    >
                                                                                        Unpublish
                                                                                    </MenuItem>
                                                                                }
                                                                                {
                                                                                    !post.isPublished &&
                                                                                    <MenuItem
                                                                                        onClick={() => publishPost({ postId: post.id })}
                                                                                        background="#000000"
                                                                                        _hover={{ background: "white", color: "black" }}
                                                                                        fontSize={"sm"}
                                                                                    >
                                                                                        Publish
                                                                                    </MenuItem>
                                                                                }
                                                                            </MenuList>
                                                                        </Menu>
                                                                    </Td>
                                                                </Tr>
                                                            )
                                                        })
                                                    }
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                    <TabPanel>
                                        <TableContainer mt="2rem" color="whiteAlpha.900">
                                            <Table variant='unstyled'>
                                                <Thead>
                                                    <Tr background="#333333" color="whiteAlpha.700">
                                                        <Th>Title</Th>
                                                        <Th>Author</Th>
                                                        <Th>Publish Date</Th>
                                                        <Th>Status</Th>
                                                        <Th isNumeric></Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"}>
                                                    {
                                                        allPublishedPostsLoading && (
                                                            <Center>
                                                                <Spinner />
                                                            </Center>
                                                        )
                                                    }
                                                    {
                                                        allPublishedPosts && allPublishedPosts.map((post, index) => {
                                                            return (
                                                                <Tr borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"} key={index}>
                                                                    <Td>{post.title}</Td>
                                                                    <Td>{post.author.displayName}</Td>
                                                                    {post.isPublished && <Td fontSize="sm" color="#BDBDBD">Published <br></br> <Text as="span">{timestampToDate(post.publishedAt, true) || timestampToDate(post.lastUpdated, true) || timestampToDate(post.createdAt, true)}</Text></Td>}
                                                                    {!post.isPublished && <Td fontSize="sm" color="#BDBDBD">N/A</Td>}
                                                                    <Td>
                                                                        {post.isPublished && <Tag background={"#27AE60"} color="whiteAlpha.900">Published</Tag>}
                                                                        {!post.isPublished && <Tag background={"#4F4F4F"} color="whiteAlpha.900">Unpublished</Tag>}

                                                                    </Td>
                                                                    <Td display={"flex"} justifyContent="flex-end">
                                                                        <Menu isLazy>
                                                                            <MenuButton>
                                                                                <Image src="/Vector (23).svg" width="13px" walt="" />
                                                                            </MenuButton>
                                                                            <MenuList background="black" borderColor="#1B1919" minW={"40px"} py="5">
                                                                                <MenuItem
                                                                                    mb="3"
                                                                                    background="#000000"
                                                                                    _hover={{ background: "white", color: "black" }}
                                                                                    fontSize={"sm"}
                                                                                    onClick={() => { router.push({ pathname: `./posts/edit/${post.id}` }) }}
                                                                                >
                                                                                    Edit
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    mb="3"
                                                                                    background="#000000"
                                                                                    onClick={() => { router.push({ pathname: `./posts/${post.id}` }) }}
                                                                                    _hover={{ background: "white", color: "black" }}
                                                                                    fontSize={"sm"}
                                                                                >
                                                                                    View
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    onClick={() => unpublishPost({ postId: post.id })}
                                                                                    background="#000000"
                                                                                    _hover={{ background: "white", color: "black" }}
                                                                                    fontSize={"sm"}
                                                                                >
                                                                                    Unpublish
                                                                                </MenuItem>
                                                                            </MenuList>
                                                                        </Menu>
                                                                    </Td>
                                                                </Tr>
                                                            )
                                                        })
                                                    }
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                    <TabPanel>
                                        <TableContainer mt="2rem" color="whiteAlpha.900">
                                            <Table variant='unstyled'>
                                                <Thead>
                                                    <Tr background="#333333" color="whiteAlpha.700">
                                                        <Th>Title</Th>
                                                        <Th>Author</Th>
                                                        <Th>Publish Date</Th>
                                                        <Th>Status</Th>
                                                        <Th isNumeric></Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"}>
                                                    {
                                                        allUnpublishedPostsLoading && (
                                                            <Center>
                                                                <Spinner />
                                                            </Center>
                                                        )
                                                    }
                                                    {
                                                        allUnpublishedPosts && allUnpublishedPosts.map((post, index) => {
                                                            return (
                                                                <Tr borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"} key={index}>
                                                                    <Td>{post.title}</Td>
                                                                    <Td>{post.author.displayName}</Td>
                                                                    {post.isPublished && <Td fontSize="sm" color="#BDBDBD">Published <br></br> <Text as="span">{timestampToDate(post.publishedAt, true) || timestampToDate(post.lastUpdated, true) || timestampToDate(post.createdAt, true)}r</Text></Td>}
                                                                    {!post.isPublished && <Td fontSize="sm" color="#BDBDBD">N/A</Td>}
                                                                    <Td>
                                                                        {post.isPublished && <Tag background={"#27AE60"} color="whiteAlpha.900">Published</Tag>}
                                                                        {!post.isPublished && <Tag background={"#4F4F4F"} color="whiteAlpha.900">Unpublished</Tag>}

                                                                    </Td>
                                                                    <Td display={"flex"} justifyContent="flex-end">
                                                                        <Menu isLazy>
                                                                            <MenuButton>
                                                                                <Image src="/Vector (23).svg" width="13px" walt="" />
                                                                            </MenuButton>
                                                                            <MenuList background="black" borderColor="#1B1919" minW={"40px"} py="5">
                                                                                <MenuItem
                                                                                    mb="3"
                                                                                    background="#000000"
                                                                                    _hover={{ background: "white", color: "black" }}
                                                                                    fontSize={"sm"}
                                                                                    onClick={() => { router.push({ pathname: `./posts/edit/${post.id}` }) }}
                                                                                >
                                                                                    Edit
                                                                                </MenuItem>
                                                                                <MenuItem

                                                                                    mb="3"
                                                                                    background="#000000"
                                                                                    _hover={{ background: "white", color: "black" }}
                                                                                    fontSize={"sm"}
                                                                                    onClick={() => { router.push({ pathname: `./posts/${post.id}` }) }}
                                                                                >
                                                                                    View
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    background="#000000"
                                                                                    onClick={() => publishPost({ postId: post.id })}
                                                                                    _hover={{ background: "white", color: "black" }}
                                                                                    fontSize={"sm"}
                                                                                >
                                                                                    Publish
                                                                                </MenuItem>
                                                                            </MenuList>
                                                                        </Menu>
                                                                    </Td>
                                                                </Tr>
                                                            )
                                                        })
                                                    }
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Container>

                </main>
            </div>
        </EditorGuard>
    )
}

export default AdminPosts;
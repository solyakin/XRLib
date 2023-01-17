import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import styles from '../../styles/Create.module.css'
import Image from 'next/image'
import { Button, Container, HStack, Text, FormControl, FormLabel, Input, useToast, Textarea, Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css';
import ContributorGuard from '../../components/authentication/guards/ContributorGuard'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostsService from '../../services/posts/posts.service'
import useAuth from '../../components/authentication/hooks/useAuth'
import convertHtmlToText from '../../utils/html-to-text'
import { useRouter } from 'next/router'

const Editor2 = dynamic(() => import('../../components/Editor2'), {
    ssr: false,
});

const Create = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useRouter();
    const { userData } = useAuth();
    const [draftData, setDraftData] = useState({ content: "", draftId: undefined, readMinutes: null, title: "", description: "", imagePaths: [], customUrlSlug: null });
    const [postImage, setPostImage] = useState();
    const [postData, setPostData] = useState({ content: "", readMinutes: null, title: "", description: "", imagePaths: [], customUrlSlug: null })
    const [draftLastUpdated, setDraftLastUpdated] = useState(null);
    const [htmlBlockState, setHtmlBlockState] = useState(null)

    function countWords(s) {
        s = s.replace(/(^\s*)|(\s*$)/gi, "");//exclude  start and end white-space
        s = s.replace(/[ ]{2,}/gi, " ");//2 or more space to 1
        s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
        return s.split(' ').filter(function (str) { return str != ""; }).length;
        //return s.split(' ').filter(String).length; - this can also be used
    }

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


    const { error, mutate, isLoading } = useMutation(async (draftData) => {
        let authorData = {
            id: userData?.id,
            displayName: userData?.displayName,
            profileImageUrl: userData?.profileImageUrl,
        }
        
        return await PostsService.saveDraft(authorData, { ...draftData, ...postData, content: htmlBlockState, contentText: convertHtmlToText(htmlBlockState), readMinutes: Math.ceil(countWords(convertHtmlToText(htmlBlockState)) / 200) }, setDraftData)
    },
        {
            onSuccess: () => {
                setDraftLastUpdated(new Date())
            }
        }
    )
    const { error: postError, mutate: postMutate, isLoading: postIsLoading } = useMutation(async (postData) => {
        let authorData = {
            id: userData?.id,
            displayName: userData?.displayName,
            profileImageUrl: userData?.profileImageUrl,
        }
        const randomString = makeid(11)
        return await PostsService.uploadPost(authorData, { ...postData, content: htmlBlockState, isPublished: false, customUrlSlug: `${postData.title.toLowerCase().split(" ").join("-")}-${randomString}`, contentText: convertHtmlToText(htmlBlockState), readMinutes: Math.ceil(countWords(convertHtmlToText(htmlBlockState)) / 200) }, postImage)
    },
        {
            onSuccess: () => {
                toast({
                    title: "Hurray! Your post has been uploaded",
                    description: "Our editors will review and if it makes the cut, you'll be on our newsletter!",
                    status: "success",
                    duration: 7000,
                    isClosable: true,
                });
                queryClient.invalidateQueries(["posts", userData?.id])
                queryClient.invalidateQueries(["unpublished-posts", userData?.id])
                navigate.push({
                    pathname: '../profile/my-post'
                })
                // We can navigate back here. @Solyakin
            },
            onError: () => {
                toast({
                    title: "Error submitting post",
                    description: "Try saving to drafts, refreshing the page and submitting post again.",
                    status: "error",
                    duration: 7000,
                    isClosable: true,
                });
            }
        }

    )

    const handleChangePostImage = (e) => {
        const file = e.target.files[0];
        setPostImage(file);
    }




    return (
        <div className={styles.create}>
            <Head>
                <title>XRAtlas</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/xr.jpeg" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
            </Head>
            <ContributorGuard>
                <main>
                    <Header />
                    <Container maxW="900px" mt="8">
                        {
                            isLoading &&
                            <Text>
                                Updating...
                            </Text>
                        }
                        {draftLastUpdated &&
                            <Text color="#F40580" fontSize="xs" mb="2">
                                Last updated {draftLastUpdated.toUTCString()}
                            </Text>
                        }
                        <HStack justifyContent="flex-end" >
                            <HStack>

                                <Button bg="none" borderColor="#F40580" borderRadius="full" _hover={{ background: "none" }} onClick={() => mutate(draftData)} isLoading={isLoading} className={styles.publish_btn}>

                                    <Image src="/upload.svg" width="14" height="14" alt="" />
                                    Save to drafts
                                </Button>

                                <Button isLoading={postIsLoading} background="#F40580" borderRadius="full" className={styles.publish_btn} onClick={() => {
                                    postMutate(postData)
                                }} >
                                    <Image src="/upload.svg" width="14" height="14" alt="" />
                                    Save to posts
                                </Button>

                            </HStack>
                        </HStack>
                        <FormControl mb="4" w={['100%', 400, 500]}>
                            <FormLabel color="whiteAlpha.500" fontSize="sm">Title</FormLabel>
                            <Input
                                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                                type="text"
                                required
                                borderRadius="md"
                                borderColor="whiteAlpha.400"
                                fontSize="small"
                                color="white"
                                outline="none"
                            />
                        </FormControl>
                        <FormControl mb="4" w={['100%', 400, 500]}>
                            <FormLabel color="white" fontSize="sm">Description</FormLabel>
                            <Textarea
                                onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                                type="text"
                                borderRadius="md"
                                borderColor="whiteAlpha.400"
                                required
                                fontSize="small"
                                color="white"
                                outline="none"
                            />
                        </FormControl>
                        <FormControl mb="4" w={['100%', 400, 500]}>
                            <FormLabel color="white" fontSize="sm">Thumbnail</FormLabel>
                            <Input
                                type="file"
                                onChange={handleChangePostImage}
                                accept="image/png, image/jpeg"
                                borderRadius="md"
                                borderColor="whiteAlpha.400"
                                fontSize="small"
                                color="white"
                                outline="none"
                            />
                        </FormControl>
                        <Box position="relative">
                            <Editor2 setDraftData={setDraftData} setPostData={setPostData} postData={postData} draftData={draftData} setHtmlBlockState={setHtmlBlockState} userId={userData?.id} />
                        </Box>
                        
                    </Container>
                </main>
            </ContributorGuard>
        </div>

    )
}

export default Create;
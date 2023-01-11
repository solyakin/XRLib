import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../../../../components/Header'
import styles from '../../../../styles/Create.module.css'
import Image from 'next/image'
import { Button, Container, HStack, Text, FormControl, FormLabel, Input, useToast, Textarea } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css';
import ContributorGuard from '../../../../components/authentication/guards/ContributorGuard'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PostsService from '../../../../services/posts/posts.service'
import useAuth from '../../../../components/authentication/hooks/useAuth'
import convertHtmlToText from '../../../../utils/html-to-text'
import { useRouter } from 'next/router'
import { ContentState, EditorState, convertFromHTML } from 'draft-js'

const Editor2 = dynamic(() => import('../../../../components/Editor2'), {
    ssr: false,
});



const EditPost = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const router = useRouter();
    const { id } = router.query;
    const { userData } = useAuth();
    const [draftData, setDraftData] = useState({ content: "", draftId: undefined, readMinutes: null, title: "", description: "" });
    const [draftLastUpdated, setDraftLastUpdated] = useState(null);
    const [htmlBlockState, setHtmlBlockState] = useState(null)
    const [initialEditorState, setInitialEditorState] = useState(EditorState.createEmpty())

    function countWords(s) {
        s = s.replace(/(^\s*)|(\s*$)/gi, "");//exclude  start and end white-space
        s = s.replace(/[ ]{2,}/gi, " ");//2 or more space to 1
        s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
        return s.split(' ').filter(function (str) { return str != ""; }).length;
        //return s.split(' ').filter(String).length; - this can also be used
    }

    const { data } = useQuery({
        queryKey: ['draft', id, userData?.id], queryFn: async () => {
            return await PostsService.getDraft(id, userData?.id);
        }, onSuccess: (data) => {
            if (data.imagePaths) setDraftData(data)
            else setDraftData({ ...data, imagePaths: [] })
        },
        onError: (err) => {
            toast({
                title: "Oops!",
                status: "error",
                description: `Could not load draft. Please refresh the page or try again later.`,
                isClosable: true,
                duration: 3000,
            });
        }

    },
    )

    useEffect(() => {
        if (data) {

            let draftFormat = convertFromHTML(data.content)
            const { contentBlocks, entityMap } = draftFormat;
            const contentState = ContentState.createFromBlockArray(
                contentBlocks,
                entityMap
            );
            setInitialEditorState(EditorState.createWithContent(contentState))
        }
    }, [draftData])


    const { error, mutate, isLoading } = useMutation(async (draftData) => {
        let authorData = {
            id: userData?.id,
            displayName: userData?.displayName,
            profileImageUrl: userData?.profileImageUrl,
        }
        /**
         * readMinutes = words/200
         * Why?
         * Generally, reading at less than 100-200 words per minute is the normal rate for learning, and 200-400 words per minute is the normal rate for comprehension. 
         * Going beyond reading 500 words per minute can compromise the quality of reading and your comprehension.
         *  There are ways to balance reading pace and comprehension.
         */
        return await PostsService.saveDraft(authorData, { ...draftData, content: htmlBlockState, contentText: convertHtmlToText(htmlBlockState), readMinutes: Math.ceil(countWords(convertHtmlToText(htmlBlockState)) / 200) }, setDraftData)
    },
        {
            onSuccess: () => {
                setDraftLastUpdated(new Date())
                queryClient.invalidateQueries(["drafts", userData?.id])

            }
        }
    )



    return (
        <div className={styles.create}>
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
                <link rel="icon" href="/xr.jpeg" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
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
                        <HStack justifyContent="flex-end">
                            <HStack>

                                <Button bg="none" borderColor="#F40580" borderRadius="full" _hover={{ background: "none" }} onClick={() => mutate(draftData)} isLoading={isLoading} className={styles.publish_btn}>

                                    <Image src="/upload.svg" width="14" height="14" alt="" />
                                    Update draft
                                </Button>



                            </HStack>
                        </HStack>
                        <FormControl mb="4" w={[300, 400, 500]}>
                            <FormLabel color="white" fontSize="sm">Title</FormLabel>
                            <Input
                                onChange={(e) => setDraftData({ ...draftData, title: e.target.value })}
                                type="text"
                                borderRadius="md"
                                value={draftData.title}
                                borderColor="whiteAlpha.400"
                                fontSize="small"
                                color="white"
                                outline="none"
                            />
                        </FormControl>
                        <FormControl mb="4" w={[300, 400, 500]}>
                            <FormLabel color="white" fontSize="sm">Description</FormLabel>
                            <Textarea
                                onChange={(e) => setDraftData({ ...draftData, description: e.target.value })}
                                type="text"
                                borderRadius="md"
                                value={draftData.description}
                                borderColor="whiteAlpha.400"
                                fontSize="small"
                                color="white"
                                outline="none"
                            />
                        </FormControl>
                        {
                            userData &&
                            <Editor2 setHtmlBlockState={setHtmlBlockState} draftData={draftData} setDraftData={setDraftData} initialEditorState={initialEditorState} userId={userData?.id} draftId={id} />
                        }
                    </Container>
                </main>
            </ContributorGuard>
        </div>

    )
}

export default EditPost;
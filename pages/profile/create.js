import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import styles from '../../styles/Create.module.css'
import Image from 'next/image'
import { Button, Container, HStack, Text, useQuery } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import ContributorGuard from '../../components/authentication/guards/ContributorGuard'
import { useMutation } from "@tanstack/react-query";
import PostsService from '../../services/posts/posts.service'
import useAuth from '../../components/authentication/hooks/useAuth'
import timeAgo from '../../utils/dateToTimeAgo'
import { collection, doc } from 'firebase/firestore'
import { db } from '../../config/firebase'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
});



const Create = () => {
    const { userData } = useAuth();
    const [draftData, setDraftData] = useState({ content: "", draftId: undefined })
    const [draftLastUpdated, setDraftLastUpdated] = useState(null);

    const { error, mutate, isLoading } = useMutation(async (draftData) => {
        let authorData = {
            id: userData?.id,
            displayName: userData?.displayName,
            profileImageUrl: userData?.profileImageUrl,
        }
        return await PostsService.saveDraft(authorData, draftData, setDraftData)
    },
        {
            onSuccess: () => {
                setDraftLastUpdated(new Date())
            }

        }
    )



    const mdParser = new MarkdownIt(/* Markdown-it options */);
    function handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
        setDraftData({ ...draftData, content: text })
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
                        <HStack justifyContent="flex-end">
                            <HStack>
                                {
                                    isLoading &&
                                    <Text>
                                        Updating...
                                    </Text>
                                }
                                {draftLastUpdated &&
                                    <Text>
                                        Last updated {draftLastUpdated.toUTCString()}
                                    </Text>
                                }
                                <Button onClick={() => mutate(draftData)} isLoading={isLoading} className={styles.publish_btn}>
                                    <Image src="/upload.svg" width="14" height="14" alt="" />
                                    Save to drafts
                                </Button>

                                <button className={styles.publish_btn}>
                                    <Image src="/upload.svg" width="14" height="14" alt="" />
                                    Publish
                                </button>

                            </HStack>
                        </HStack>
                        <Text color="whiteAlpha.500" as="h1" fontSize="2xl">Title</Text>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={handleEditorChange}
                        />
                    </Container>
                </main>
            </ContributorGuard>
        </div>

    )
}

export default Create;
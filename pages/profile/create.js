import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import styles from '../../styles/Create.module.css'
import Image from 'next/image'
import { Button, Container, HStack, Text, FormControl, FormLabel, Input } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css';
import ContributorGuard from '../../components/authentication/guards/ContributorGuard'
import { useMutation } from "@tanstack/react-query";
import PostsService from '../../services/posts/posts.service'
import useAuth from '../../components/authentication/hooks/useAuth'

const Editor2 = dynamic(() => import('../../utils/Editor2'), {
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
                                <Button bg="none" borderColor="#F40580" _hover={{background : "none"}} onClick={() => mutate(draftData)} isLoading={isLoading} className={styles.publish_btn}>
                                    <Image src="/upload.svg" width="14" height="14" alt="" />
                                    Save to drafts
                                </Button>

                                <button className={styles.publish_btn}>
                                    <Image src="/upload.svg" width="14" height="14" alt="" />
                                    Publish
                                </button>

                            </HStack>
                        </HStack>
                        {/* <Text color="whiteAlpha.500" as="h1" fontSize="2xl">Title</Text> */}
                        <FormControl mb="4" width="400px">
                            <FormLabel color="whiteAlpha.500" fontSize="sm">Title</FormLabel>
                            <Input
                                type="text"
                                borderRadius="full"
                                borderColor="whiteAlpha.400"
                                fontSize="small"
                                color="white"
                                outline="none"
                            />
                        </FormControl>
                        <FormControl mb="4" width="400px">
                            <FormLabel color="white" fontSize="sm">Thumbnail</FormLabel>
                            <Input
                                type="file"
                                accept="image/png, image/jpeg"
                                borderRadius="full"
                                borderColor="whiteAlpha.400"
                                fontSize="small"
                                color="white"
                                outline="none"
                            />
                        </FormControl>
                        <Editor2 />
                    </Container>
                </main>
            </ContributorGuard>
        </div>

    )
}

export default Create;
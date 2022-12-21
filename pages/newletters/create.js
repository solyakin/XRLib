import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../../components/Header'
import styles from '../../styles/Create.module.css'
import { 
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    FormHelperText, 
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Container,
    Textarea,
    Button
} from '@chakra-ui/react'
import axios from 'axios'

const Create = () => {

    const navigate = useRouter();
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    const [imageUrl, setImageurl] = useState("");
    const [input, setInput] = useState({
        author : "",
        title : "",
        image : "",
        content : "",
        category : "",
        postLength : ""
    })
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
    
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current =  cloudinaryRef.current.createUploadWidget({
            cloudName : "duhkz21x4",
            uploadPreset : "ytnfminr"
        }, function (error, result){
            if(result.event === "success"){
                setImageurl(result.info.url)
            }
        });
    }, [])
    
    const handleInputChange = (e) => {
        setInput({...input, [e.target.name] : e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)

        const { author, title, content, category, postLength } = input

        const jsonData = {
            "postTags": category,
            "postName": title,
            "postAuthor": author,
            "postContent": content,
            "postCategory": category,
            "postUrl": imageUrl,
            "postLength": postLength, 
        }

        try {
            const posting = await axios.post('https://xr-speeds-production.up.railway.app/insert', jsonData)
            const response = posting.data;
            console.log(response)  
            if(response){
                setAlert(true)
            } 
            setLoading(false)
        } catch (error) {
            console.log(error)
            setError(true)
            setLoading(false)
        }
    }

    console.log(input)
  return (
    <div className={styles.create}>
        <Head>
            <title>XRAtlas</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/xr.jpeg" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
            <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript" defer></script>
        </Head>
        <main className={styles.main}>
            <div className={styles.container}>
                <Header />
                <div className={styles.main_content}>
                    {
                        !alert && <Container maxW='2xl'>
                            <form onSubmit={handleSubmit}>
                                <FormControl isRequired mb={4}>
                                    <FormLabel>Author</FormLabel>
                                    <Input type='text' name="author" value={input.author} onChange={handleInputChange} color="white" size='lg' borderColor="GrayText" />
                                </FormControl>
                                <FormControl isRequired mb={4}>
                                    <FormLabel>Title</FormLabel>
                                    <Input type='text' name="title" color="white" size='lg' value={input.title} onChange={handleInputChange}  borderColor="GrayText"/>
                                </FormControl>
                                <FormControl isRequired mb={4}>
                                    <FormLabel>Category</FormLabel>
                                    <Input type='text' name="category" color="white" size='lg' value={input.category} onChange={handleInputChange}  borderColor="GrayText"/>
                                </FormControl>
                                <FormControl isRequired mb={4}>
                                    <FormLabel>Post Length</FormLabel>
                                    <Input type='number' name="postLength" color="white" size='lg' value={input.postLength} onChange={handleInputChange} placeholder="e.g 5 minutes" borderColor="GrayText"/>
                                </FormControl>
                                <FormControl isRequired mb={4}>
                                    <FormLabel>Image</FormLabel>
                                    <Button onClick={() => widgetRef.current.open()} mb={3}> Upload</Button>
                                    {
                                        imageUrl && <Input type='text' name="image" color="white" size='lg' value={imageUrl} onChange={handleInputChange} disabled  borderColor="GrayText"/>
                                    }
                                </FormControl>
                                <FormControl isRequired mb={4}>
                                    <FormLabel>Content</FormLabel>
                                    <Textarea type='text' name="content" color="white" size='lg' height="200px" placeholder='enter content here' value={input.content} onChange={handleInputChange}  borderColor="GrayText" />
                                </FormControl>
                                <Button 
                                isLoading={loading} 
                                type="submit" 
                                size='lg' 
                                mt={4} 
                                colorScheme='pink'
                                width="100%" 
                                loadingText='Submitting' 
                                variant="outline" 
                                >
                                    Submit Publication
                                </Button>
                            </form>
                        </Container>
                    }
                    {
                        alert &&  <Container>
                                    <Alert
                                        status='success'
                                        variant='subtle'
                                        flexDirection='column'
                                        alignItems='center'
                                        justifyContent='center'
                                        textAlign='center'
                                        height='200px'
                                    >
                                <AlertIcon boxSize='40px' mr={0} />
                                <AlertTitle mt={4} mb={1} fontSize='lg'>
                                Application submitted!
                                </AlertTitle>
                                <AlertDescription maxWidth='sm'>
                                Thanks for submitting your application. Our team will get back to you soon.
                                </AlertDescription>
                            </Alert>
                        </Container> 
                    }
                    {
                        error &&  <Alert status='error' position="sticky" mt={4}>
                                    <AlertIcon />
                                    There was an error processing your request
                                    <p onClick={navigate(-1)}>Return back</p>
                                </Alert>
                    }
                </div>
            </div>
        </main>
    </div>
  )
}

export default Create
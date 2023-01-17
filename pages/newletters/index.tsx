import Head from 'next/head'
import { useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import styles from '../../styles/Newsletters.module.css';
import {useQuery} from "@tanstack/react-query"
import PostsService from '../../services/posts/posts.service';
import { Pagination, PaginationContainer, PaginationNext, PaginationPrevious, usePagination } from '@ajna/pagination';
import { HStack, Spinner, Center } from '@chakra-ui/react';

const Newsletters = () => {

    const [itemsPerPage, setItemsPerPage] = useState({
        temporary: 3,
        permanent: 3,
    });
    const {
        isLoading,
        error,
        data: postCount,
        isFetching,
    } = useQuery(["post-count"], PostsService.getPublishedPostsCount, {
         onSuccess(data) {
            console.log(data)
            setTotalItems(data);
        },
    })

    const [totalItems, setTotalItems] = useState(postCount || 0);
    const [startFrom, setStartFrom] = useState(undefined);
    const numberOfPages = Math.ceil(totalItems / itemsPerPage.permanent);
    const {
        currentPage,
        setCurrentPage,
        pagesCount,
        pages
    } = usePagination({
        pagesCount: numberOfPages,
        initialState: { currentPage: 1 },
    });
    const [previousCursors, setPreviousCursors] = useState([]);

    const { isLoading: postsLoading, data, isFetching: postsFetching } = useQuery(
        ["posts", itemsPerPage.permanent, startFrom],
        () => PostsService.getPaginatedPosts(startFrom, itemsPerPage.permanent),
        {
            keepPreviousData: true,
            onSuccess: (data) => {
                 //console.log(data);
                 //console.log("startFromState", startFrom)
                 //setStartFrom(data.lastPostRef)
                
            },
            onError: (err) => {
                //console.log(err)
            }
        }
    );
    
  return (
    <div className={styles.newletters}>
        <Head>
          <title>Newsletter | XRAtlas</title>
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
        <main className={styles.main}>
            <div className={styles.star_bg}></div>
            <div className={styles.container}>
                <Header />
                <div className={styles.main_content}>
                    <div className={styles.heading}>
                        <h2>Newsletters</h2>
                        <p>Welcome to the XRAtlas Newsletter, where we keep you up to date on the latest news, insights, and events in the world of virtual and augmented reality, and other emerging technologies that are shaping the future of the metaverse. From industry updates and cutting-edge innovations to fascinating applications and inspiring stories, we bring you a curated selection of the most relevant and interesting developments in the metaverse. Subscribe now and stay ahead of the curve in the exciting realm of the metaverse.</p>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.list}>
                            {
                                postsLoading && <Center>
                                <Spinner />
                            </Center>
                            }
                            {
                                data && data.posts.map(({id, content, description, readMinutes, thumbnailUrl, title, author}) => {
                                    return(
                                        <Link href={`/newletters/${id}`} key={id}>
                                            <div className={styles.newsletter}>
                                                <div className={styles.content}>
                                                    <div className={styles.text}>
                                                        <h3>{title}</h3>
                                                        <p>{`${description.substr(0, 280)||content.substr(0, 280)}...`}</p>
                                                    </div>
                                                    <div className={styles.author}>
                                                        <img src="/AVATAR.svg" alt="" />
                                                        <p>{author.displayName}<span> · {`${readMinutes} min read`}</span></p>
                                                    </div>
                                                </div>
                                                <div className={styles.photo}>
                                                    {
                                                        thumbnailUrl && <img src={thumbnailUrl} width={140} height={140} alt=""/>
                                                    }
                                                    {
                                                        !thumbnailUrl && <img src='/femalegoogle.png' width={140} height={140} alt=""/>
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                            <Pagination
                            pagesCount={pagesCount}
                            currentPage={currentPage}
                            onPageChange={(page) => {
                            let delta = page - currentPage;
                            //console.log(delta)
                            let isNext = delta > 0
                            setCurrentPage(page)
                            // If the user is going to the next page, we need to get the last item of the current page
                            if (isNext) {
                                setPreviousCursors([...previousCursors, startFrom])
                                setStartFrom(data?.lastPostRef)
                            }
                            else {
                                // The user is going to the previous page so set the startAfter to the cursor of the previous page
                                setStartFrom(previousCursors[previousCursors.length - 1])
                                // Remove the last cursor from the array since it's now current page
                                setPreviousCursors(previousCursors.slice(0, previousCursors.length - 1))
                            }
                            }}
                             >
                                <PaginationContainer maxW={"1200px"} w={"100%"}>
                                <HStack spacing={2}>
                                    <PaginationPrevious color="blackAlpha.600" width="120px" _hover={{background : "#F40580", color : 'white'}}>Previous</PaginationPrevious>
                                    <PaginationNext color="blackAlpha.600" width="120px" _hover={{background : "#F40580", color : 'white'}}>Next</PaginationNext>
                                </HStack>
                                </PaginationContainer>
                            </Pagination>
                            
                        </div>
                    </div>  
                </div>
                <Footer />
                
            </div>
        </main>
    </div>
  )
}

export default Newsletters;

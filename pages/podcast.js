import Head from "next/head"
import { useEffect, useState } from 'react';
import Image from "next/image"
import Header from "../components/Header"
import styles from '../styles/Podcast.module.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Footer from "../components/Footer";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { Spinner, Center } from "@chakra-ui/react";

const Podcast = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetching = async () => {
            if (window !== undefined) {
                const res = await axios(`${baseUrl}/rss-feed`)
                const data = res.data
                setItems(data.items)
            }
        }
        fetching()
        return () => {
            setItems([])
        }
    }, [])

    return (
        <div className={styles.Podcast}>
            <Head>
                <title>Podcast | XRAtlas </title>
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
                <Header />
                <div className={styles.wrapper}>
                    <h1>Podcast</h1>
                    <div className={styles.tumbutron}>
                        <Image src='/Group 73.svg' width={350} height={350} alt="flyer" />
                        <div className={styles.about}>
                            <h2>XrAtlas</h2>
                            <p>Join us on the XRAtlas Podcast, where we explore the latest developments and trends in the world of Virtual reality, Augmented reality, Artificial Intelligence, and other emerging technologies that are shaping the future of humanity. From gaming and entertainment to education and commerce, we delve into the creative, social, and philosophical implications of the metaverse and its growing impact on our lives and society. Tune in to hear interviews with leading experts, creators, and visionaries, and get a glimpse into the exciting possibilities of the metaverse & other emerging technologies.</p>
                        </div>
                    </div>
                    <div className={styles.podcastList}>
                        <div className={styles.d_grid}>
                            {
                                !items && <Center>
                                <Spinner />
                            </Center>
                            }
                            {
                                items && items.map(({ title, content, contentSnippet, enclosure, pubDate }, id) => {
                                    return (
                                        <div className={styles.item} key={id}>
                                            <img src="/Aran Jamison.png" alt="" className={styles.post_image} />
                                            <div className="content">
                                                <h5>{title}</h5>
                                                <p>{`${contentSnippet.substr(0, 200)}..`}</p>
                                                <div className={styles.audio}>
                                                    <AudioPlayer
                                                        src={enclosure.url}
                                                        onPlay={e => console.log(e)}
                                                        style={{ borderRadius: "45px", background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.1)" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    )
}

export default Podcast


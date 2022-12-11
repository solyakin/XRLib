import Head from "next/head"
import Image from "next/image"
import Header from "../components/Header"
import styles from '../styles/Podcast.module.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Footer from "../components/Footer";
import axios from "axios";

const Podcast = ({podcast}) => {
    const { items } = podcast
  return (
    <div className={styles.Podcast}>
        <Head>
            <title>XRAtlas</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/xr.jpeg" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        </Head>
        <main className={styles.main}>
            <Header />
            <div className={styles.wrapper}>
                <h1>Podcast</h1>
                <div className={styles.tumbutron}>
                    <Image src='/Group 73.svg' width={350} height={350} alt="flyer"/>
                    <div className={styles.about}>
                        <h2>XrAtlas</h2>
                        <p>Join us on the XRAtlas Podcast, where we explore the latest developments and trends in the world of Virtual reality, Augmented reality, Artificial Intelligence, and other emerging technologies that are shaping the future of humanity. From gaming and entertainment to education and commerce, we delve into the creative, social, and philosophical implications of the metaverse and its growing impact on our lives and society. Tune in to hear interviews with leading experts, creators, and visionaries, and get a glimpse into the exciting possibilities of the metaverse & other emerging technologies.</p>
                    </div>
                </div>
                <div className={styles.podcastList}>
                    <div className={styles.d_grid}>
                        {
                            items && items.map(({title, content, contentSnippet, enclosure, pubDate}, id) => {
                                return(
                                    <div className={styles.item} key={id}>
                                        <img src="/profile_3.svg" alt="" className={styles.post_image} />
                                        <div className="content">
                                            <h5>{title}</h5>
                                            <p>{`${contentSnippet.substr(0, 200)}..`}</p>
                                            <div className={styles.audio}>
                                                <AudioPlayer
                                                    src={enclosure.url}
                                                    onPlay={e => console.log("onPlay")}
                                                    // other props here
                                                    style={{borderRadius : "45px", background : "rgba(255, 255, 255, 0.1)", border : "1px solid rgba(255, 255, 255, 0.1)"}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* <div className={styles.pagination}>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div> */}
                </div>
            </div>
            <Footer />
        </main>
    </div>
  )
}

export default Podcast

export async function getStaticProps(){
    try {
    const data = await axios.get('https://xr-speeds-production.up.railway.app/rss-feed')
    const result = data.data; 
    return { 
        props : { podcast : result }
        }
        
    } catch (error) {
        console.log(error)
    }
}
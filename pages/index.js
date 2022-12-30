import { useState } from 'react'; 
import axios from 'axios'
import Head from 'next/head'
import { useEffect } from 'react'
import Community from '../components/Community'
import Footer from '../components/Footer'
import Glimpse from '../components/Glimpse'
import Hero from '../components/Hero'
import Information from '../components/Information'
import RecentNewsletter from '../components/RecentNewsletter'
import RecentPodcast from '../components/RecentPodcast'
import styles from '../styles/Home.module.css'
import SubscribeForm from '../components/SubscribeForm';
import { baseUrl } from '../utils/baseUrl';

const data = {
  title : "Recent Newsletters",
}

export default function Home() {

  const [podcasts, setpodcast] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      const data = await axios.get(`${baseUrl}/rss-feed`)
      const response = data.data;
      setpodcast(response.items)
    }
    fetching()
  },[])

  return (
      <div className={styles.container}>
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

        <main className={styles.main} id="top">
          <Hero />
          <Information />
          <RecentPodcast podcasts={podcasts}/>
          <Glimpse />
          <RecentNewsletter data={data}/>
          <Community />
          <Footer />
          {/* <SubscribeForm /> */}
        </main>
      </div>
  )
}

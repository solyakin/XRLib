import Head from 'next/head'
import Community from '../components/Community'
import Footer from '../components/Footer'
import Glimpse from '../components/Glimpse'
import Hero from '../components/Hero'
import Information from '../components/Information'
// import Mission from '../components/Mission'
import RecentNewsletter from '../components/RecentNewsletter'
import RecentPodcast from '../components/RecentPodcast'
// import Subscribe from '../components/Subscribe'
import styles from '../styles/Home.module.css'

const data = {
  title : "Read Newsletters",
}

export default function Home() {
  return (
      <div className={styles.container}>
        <Head>
          <title>XRAtlas</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/xr.jpeg" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        </Head>

        <main className={styles.main}>
          <Hero />
          <Information />
          <RecentPodcast />
          <Glimpse />
          <RecentNewsletter data={data}/>
          <Community />
          <Footer />
        </main>
      </div>
  )
}

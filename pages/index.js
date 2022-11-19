import Head from 'next/head'
import Image from 'next/image'
import Community from '../components/Community'
import Hero from '../components/Hero'
import Information from '../components/Information'
import Mission from '../components/Mission'
import Subscribe from '../components/Subscribe'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>XRAtlas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/xr.jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet"/>
      </Head>

      <main className={styles.main}>
        <Hero />
        <Mission/>
        <Information />
        <Community />
        <Subscribe />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

import { Button } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Header from '../components/Header'
import styles from '../styles/Custom404.module.css'
import Link from 'next/link'

const Custom404 = () => {
  return (
    <div className={styles.custom}>
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
          <link rel="icon" href="/icon-xra.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        </Head> 
        <main>
            <Header />
            <div className={styles.wrapper}>
                <Image src="/Frame 3400.svg" height="100" width="100" alt=""/>
                <h3>OOPS!</h3>
                <p>Page not found</p>
                <Button
                    bg={"transparent"}
                    bgGradient="linear(89.76deg, #FB047B 3.64%, #130EFF 99.88%)"
                    borderRadius="full"
                    color={"white"}
                    _hover={{
                        border : "1px",
                        borderColor : "white"
                    }}
                >
                    <Link href="/">Go home</Link>
                </Button>
            </div>
        </main>
    </div>
  )
}

export default Custom404;
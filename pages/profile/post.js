import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import styles from '../../styles/profile.module.css'
import Image from 'next/image'
import { Container } from '@chakra-ui/react'
import Link from 'next/link'

const Posts = () => {
  return (
    <div className={styles.profile}>
        <Head>
            <title>XRAtlas</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/xr.jpeg" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        </Head> 
        <main className={styles.main}>
            <Header />
            <Container maxW="950px" mt="6">
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        <h2>Your Posts</h2>
                        <Link href="/profile/create">
                        <button>
                            <Image src="/sign.svg" width="14" height="14" alt=""/>
                            New post
                        </button>
                        </Link>
                    </div>
                    <div className={styles.list}>
                        <Link href={"#"}>
                            <div className={styles.newsletter}>
                                <div className={styles.content}>
                                    <div className={styles.text}>
                                        <h3>Lorem Ipsum</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur. Ullamcorper turpis sit commodo ultrices eget purus. Amet nunc id laoreet lacus nunc cursus consectetur habitant. Ultrices tristique lobortis vitae sagittis et...</p>
                                    </div>
                                    <div className={styles.author}>
                                        <img src="/AVATAR.svg" alt="" />
                                        <p>Solomon Akinlade<span> · 3 mins read</span></p>
                                    </div>
                                </div>
                                <div className={styles.photo}>
                                    <img src="/xr.jpeg" width={"140px"} height={"140px"} alt=""/>
                                </div>
                            </div>
                        </Link>
                        <Link href={"#"}>
                            <div className={styles.newsletter}>
                                <div className={styles.content}>
                                    <div className={styles.text}>
                                        <h3>Lorem Ipsum</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur. Ullamcorper turpis sit commodo ultrices eget purus. Amet nunc id laoreet lacus nunc cursus consectetur habitant. Ultrices tristique lobortis vitae sagittis et...</p>
                                    </div>
                                    <div className={styles.author}>
                                        <img src="/AVATAR.svg" alt="" />
                                        <p>Solomon Akinlade<span> · 3 mins read</span></p>
                                    </div>
                                </div>
                                <div className={styles.photo}>
                                    <img src="/xr.jpeg" width={"140px"} height={"140px"} alt=""/>
                                </div>
                            </div>
                        </Link>
                        {/* <div className={styles.pagination}>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                        </div>
                         */}
                    </div>
                </div>
            </Container>
        </main>
    </div>
  )
}

export default Posts
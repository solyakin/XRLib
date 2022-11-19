import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import styles from '../../styles/Newsletters.module.css';

const Newsletters = () => {
  return (
    <div className={styles.newletters}>
        <Head>
            <title>XRAtlas</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/xr.jpeg" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
            <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet"/>
        </Head>
        <main>
            <Header />
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h2>Newsletters</h2>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.list}>
                        <Link href='/newletters/preview'>
                            <div className={styles.newsletter}>
                                <div className={styles.content}>
                                    <div className={styles.author}>
                                        <Image src='/wepik2.png' width={30} height={30}/>
                                        <p>Samuel Johnson <br></br> <span>12 Jan 2022</span></p>
                                    </div>
                                    <div className={styles.text}>
                                        <h3>🔥 5 Reasons Why Web 3.0 will Fail?</h3>
                                        <p>Do you really need to waste your time learning Web 3 if it is just a failed idea? Intro For the majority of people, Web 3.0 sounds like one more buzzword used to promote crypto scams or get a piece of hype. For others — it is decentralized web applications where…</p>
                                    </div>
                                </div>
                                <div className={styles.photo}>
                                    <Image src='/bonelab.jpeg' width={120} height={120}/>
                                </div>
                            </div>
                        </Link>
                        <div className={styles.newsletter}>
                            <div className={styles.content}>
                                <div className={styles.author}>
                                    <Image src='/wepik2.png' width={30} height={30}/>
                                    <p>Samuel Johnson <br></br> <span>12 Jan 2022</span></p>
                                </div>
                                <div className={styles.text}>
                                    <h3>🔥 5 Reasons Why Web 3.0 will Fail?</h3>
                                    <p>Do you really need to waste your time learning Web 3 if it is just a failed idea? Intro For the majority of people, Web 3.0 sounds like one more buzzword used to promote crypto scams or get a piece of hype. For others — it is decentralized web applications where…</p>
                                </div>
                            </div>
                            <div className={styles.photo}>
                                <Image src='/bonelab.jpeg' width={120} height={120}/>
                            </div>
                        </div>
                        <div className={styles.newsletter}>
                            <div className={styles.content}>
                                <div className={styles.author}>
                                    <Image src='/wepik2.png' width={30} height={30}/>
                                    <p>Samuel Johnson <br></br> <span>12 Jan 2022</span></p>
                                </div>
                                <div className={styles.text}>
                                    <h3>🔥 5 Reasons Why Web 3.0 will Fail?</h3>
                                    <p>Do you really need to waste your time learning Web 3 if it is just a failed idea? Intro For the majority of people, Web 3.0 sounds like one more buzzword used to promote crypto scams or get a piece of hype. For others — it is decentralized web applications where…</p>
                                </div>
                            </div>
                            <div className={styles.photo}>
                                <Image src='/bonelab.jpeg' width={120} height={120}/>
                            </div>
                        </div>
                        <div className={styles.newsletter}>
                            <div className={styles.content}>
                                <div className={styles.author}>
                                    <Image src='/wepik2.png' width={30} height={30}/>
                                    <p>Samuel Johnson <br></br> <span>12 Jan 2022</span></p>
                                </div>
                                <div className={styles.text}>
                                    <h3>🔥 5 Reasons Why Web 3.0 will Fail?</h3>
                                    <p>Do you really need to waste your time learning Web 3 if it is just a failed idea? Intro For the majority of people, Web 3.0 sounds like one more buzzword used to promote crypto scams or get a piece of hype. For others — it is decentralized web applications where…</p>
                                </div>
                            </div>
                            <div className={styles.photo}>
                                <Image src='/bonelab.jpeg' width={120} height={120}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightwrapper}>
                        <input placeholder='search'/>
                        <div className={styles.recent}>
                            <h4>Recent Posts</h4>
                            <div className={styles.recentlist}>
                                <div className={styles.recentitem}>
                                    <div className={styles.recentTitle}>
                                        <Image src='/wepik3.png' width={30} height={30} alt="title" className={styles.recentImage}/>
                                        <p>Allison Maryclaire</p>
                                    </div>
                                    <h4>What We’re Reading: The psychology of self-esteem, game design for beginners, and the art of…</h4>
                                </div>
                                <div className={styles.recentitem}>
                                    <div className={styles.recentTitle}>
                                        <Image src='/wepik3.png' width={30} height={30} alt="title" className={styles.recentImage}/>
                                        <p>Allison Maryclaire</p>
                                    </div>
                                    <h4>What We’re Reading: The psychology of self-esteem, game design for beginners, and the art of…</h4>
                                </div>
                                <div className={styles.recentitem}>
                                    <div className={styles.recentTitle}>
                                        <Image src='/wepik3.png' width={30} height={30} alt="title" className={styles.recentImage}/>
                                        <p>Allison Maryclaire</p>
                                    </div>
                                    <h4>What We’re Reading: The psychology of self-esteem, game design for beginners, and the art of…</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Newsletters;
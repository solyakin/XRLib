import React from 'react'
import Image from 'next/image';
import styles from '../styles/Info.module.css';

const Information = () => {
  return (
    <div className={styles.info}>
        <div className={styles.noise}></div>
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h2>A GLIMPSE INTO THE FUTURE OF THE METAVERSE</h2>
                <p>XR Atlas Podcast explores immersive technologies and Artificial intelligence. Episodes from podcasts include conversations with enthusiasts, developers, designers, and leaders in the XR & AI industry, to address key issues & innovations and better understand their unique and diverse points of view.</p>

                <p>The story is full of action, adventure, and suspense and is sure to keep you entertained from beginning to end. If you're looking for a great new comic book to read, then be sure to check out Daedalus!</p>

                <button>Listen to podcast</button>
            </div>
            <div className={styles.image}>
                <Image src='/wepik3.png' width={500} height={500} alt="mars"/>
            </div>
        </div>
        <div className={styles.wrapper}>
            <div className={styles.image}>
                <Image src='/optical.jpg' width={500} height={500} alt="mars"/>
            </div>
            <div className={styles.content}>
                <h2>A GLIMPSE INTO THE FUTURE OF THE METAVERSE</h2>
                <p>Connecting the dots between the evolution of the Metaverse and  it’s a direct impact on human development. The XR Atlas Newsletter comes from creatives, technologists, designers and professionals from the Metaverse & AI spaces. Enjoy and stay on top of the latest interesting and insightful updates from the world of  XR and the Metaverse.</p>

                <p>The story is full of action, adventure, and suspense and is sure to keep you entertained from beginning to end. If you're looking for a great new comic book to read, then be sure to check out Daedalus!</p>

                <button>Read Newsletters</button>
            </div>
        </div>
    </div>
  )
}

export default Information
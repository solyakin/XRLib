import React from 'react'
import styles from '../styles/Glimpse.module.css';

const Glimpse = () => {
  return (
    <div className={styles.glimpse}>
        <div className={styles.headset}>
            <img src='/Group 17.svg' width={700} height={700} alt="mars"/>
        </div>
        <div className={styles.secondcontent}>
            <h2>A GLIMPSE INTO THE FUTURE OF THE METAVERSE</h2>
            <p>Welcome to the XRAtlas Newsletter, where we keep you up to date on the latest news, insights, and events in the world of virtual and augmented reality, and other emerging technologies that are shaping the future of the metaverse. From industry updates and cutting-edge innovations to fascinating applications and inspiring stories, we bring you a curated selection of the most relevant and interesting developments in the metaverse. Subscribe now and stay ahead of the curve in the exciting realm of the metaverse.</p>
        </div>
    </div>
  )
}

export default Glimpse
import React from 'react'
import styles from '../styles/Glimpse.module.css';

const Glimpse = () => {
  return (
    <div className={styles.glimpse}>
        <div className={styles.headset}>
            <img src='/Group 17.svg' width={700} height={500} alt="mars"/>
        </div>
        <div className={styles.secondcontent}>
            <h2>A GLIMPSE INTO THE FUTURE OF THE METAVERSE</h2>
            <p>Connecting the dots between the evolution of the Metaverse and  it’s a direct impact on human development.<br></br> The XR Atlas Newsletter comes from creatives, technologists, designers and professionals from the Metaverse & AI spaces.<br></br> Enjoy and stay on top of the latest interesting and insightful updates from the world of  XR and the Metaverse.</p>
        </div>
    </div>
  )
}

export default Glimpse
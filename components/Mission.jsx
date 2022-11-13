import React from 'react'
import styles from '../styles/Mission.module.css'

const Mission = () => {
  return (
    <div className={styles.mission}>
        <div className={styles.noise}></div>
        <p>Our Mission</p>
        <h3>A MORE UNITED AND USER-FRIENDLY XR ENGINEERING IS INEVITABLE.</h3>
        <div className={styles.textwrapper}>
            <p className={styles.text}>Metahub is an ecosystem that brings XR communities together, providing them with simple yet powerful tools and incentives to grow faster and stronger, and to unlock unique experiences. </p>
        </div>
    </div>
  )
}

export default Mission
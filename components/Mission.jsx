import React, { useRef } from 'react'
import styles from '../styles/Mission.module.css'

const Mission = () => {
  return (
    <div className={styles.mission}>
        <div className={styles.mission_wrapper}>
          <h3>Exploring Extended Reality (XR), AI & Metaverse Technologies.</h3>
          <div className={styles.textwrapper}>
              <p className={styles.text}>XRAtlas explores Extended Reality(XR), Artificial intelligence (AI), and Metaverse technologies, to better understand how these technologies are shaping the collective future of the human race.</p>
          </div>
        </div>
    </div>
  )
}

export default Mission
import React, { useRef } from 'react'
import styles from '../styles/Mission.module.css'

const Mission = () => {
  return (
    <div className={styles.mission}>
        <div className={styles.mission_wrapper}>
          <h3>A MORE UNITED AND <span>USER-FRIENDLY</span> XR ENGINEERING IS INEVITABLE.</h3>
          <div className={styles.textwrapper}>
              <p className={styles.text}>XR Atlas focuses on exploring Extended Reality(XR), Artificial intelligence (AI), and Metaverse technologies, on better understand how these technologies are shaping the collective future of the human race. Episodes from podcasts include conversations with enthusiasts, developers, designers, and leaders in the XR & AI industry, to address key issues & innovations and better understand their unique and diverse points of view. </p>
          </div>
        </div>
    </div>
  )
}

export default Mission
import React from 'react'
import styles from '../styles/Hero.module.css'
import Header from './Header'

const Hero = () => {
  return (
    <div className={styles.hero}>
        <Header />
        <div className={styles.herosection}>
          <h1>VIRTUAL REALITY</h1>
          <div className={styles.btns}>
                <button>Subscribe to our newsletter</button>
                <button>Listen to your podcast</button>
          </div>
        </div>
    </div>
  )
}

export default Hero
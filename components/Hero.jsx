import React from 'react'
import Image from 'next/image'
import styles from '../styles/Hero.module.css'

const Hero = () => {
  return (
    <div className={styles.hero}>
    <header className={styles.header}>
          <div className={styles.logo}>
            <Image src='/logos.svg' width={30} height={30} alt="logo"/>
            <p>MetaHub</p>
          </div>
          <nav className={styles.nav}>
            <ul>
              <li>Home</li>
              <li>Newsletter</li>
              <li>Podcast</li>
            </ul>
          </nav>
        </header>
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
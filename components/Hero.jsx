import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from "framer-motion";
import React from 'react'
import styles from '../styles/Hero.module.css'
import style from '../styles/Mission.module.css'
import Header from './Header'
import ParallaxText from './ScrollText';

const Hero = () => {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // console.log(ref)
  return (
    <div className={styles.hero}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.herosection}>
          <img src='/Map hero.svg' width={1300} height={900} alt="" className={styles.map}/>
          <div className={styles.herotext}>
            <motion.div initial="hidden" animate="visible" variants={{
              hidden : {
                scale : .8,
                opacity : 0
              },
              visible : {
                scale : 1,
                opacity : 1,
                transition : {
                  delay : .4
                }
              },
            }}>
              <h1> XR-ATLAS</h1>
            </motion.div>
            <p className={styles.by}>By Babatunde</p>
          </div>
        </div>
        {/* <div className={styles.scroll_text}>
          <ParallaxText baseVelocity={-1}>Extended Reality - Virtual Reality - Argumented Reality - Mixed Reality</ParallaxText>
          <ParallaxText baseVelocity={1}>Extended Reality - Virtual Reality - Argumented Reality - Mixed Reality</ParallaxText>
        </div> */}
        <div className={style.mission} ref={ref}>
          <div className={style.mission_wrapper}>
            <div style={{
                transform: isInView ? "none" : "translateY(100px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s"
              }}>
              <h3>A MORE UNITED AND <span>USER-FRIENDLY</span> XR ENGINEERING IS INEVITABLE.</h3>
              <div className={style.textwrapper}>
                  <p className={style.text}>XR Atlas focuses on exploring Extended Reality(XR), Artificial intelligence (AI), and Metaverse technologies, on better understand how these technologies are shaping the collective future of the human race. Episodes from podcasts include conversations with enthusiasts, developers, designers, and leaders in the XR & AI industry, to address key issues & innovations and better understand their unique and diverse points of view.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero
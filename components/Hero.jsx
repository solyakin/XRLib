import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from "framer-motion";
import React from 'react'
import { useDisclosure } from '@chakra-ui/react';
import styles from '../styles/Hero.module.css'
import style from '../styles/Mission.module.css'
import Header from './Header'
import CompleteProfile from './CompleteProfile';


const Hero = () => {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { isOpen: profileIsOpen, onClose: profileClose, onOpen: profileOpen } = useDisclosure()
  
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
            <p className={styles.by} onClick={profileOpen}>By Babatunde</p>
          </div>
        </div>
        <div className={style.mission} ref={ref}>
          <div className={style.mission_wrapper}>
            <div style={{
                transform: isInView ? "none" : "translateY(100px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s"
              }}>
              <h3>Exploring Extended Reality (XR), AI & Metaverse Technologies.</h3>
              <div className={style.textwrapper}>
                  <p className={style.text}>XRAtlas explores Extended Reality(XR), Artificial intelligence (AI), and Metaverse technologies, to better understand how these technologies are shaping the collective future of the human race.</p>
              </div>
            </div>
          </div>
        </div>
        <CompleteProfile profileClose={profileClose} profileIsOpen={profileIsOpen}/>
    </div>
  )
}

export default Hero
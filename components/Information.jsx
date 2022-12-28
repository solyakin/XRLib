import React, { useRef } from 'react'
import { useInView } from "framer-motion";
import { motion } from 'framer-motion'
import Image from 'next/image';
import styles from '../styles/Info.module.css';

const Information = () => {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });


  return (
    <div className={styles.info} ref={ref}>
        <div className={styles.wrapper} style={{
              transform: isInView ? "none" : "translateY(100px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s"
            }}>
            <div className={styles.content}>
                <h2>A GLIMPSE INTO THE FUTURE OF THE METAVERSE</h2>
                <p>Join us on the XRAtlas Podcast, where we explore the latest developments and trends in the world of Virtual reality, Augmented reality, Artificial Intelligence, and other emerging technologies that are shaping the future of humanity. From gaming and entertainment to education and commerce, we delve into the creative, social, and philosophical implications of the metaverse and its growing impact on our lives and society. Tune in to hear interviews with leading experts, creators, and visionaries, and get a glimpse into the exciting possibilities of the metaverse & other emerging technologies.</p>
            </div>
            <div className={styles.image}>
                <Image src='/Group 8.svg' width={500} height={500} alt="mars"/>
            </div>
        </div>
    </div>
  )
}

export default Information
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
                <p>XR Atlas Podcast explores immersive technologies and Artificial intelligence. Episodes from podcasts include conversations with enthusiasts, developers, designers, and leaders in the XR & AI industry, to address key issues & innovations and better understand their unique and diverse points of view.</p>

                <p>The story is full of action, adventure, and suspense and is sure to keep you entertained from beginning to end. If you're looking for a great new comic book to read, then be sure to check out Daedalus!</p>
            </div>
            <div className={styles.image}>
                <Image src='/Group 8.svg' width={500} height={500} alt="mars"/>
            </div>
        </div>
    </div>
  )
}

export default Information
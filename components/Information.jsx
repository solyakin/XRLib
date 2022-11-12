import React from 'react'
import Image from 'next/image';
import styles from '../styles/Info.module.css';

const Information = () => {
  return (
    <div className={styles.info}>
        <div className={styles.noise}></div>
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h2>A GLIMPLSE INTO THE FUTURE OF HUMANITY</h2>
                <p>Daedalus is a comic book that follows the story of two people, Estafos and Suraya, who meet each other by accident and are both trying to find the mystery behind a planet that has trapped them.</p>

                <p>They soon discover that they have more in common than they thought and decide to work together to find a way off the planet.</p>

                <p>The story is full of action, adventure, and suspense and is sure to keep you entertained from beginning to end. If you're looking for a great new comic book to read, then be sure to check out Daedalus!</p>

                <button>Listen to podcast</button>
            </div>
            <div className={styles.image}>
                <Image src='/wepik3.png' width={500} height={500} alt="mars"/>
            </div>
        </div>
        <div className={styles.wrapper}>
            <div className={styles.image}>
                <Image src='/optical.jpg' width={500} height={500} alt="mars"/>
            </div>
            <div className={styles.content}>
                <h2>A GLIMPLSE INTO THE FUTURE OF HUMANITY</h2>
                <p>Daedalus is a comic book that follows the story of two people, Estafos and Suraya, who meet each other by accident and are both trying to find the mystery behind a planet that has trapped them.</p>

                <p>They soon discover that they have more in common than they thought and decide to work together to find a way off the planet.</p>

                <p>The story is full of action, adventure, and suspense and is sure to keep you entertained from beginning to end. If you're looking for a great new comic book to read, then be sure to check out Daedalus!</p>

                <button>Read Newsletters</button>
            </div>
        </div>
    </div>
  )
}

export default Information
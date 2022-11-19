import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
        <Link href='/'>
            <div className={styles.logo}>
                <Image src='/xr.jpeg' width={30} height={30} alt="logo"/>
                <p>XRAtlas</p>
            </div>
        </Link>
        <nav className={styles.nav}>
        <ul>
            <li>
                <Link href='/'>Home</Link>
            </li>
            <li>
                <Link href='/newletters'>Newsletter</Link>
            </li>
            <li>
                <Link href='/podcast'>Podcast</Link>
            </li>
        </ul>
        </nav>
    </header>
  )
}

export default Header
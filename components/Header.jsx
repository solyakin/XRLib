import React from 'react'
import Image from 'next/image'
import { useRouter } from "next/router";
import Link from 'next/link';
import styles from '../styles/Header.module.css'

const Header = () => {

    const router = useRouter();

  return (
    <header className={styles.header}>
        <Link href='/'>
            <div className={styles.logo}>
                {/* <Image src='/xr.jpeg' width={30} height={30} alt="logo"/> */}
                <p>xrAtlas</p>
            </div>
        </Link>
        <nav className={styles.nav}>
        <ul>
            <li className={router.pathname == "/" ? `${styles.active}` : ""}>
                <Link href='/'>Home</Link>
            </li>
            <li className={router.pathname == "/newletters" ? `${styles.active}` : ""}>
                <Link href='/newletters'>Newsletter</Link>
            </li>
            <li className={router.pathname == "/podcast" ? `${styles.active}` : ""}>
                <Link href='/podcast'>Podcast</Link>
            </li>
        </ul>
        </nav>
    </header>
  )
}

export default Header
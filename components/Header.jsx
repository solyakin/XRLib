import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useRouter } from "next/router";
import Link from 'next/link';
import styles from '../styles/Header.module.css'

const Header = () => {

    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

  return (
    <header className={styles.header}>
        <Link href='/'>
            <div className={styles.logo}>
                <img src="/Product Description.svg" width="140px" height="auto" alt="" />
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
        <div className={styles.hamburger}>
            <HamburgerIcon boxSize={6} ref={btnRef} onClick={onOpen}/>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
                // styleConfig={{background : "black"}}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <img src="/Product Description.svg" width="120px" height="auto" alt="" />
                    </DrawerHeader>
                    <DrawerBody>
                        <ul className={styles.menu_list}>
                            <li className={styles.menu}>
                                <a href="/">Home</a>
                            </li>
                            <li className={styles.menu}>
                                <a href="/newletters">Newletter</a>
                            </li>
                            <li className={styles.menu}>
                                <a href="/podcast">Podcast</a>
                            </li>
                        </ul>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    </header>
  )
}

export default Header
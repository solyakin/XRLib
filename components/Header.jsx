import React from 'react'
import {
    Drawer,
    DrawerBody,
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
import Image from 'next/image';
import styles from '../styles/Header.module.css'
import Login from './Login';
import SignupWithEmail from './SignupWithEmail';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

const Header = () => {

    const router = useRouter();
    const { isOpen:hamISopen, onOpen: hamOpen, onClose: hamClose } = useDisclosure()
    const { isOpen: loginIsOpen, onOpen: loginOpen, onClose : loginClose } = useDisclosure()
    const { isOpen: emailIsOpen, onOpen: emailOpen, onClose : emailClose } = useDisclosure()
    const { isOpen: signupIsOpen, onOpen: signupOpen, onClose : signupClose } = useDisclosure()
    const { isOpen: forgetIsOpen, onOpen: forgetOpen, onClose : forgetClose } = useDisclosure()
    const btnRef = React.useRef()

  return (
    <header className={styles.header}>
        <Link href='/'>
            <div className={styles.logo}>
                <Image src="/Product Description.svg" width={140} height={100} alt="" />
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
            <li>
                <Button 
                border="1px" 
                borderColor="white" 
                bg={"transparent"} 
                bgGradient="linear(89.76deg, #FB047B 3.64%, #130EFF 99.88%)"
                borderRadius="full"
                _hover={{
                    color: "black",
                }}
                onClick={loginOpen}
                >
                    Login
                </Button>
                <Login loginClose={loginClose} loginIsOpen={loginIsOpen} signupOpen={signupOpen} forgetOpen={forgetOpen}/>
                <ForgotPassword forgetClose={forgetClose} forgetIsOpen={forgetIsOpen} forgetOpen={forgetOpen}/>
                <SignUp signupClose={signupClose} signupIsOpen={signupIsOpen} emailOpen={emailOpen} loginOpen={loginOpen}/>
                <SignupWithEmail emailClose={emailClose} emailIsOpen={emailIsOpen}/>
            </li>
        </ul>
        </nav>
        <div className={styles.hamburger}>
            <HamburgerIcon boxSize={6} ref={btnRef} onClick={hamOpen}/>
            <Drawer
                isOpen={hamISopen}
                placement='left'
                onClose={hamClose}
                finalFocusRef={btnRef}
                // styleConfig={{background : "rgba(255, 255, 255, 0.1)"}}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Image src="/Product Description.svg"  width={140} height={100} alt="" />
                    </DrawerHeader>
                    <DrawerBody>
                        <ul className={styles.menu_list}>
                            <li className={styles.menu}>
                                <Link href="/">Home</Link>
                            </li>
                            <li className={styles.menu}>
                                <Link href="/newletters">Newletter</Link>
                            </li>
                            <li className={styles.menu}>
                                <Link href="/podcast">Podcast</Link>
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
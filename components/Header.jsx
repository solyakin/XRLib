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
    HStack,
    Avatar,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Menu,
} from '@chakra-ui/react'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useRouter } from "next/router";
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Header.module.css'
import Login from './Login';
import SignupWithEmail from './SignupWithEmail';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import useAuth from './authentication/hooks/use-auth';

const Header = () => {

    const router = useRouter();
    const { currentUser, signOut } = useAuth();
    const { isOpen: hamISopen, onOpen: hamOpen, onClose: hamClose } = useDisclosure()
    const { isOpen: loginIsOpen, onOpen: loginOpen, onClose: loginClose } = useDisclosure()
    const { isOpen: emailIsOpen, onOpen: emailOpen, onClose: emailClose } = useDisclosure()
    const { isOpen: signupIsOpen, onOpen: signupOpen, onClose: signupClose } = useDisclosure()
    const { isOpen: forgetIsOpen, onOpen: forgetOpen, onClose: forgetClose } = useDisclosure()
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
                    {!currentUser ? <li>
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
                        <Login loginClose={loginClose} loginIsOpen={loginIsOpen} signupOpen={signupOpen} forgetOpen={forgetOpen} />
                        <ForgotPassword forgetClose={forgetClose} forgetIsOpen={forgetIsOpen} forgetOpen={forgetOpen} />
                        <SignUp signupClose={signupClose} signupIsOpen={signupIsOpen} emailOpen={emailOpen} loginOpen={loginOpen} />
                        <SignupWithEmail emailClose={emailClose} emailIsOpen={emailIsOpen} />
                    </li> :
                        <li>
                            <HStack>
                                <Avatar name={currentUser.displayName} />
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>
                                        <ChevronDownIcon />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>Link 1</MenuItem>
                                        <MenuItem>Link 2</MenuItem>
                                        <MenuDivider />
                                        <MenuItem onClick={()=> signOut()}>Sign out</MenuItem>
                                    </MenuList>
                                </Menu>
                            </HStack>
                        </li>
                    }
                </ul>
            </nav>
            <div className={styles.hamburger}>
                <HamburgerIcon boxSize={6} ref={btnRef} onClick={hamOpen} />
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
                            <Image src="/Product Description.svg" width={140} height={100} alt="" />
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
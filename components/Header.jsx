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
    Box,
    Text,
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
import useAuth from './authentication/hooks/useAuth';
import CheckInbox from './CheckInbox';

const Header = () => {

    const router = useRouter();
    const { currentUser, signOut, userData } = useAuth();
    const { isOpen: hamISopen, onOpen: hamOpen, onClose: hamClose } = useDisclosure()
    const { isOpen: loginIsOpen, onOpen: loginOpen, onClose: loginClose } = useDisclosure()
    const { isOpen: emailIsOpen, onOpen: emailOpen, onClose: emailClose } = useDisclosure()
    const { isOpen: signupIsOpen, onOpen: signupOpen, onClose: signupClose } = useDisclosure()
    const { isOpen: forgetIsOpen, onOpen: forgetOpen, onClose: forgetClose } = useDisclosure()
    const { isOpen: checkIsOpen, onClose: checkClose, onOpen: checkOpen } = useDisclosure()

    const btnRef = React.useRef()

    // console.log(currentUser)
    const loginAction = () => {
        hamClose()
        loginOpen()
    }

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
                            bg={"transparent"}
                            bgGradient="linear(89.76deg, #FB047B 3.64%, #130EFF 99.88%)"
                            borderRadius="full"
                            _hover={{
                                border: "1px",
                                borderColor: "white"
                            }}
                            onClick={loginOpen}
                        >
                            Login
                        </Button>
                        <Login loginClose={loginClose} loginIsOpen={loginIsOpen} signupOpen={signupOpen} forgetOpen={forgetOpen} />
                        <ForgotPassword forgetClose={forgetClose} forgetIsOpen={forgetIsOpen} forgetOpen={forgetOpen} />
                        <SignUp signupClose={signupClose} signupIsOpen={signupIsOpen} emailOpen={emailOpen} loginOpen={loginOpen} />
                        <SignupWithEmail emailClose={emailClose} emailIsOpen={emailIsOpen} checkOpen={checkOpen} />
                        <CheckInbox checkOpen={checkOpen} checkClose={checkClose} checkIsOpen={checkIsOpen} />
                    </li> :
                        <li>
                            <HStack>
                                <Avatar name={currentUser?.displayName} src={currentUser?.photoURL || userData?.profileImageUrl} size="sm" />
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>
                                        <ChevronDownIcon />
                                    </MenuButton>
                                    <MenuList background="#000000" borderColor="#1B1919" minW="2.5" >
                                        <MenuItem fontSize="14px" mb="4" background="#000000" _hover={{ background: "white", color: "black" }}>
                                            <Image src="/Vector (18).svg" width="14" height="14" alt="" style={{ marginRight: "10px" }} />
                                            {!(router.asPath === "/profile") && <Link href="/profile">Profile</Link>}
                                            {router.asPath === "/profile" && <Text>Profile</Text>}
                                        </MenuItem>

                                        {!(router.asPath === "/profile/my-post") && (
                                            <>
                                                {userData?.role === "contributor" &&
                                                    <>
                                                        <MenuItem fontSize="14px" mb="4" background="#000000" _hover={{ background: "white", color: "black" }}>

                                                            <Image src="/Vector (19).svg" width="14" height="14" alt="" style={{ marginRight: "10px" }} />
                                                            <Link href="/profile/my-post">My Posts</Link>
                                                        </MenuItem>

                                                    </>
                                                }
                                            </>
                                        )}
                                        {(router.asPath === "/profile/my-post") && (
                                            <>
                                                {userData?.role === "contributor" &&
                                                    <>
                                                        <MenuItem fontSize="14px" mb="4" background="#000000" _hover={{ background: "white", color: "black" }}>
                                                            <Image src="/Vector (19).svg" width="14" height="14" alt="" style={{ marginRight: "10px" }} />
                                                            <Text>My Posts</Text>
                                                        </MenuItem>

                                                    </>
                                                }
                                            </>
                                        )}
                                        {!(router.asPath === "/users") && (
                                            <>
                                                {
                                                    (userData?.role === "admin") &&
                                                    <MenuItem fontSize="14px" background="#000000" mb="4" _hover={{ background: "white", color: "black" }}>
                                                        <Image src="/Vector (18).svg" width="14" height="14" alt="" style={{ marginRight: "10px" }} />
                                                        <Link href="/users">Users</Link>
                                                    </MenuItem>}
                                            </>
                                        )
                                        }
                                        {(router.asPath === "/users") && (
                                            <>
                                                {
                                                    (userData?.role === "admin") &&
                                                    <MenuItem fontSize="14px" background="#000000" mb="4" _hover={{ background: "white", color: "black" }}>
                                                        <Image src="/Vector (18).svg" width="14" height="14" alt="" style={{ marginRight: "10px" }} />
                                                        <Text>Users</Text>
                                                    </MenuItem>}
                                            </>
                                        )
                                        }

                                        {!(router.asPath === "/admin/posts") && (<>{(userData?.role === "editor" || userData?.role === "admin") &&
                                            <MenuItem fontSize="14px" background="#000000" _hover={{ background: "white", color: "black" }}>
                                                <Image src="/Vector (18).svg" width="14" height="14" alt="" style={{ marginRight: "10px" }} />
                                                <Link href="/admin/posts">Repository</Link>
                                            </MenuItem>
                                        }</>)}
                                        {(router.asPath === "/admin/posts") && (<>{(userData?.role === "editor" || userData?.role === "admin") &&
                                            <MenuItem fontSize="14px" background="#000000" _hover={{ background: "white", color: "black" }}>
                                                <Image src="/Vector (18).svg" width="14" height="14" alt="" style={{ marginRight: "10px" }} />
                                                <Text>Repository</Text>
                                            </MenuItem>
                                        }</>)}
                                        <MenuDivider background={"white"} opacity="1" color={"white"} />
                                        <MenuItem background="#000000" fontSize="14px">
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                as="button"
                                                onClick={() => signOut()}
                                                background="#F40580"
                                                color="white"
                                                padding={2}
                                                w="100%"
                                                borderRadius="full"
                                                textAlign="center"
                                            >
                                                <Image src="/Vector (20).svg" width="14" height="14" alt="" style={{ marginRight: "10px" }} />
                                                Sign out
                                            </Box>
                                        </MenuItem>
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
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            <Image src="/Product Description.svg" width={140} height={100} alt="" />
                        </DrawerHeader>
                        <DrawerBody>
                            <ul className={styles.menu_list}>
                                <li className={styles.menu} onClick={hamClose}>
                                    <Link href="/">Home</Link>
                                </li>
                                <li className={styles.menu}>
                                    <Link href="/newletters">Newletter</Link>
                                </li>
                                <li className={styles.menu}>
                                    <Link href="/podcast">Podcast</Link>
                                </li>
                                {
                                    !currentUser ? <li>
                                        <Button
                                            bg={"transparent"}
                                            bgGradient="linear(89.76deg, #FB047B 3.64%, #130EFF 99.88%)"
                                            borderRadius="full"
                                            w="full"
                                            color="whiteAlpha.800"
                                            _hover={{
                                                border: "1px",
                                                borderColor: "white"
                                            }}
                                            onClick={loginAction}
                                        >
                                            Login
                                        </Button>
                                        <Login loginClose={loginClose} loginIsOpen={loginIsOpen} signupOpen={signupOpen} forgetOpen={forgetOpen} />
                                        <ForgotPassword forgetClose={forgetClose} forgetIsOpen={forgetIsOpen} forgetOpen={forgetOpen} />
                                        <SignUp signupClose={signupClose} signupIsOpen={signupIsOpen} emailOpen={emailOpen} loginOpen={loginOpen} />
                                        <SignupWithEmail emailClose={emailClose} emailIsOpen={emailIsOpen} checkOpen={checkOpen} />
                                        <CheckInbox checkOpen={checkOpen} checkClose={checkClose} checkIsOpen={checkIsOpen} />
                                    </li> : <>
                                        <li className={styles.menu}>
                                            {!(router.asPath === "/profile") && <Link href="/profile">Profile</Link>}
                                            {router.asPath === "/profile" && <Text>Profile</Text>}
                                        </li>
                                        <li className={styles.menu}>
                                            <Link href="/profile/published">Posts</Link>
                                        </li>
                                        
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            as="button"
                                            onClick={() => signOut()}
                                            background="#F40580"
                                            color="white"
                                            padding={2}
                                            w="100%"
                                            borderRadius="full"
                                            textAlign="center"
                                        >
                                            <Image src="/Vector (20).svg" width="14" height="14" alt="" style={{ marginRight: "10px" }} />
                                            Sign out
                                        </Box>
                                    </>
                                }

                            </ul>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </div>
        </header>
    )
}

export default Header
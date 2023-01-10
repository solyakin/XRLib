import { AddIcon, ViewIcon } from "@chakra-ui/icons"
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Menu, MenuButton, MenuList, MenuItem, Image } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import useAuth from "./authentication/hooks/useAuth"
import UserService from "../services/users/users.service"


const AdminTable = ({ mutateRole, assignOpen, setSelectedUser }) => {
    const router = useRouter();
    const { data } = useQuery({
        queryKey: ['admin-users']
    },
    )

    return (
        <TableContainer mt="2rem" color="whiteAlpha.900">
            <Table variant='unstyled'>
                <Thead>
                    <Tr background="#333333" color="whiteAlpha.700">
                        <Th>Display Name</Th>
                        <Th>Name</Th>
                        <Th>Email address</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"}>
                    {
                        data && data.map((user, index) => {
                            return (
                                <Tr borderBottom={"1px"} borderColor={" rgba(251, 4, 123, 0.5)"} key={index}>
                                    <Td>{user?.displayName}</Td>
                                    <Td>{`${user?.firstName || "N/A"} ${user.lastName || "N/A"}`}</Td>
                                    <Td>{user.email}</Td>
                                    <Td display={"flex"} justifyContent="flex-end">
                                        <Menu isLazy>
                                            <MenuButton>
                                                <Image src="/Vector (23).svg" width="13px" alt="" />
                                            </MenuButton>
                                            <MenuList background="black" borderColor="#1B1919" minW={"40px"} py="5">
                                                <MenuItem
                                                    onClick={() => {
                                                        assignOpen();
                                                        setSelectedUser(user)
                                                    }}

                                                    icon={<AddIcon />}
                                                    mb="3"
                                                    background="#000000"
                                                    _hover={{ background: "white", color: "black" }}
                                                    fontSize={"sm"}
                                                >
                                                    Assign Role
                                                </MenuItem>
                                                <MenuItem
                                                    icon={<ViewIcon />}
                                                    background="#000000"
                                                    onClick={() => router.push({ pathname: `p/${user.displayName}` })}
                                                    _hover={{ background: "white", color: "black" }}
                                                    fontSize={"sm"}
                                                >
                                                    View Profile
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default AdminTable;
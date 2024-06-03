'use client'

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {  useAuth,isAuthenticated } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


// interface Props {
//   children: React.ReactNode
// }

// const NavLink = (props: Props) => {
//   const { children } = props

//   return (
//     <Box
//       as="a"
//       px={2}
//       py={1}
//       rounded={'md'}
//       _hover={{
//         textDecoration: 'none',
//         bg: useColorModeValue('gray.200', 'gray.700'),
//       }}
//       href={'#'}>
//       {children}
//     </Box>
//   )
// }

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isAuthenticated,logout,login } = useAuth();
  const navigate = useNavigate()

  return (
    <Box >
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} sx={{maxWidth:'1500px',margin:'auto'}} alignItems={'center'} justifyContent={'space-between'}>
          <Box sx={{cursor:'pointer'}} onClick={()=>navigate('/')}>Sale Order Management System</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

            {!isAuthenticated?
           
              <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            // href={'#'}
            _hover={{
              bg: 'pink.300',
            }}
            onClick={()=>navigate('/login')}>
               {/* <Avatar size='sm'sx={{marginRight:'5px'}} src='https://bit.ly/broken-link' />  */}
            Sign In
          </Button>
           :
          <Menu>
              
              <MenuButton
                  as={Button}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                   <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'#'}
            _hover={{
              bg: 'pink.300',
            }}>
                
                    <Avatar size='sm'sx={{marginRight:'5px'}} src='https://bit.ly/broken-link' />
                   Admin
                
          </Button>
                </MenuButton>
                <MenuList alignItems={'center'}>
                  
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
           }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
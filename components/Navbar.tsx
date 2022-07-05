import React, { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack, Heading, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Sidebar from "./Sidebar";
import Link from 'next/link';
import Search from "./Search";

const NavLink = ({ href, children }: {href: string, children: ReactNode}) => (
  <Link href={href}>
    <a>
      <Box css={{
        '&:not(:hover)': {
          transitionProperty: 'var(--chakra-transition-property-common)',
          transitionDuration: 'var(--chakra-transition-duration-fast)',
          transitionTimingFunction: 'var(--chakra-transition-easing-ease-out)'
        },
      }} _hover={{ color: 'white' }}>{children}</Box>
    </a>
  </Link>
);

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box className='navbar'
           width='100%'
           position="fixed"
           padding='0'
           top="0"
           backgroundColor="dark"
           height="3.5rem"
           zIndex="3"
           px={4}>
        <Flex h={16} alignItems={'center'}>
          <IconButton
            mr='0.75rem'
            _focus={{ border: 'none' }}
            padding='0.5rem'
            variant='unstyled'
            size={'md'}
            aria-label={'Open Menu'}
            display={{ md: 'none' }} onClick={onOpen}>
            <HamburgerIcon
              width='1.75rem'
              height='1.75rem'
            />
          </IconButton>
          <HStack width='100%' justifyContent={{ base: 'center', sm: 'unset' }} spacing={8} alignItems={'center'}>
            <Link href='/'>
              <a>
                <Heading size='xl' className='logo'>
                  what<Box as='span' color='accent'>2</Box>watch
                </Heading>
              </a>
            </Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
              color='lightgray'>
              <NavLink href='/movie'>Movies</NavLink>
              <NavLink href='/tv'>Tv Shows</NavLink>
              <NavLink href='/trending'>Trending</NavLink>
            </HStack>
          </HStack>
          <Search alwaysVisible={false}/>
        </Flex>

        <Drawer preserveScrollBarGap={true} size='xs' placement='left' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay/>
          <DrawerContent borderRight='1px' borderColor='darkBorder' backgroundColor='black'>
            <DrawerHeader borderBottomWidth='0px' borderColor='darkBorder'>
              <Box as='button' borderColor='lightgray' autoFocus onClick={onClose}>
                <CloseIcon color='lightgray'/>
              </Box>
            </DrawerHeader>
            <DrawerBody
              className='disabled-scrollbar'
              css={{
                '& button:not(:hover)': {
                  transitionProperty: 'var(--chakra-transition-property-common)',
                  transitionDuration: 'var(--chakra-transition-duration-fast)',
                  transitionTimingFunction: 'var(--chakra-transition-easing-ease-out)'
                },
                '& button:hover': {
                  color: 'white',
                },
                '& a:hover': {
                  color: 'white',
                  textDecoration: 'none'
                },
                '& a': {
                  textDecoration: 'none'
                }
              }}>
              <Sidebar/>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

export default Navbar;

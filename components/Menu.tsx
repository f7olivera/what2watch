import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import Sidebar from "./Sidebar";


function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <button onClick={onOpen}>
        <HamburgerIcon
          width='2rem'
          height='2rem'/>
      </button>
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
  )
}

export default Menu;

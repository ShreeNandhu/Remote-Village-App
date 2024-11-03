import {
    Flex,
    IconButton,
    Box,
    Avatar,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Link,
    Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../store/authStore";

const MobileHeader = ({ onOpen, isOpen, onClose }) => {
    const { user } = useAuthStore(state => state);

    return (
      <>
        <Flex
          as="header"
          bg="red.500"
          color="white"
          boxShadow="md"
          justify="space-between"
          align="center"
          position="static"
          zIndex="1"
          p={2}
        >
          <Box ml={5}>
            <Avatar size="sm" name="Remote Village" />
          </Box>

          <IconButton
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            onClick={onOpen}
            mr={5}
            bg="transparent"
            color="white"
            _hover={{ bg: "transparent" }}
          />
        </Flex>

        {/* Drawer for mobile menu */}
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Link as={RouterLink} to="/" onClick={onClose} _hover={{ textDecoration: "none" }}>
                <Text mb={4}>Home</Text>
              </Link>
              <Link as={RouterLink} to="/syllabus" onClick={onClose} _hover={{ textDecoration: "none" }}>
                <Text mb={4}>Syllabus</Text>
              </Link>
              <Link as={RouterLink} to="/assessment" onClick={onClose} _hover={{ textDecoration: "none" }}>
                <Text mb={4}>Assessment</Text>
              </Link>
              <Link as={RouterLink} to="/evaluation" onClick={onClose} _hover={{ textDecoration: "none" }}>
                <Text mb={4}>Evaluation</Text>
              </Link>
              {user ? (
                <Text mb={4} fontWeight="bold">
                  {user.username || "User"}
                </Text>
              ) : (
                <Link as={RouterLink} to="/auth" onClick={onClose} _hover={{ textDecoration: "none" }}>
                  <Text mb={4}>Login/SignUp</Text>
                </Link>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
};

export default MobileHeader;

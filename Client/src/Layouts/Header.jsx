import {
  Flex,
  Box,
  Text,
  Avatar,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        {/* Avatar that shrinks responsively */}
        <Box ml={5} >
          <Avatar size={["sm", "xl"]} name="Remote Village" />
        </Box>

        {/* Hamburger menu button for mobile */}
        <IconButton
          display={["flex", "flex", "none"]}
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          onClick={onOpen}
          mr={5}
          bg="transparent"
          color="white"
          _hover={{ bg: "transparent" }}
        />

        {/* Navigation for larger screens */}
        <Flex display={["none", "none", "flex"]} justify="flex-end" mr={5}>
          <Box
            display="flex"
            justifyContent="space-around"
            w={["100%", "70%", "800px"]} // Responsive width
            gap={[2, 6, 10]} // Responsive gap between items
            p={2}
          >
            <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
              <Text
                fontSize={["sm", "md", "lg"]}
                _hover={{ fontSize: ["md", "lg", "xl"] }}
                transition="font-size 0.3s ease"
                fontWeight={"bold"}
              >
                Home
              </Text>
            </Link>
            <Link
              as={RouterLink}
              to="/syllabus"
              _hover={{ textDecoration: "none" }}
            >
              <Text
                fontSize={["sm", "md", "lg"]}
                _hover={{ fontSize: ["md", "lg", "xl"] }}
                transition="font-size 0.3s ease"
                fontWeight={"bold"}
              >
                Syllabus
              </Text>
            </Link>
            <Link
              as={RouterLink}
              to="/assessment"
              _hover={{ textDecoration: "none" }}
            >
              <Text
                fontSize={["sm", "md", "lg"]}
                _hover={{ fontSize: ["md", "lg", "xl"] }}
                transition="font-size 0.3s ease"
                fontWeight={"bold"}
              >
                Assessment
              </Text>
            </Link>
            <Link
              as={RouterLink}
              to="/evaluation"
              _hover={{ textDecoration: "none" }}
            >
              <Text
                fontSize={["sm", "md", "lg"]}
                _hover={{ fontSize: ["md", "lg", "xl"] }}
                transition="font-size 0.3s ease"
                fontWeight={"bold"}
              >
                Evaluation
              </Text>
            </Link>
            <Link
              as={RouterLink}
              to="/login-signup"
              _hover={{ textDecoration: "none" }}
            >
              <Text
                fontSize={["sm", "md", "lg"]}
                _hover={{ fontSize: ["md", "lg", "xl"] }}
                transition="font-size 0.3s ease"
                fontWeight={"bold"}
              >
                Login/SignUp
              </Text>
            </Link>
          </Box>
        </Flex>
      </Flex>

      {/* Drawer for mobile menu */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Text mb={4} onClick={onClose}>
              Home
            </Text>
            <Text mb={4} onClick={onClose}>
              Syllabus
            </Text>
            <Text mb={4} onClick={onClose}>
              Assessment
            </Text>
            <Text mb={4} onClick={onClose}>
              Login/SignUp
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;

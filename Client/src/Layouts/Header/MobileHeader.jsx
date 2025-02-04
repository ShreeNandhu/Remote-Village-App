import { Flex, Box, Avatar, Link, Text } from "@chakra-ui/react";
import { FaHome, FaBook, FaClipboardList, FaFileAlt } from "react-icons/fa"; // React Icons
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { FaCircleUser } from "react-icons/fa6";

const MobileHeader = () => {
  const { user } = useAuthStore(state => state);

  return (
    <Flex
      as="header"
      bg="red.500"
      color="white"
      boxShadow="md"
      justify="space-between"
      align="center"
      position="static"
      zIndex="1"
      p={4}
      direction="row"
      wrap="wrap"
    >
      {/* Centered Avatar (Logo) */}
      <Box flex="1" textAlign="center">
        <Avatar size="sm" name="Remote Village" src="/logo.png" mx="auto" />
      </Box>

      {/* Menu items with React Icons */}
      <Flex flex="2" justify="space-between" align="flex-end" wrap="wrap" spacing={4}>
        <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }} display="flex" alignItems="center">
          <FaHome size={20} style={{ marginRight: "8px" }} />
        </Link>
        <Link as={RouterLink} to="/syllabus" _hover={{ textDecoration: "none" }} display="flex" alignItems="center">
          <FaBook size={20} style={{ marginRight: "8px" }} />
        </Link>
        <Link as={RouterLink} to="/assessment" _hover={{ textDecoration: "none" }} display="flex" alignItems="center">
          <FaClipboardList size={20} style={{ marginRight: "8px" }} />
        </Link>
        <Link as={RouterLink} to="/evaluation" _hover={{ textDecoration: "none" }} display="flex" alignItems="center">
          <FaFileAlt size={20} style={{ marginRight: "8px" }} />
        </Link>
        {user ? (
          <Link as={RouterLink} to={`/${user.username}`} _hover={{ textDecoration: "none" }} display="flex" alignItems="center">
            {/* <Text fontSize="md" fontWeight="bold" cursor="pointer">{user.username || "User"}</Text> */}
            <FaCircleUser size={20} style={{ marginRight: "8px" }} />
          </Link>
        ) : (
          <Link as={RouterLink} to="/auth" _hover={{ textDecoration: "none" }} display="flex" alignItems="center">
            <Text mb={4}>Login/SignUp</Text>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export default MobileHeader;

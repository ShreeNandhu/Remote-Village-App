import { Flex, Box, Text, Avatar, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../store/authStore";

const DesktopHeader = () => {
  const { user } = useAuthStore((state) => state); // Get user directly

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
      p={2}
    >
      <Box ml={5}>
        <Avatar size="lg" name="Remote Village" />
      </Box>

      <Flex justify="flex-end" mr={5}>
        <Box
          display="flex"
          justifyContent="space-around"
          w="800px"
          gap={10}
          p={2}
        >
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <Text fontSize="md" fontWeight="bold">
              Home
            </Text>
          </Link>
          <Link
            as={RouterLink}
            to="/syllabus"
            _hover={{ textDecoration: "none" }}
          >
            <Text fontSize="md" fontWeight="bold">
              Syllabus
            </Text>
          </Link>
          <Link
            as={RouterLink}
            to="/assessment"
            _hover={{ textDecoration: "none" }}
          >
            <Text fontSize="md" fontWeight="bold">
              Assessment
            </Text>
          </Link>
          <Link
            as={RouterLink}
            to="/evaluation"
            _hover={{ textDecoration: "none" }}
          >
            <Text fontSize="md" fontWeight="bold">
              Evaluation
            </Text>
          </Link>
          {user ? (
            <Link
              as={RouterLink}
              to={`/${user.username}`} // Use curly braces `{}` for the dynamic template literal
              _hover={{ textDecoration: "none" }}
            >
              <Text fontSize="md" fontWeight="bold" cursor="pointer">
                {user.username || "User"}
              </Text>
            </Link>
          ) : (
            <Link
              as={RouterLink}
              to="/auth"
              _hover={{ textDecoration: "none" }}
            >
              <Text fontSize="md" fontWeight="bold">
                Login/SignUp
              </Text>
            </Link>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default DesktopHeader;

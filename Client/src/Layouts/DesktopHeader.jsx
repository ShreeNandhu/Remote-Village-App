import { Avatar, Box, Flex, Link, SkeletonCircle, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import useAdminStore from "../store/adminStore";
import useAuthStore from "../store/authStore";
const DesktopHeader = () => {
  const { user } = useAuthStore((state) => state);
  const { admin } = useAdminStore((state) => state);
  const navigate = useNavigate();
  const toast = useShowToast();
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigation = (link) => {
    navigate(link);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulating a delay for loading

    return () => clearTimeout(timer);
  }, []);
  // Define links conditionally based on user/admin roles
  const navLinks = [
    ...(user
      ? [
          { name: "Assessment", to: "/assessment" },
          { name: "Syllabus", to: "/syllabus" },
        ]
      : []),
    ...(admin
      ? [
          { name: "Evaluation", to: "/evaluation" },
          { name: "Uplodation", to: "/uplodation" },
        ]
      : []),
  ];

  return (
    <Flex
      as="header"
      bgGradient="linear(to-l, blue.300, blue.800)"
      backdropFilter="blur(10px)"
      color="white"
      boxShadow="md"
      justify="space-between"
      align="center"
      p={2}
    >
      {/* Logo */}
      <Box ml={5}>
        {isLoading ? (
          <SkeletonCircle size="12" />
        ) : (
          <Avatar size="lg" name="Remote Village" src="/logo.png" />
        )}
      </Box>
      {/* Navigation */}
      <Flex mr={5} gap={10} align="center">
        <Link
          as={RouterLink}
          to="/"
          position="relative"
          _after={{
            content: '""',
            position: "absolute",
            bottom: "-3px",
            right: "100%",
            width: "0%",
            height: "2px",
            bg: "gold",
            transition: "all 0.3s ease-in-out",
          }}
          _hover={{
            _after: {
              right: "0%",
              width: "100%",
            },
          }}
        >
          <Text fontSize="md" fontWeight="bold">
            Home
          </Text>
        </Link>

        {navLinks.map(({ name, to }) => (
          <Link
            key={name}
            as={RouterLink}
            to={to}
            position="relative"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(to);
            }}
            _after={{
              content: '""',
              position: "absolute",
              bottom: "-3px",
              right: "100%",
              width: "0%",
              height: "2px",
              bg: "gold",
              transition: "all 0.3s ease-in-out",
            }}
            _hover={{
              _after: {
                right: "0%",
                width: "100%",
              },
            }}
          >
            <Text fontSize="md" fontWeight="bold">
              {name}
            </Text>
          </Link>
        ))}

        {/* User Profile or Auth Link */}
        {user || admin ? (
          <Link
            as={RouterLink}
            to="/profile"
            position="relative"
            _after={{
              content: '""',
              position: "absolute",
              bottom: "-3px",
              right: "100%",
              width: "0%",
              height: "2px",
              bg: "gold",
              transition: "all 0.3s ease-in-out",
            }}
            _hover={{
              _after: {
                right: "0%",
                width: "100%",
              },
            }}
          >
            <Text fontSize="md" fontWeight="bold">
              {admin?.username || user?.username}
            </Text>
          </Link>
        ) : (
          <Link
            as={RouterLink}
            to="/auth"
            position="relative"
            _after={{
              content: '""',
              position: "absolute",
              bottom: "-3px",
              right: "100%",
              width: "0%",
              height: "2px",
              bg: "gold",
              transition: "all 0.3s ease-in-out",
            }}
            _hover={{
              _after: {
                right: "0%",
                width: "100%",
              },
            }}
          >
            <Text fontSize="md" fontWeight="bold">
              Login / Sign Up
            </Text>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export default DesktopHeader;

import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useAdminStore from "../../store/adminStore";
import useShowToast from "../../hooks/useShowToast";

const DesktopHeader = () => {
  const { user, selectedStandard } = useAuthStore((state) => state);
  const { admin } = useAdminStore((state) => state);
  const navigate = useNavigate();
  const toast = useShowToast();

  const handleUserNavigation = (link) => {
    if (!selectedStandard && link !== "/") {
      toast(
        "Standard Not Selected",
        "Please select a standard before accessing this page.",
        "warning"
      );
    } else {
      navigate(link); // Programmatically navigate for user
    }
  };

  const handleAdminNavigation = (link) => {
    // Admin specific navigation logic, can be extended in the future
    navigate(link); // Directly navigate for admin
  };

  // Define links conditionally based on user/admin roles
  const navLinks = [
    ...(user
      ? [
          { name: "Assessment", to: "/assessment", requiresStandard: true },
          { name: "Syllabus", to: "/syllabus", requiresStandard: true },
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
        <Avatar size="lg" name="Remote Village" src="/logo.png" />
      </Box>

      {/* Navigation */}
      <Flex mr={5} gap={10} align="center">
        <Link
          as={RouterLink}
          to={"/"} // Direct navigation without programmatic handling
          _hover={{ textDecoration: "none" }}
        >
          <Text
            fontSize="md"
            fontWeight="bold"
            position="relative"
            transition="all 0.3s ease"
            _after={{
              content: '""',
              position: "absolute",
              width: "0",
              height: "2px",
              bottom: "-2px",
              left: "0",
              bg: "gold",
              transition: "width 0.3s ease",
            }}
            _hover={{
              _after: { width: "100%" },
            }}
          >
            Home
          </Text>
        </Link>

        {navLinks.map(({ name, to, requiresStandard }) =>
          (!requiresStandard || selectedStandard) ? (
            <Link
              key={name}
              as={RouterLink}
              to={to} // Directly use `to` for Link navigation
              onClick={(e) => {
                e.preventDefault(); // Prevent the default behavior
                if (user) {
                  handleUserNavigation(to); // For user navigation
                } else if (admin) {
                  handleAdminNavigation(to); // For admin navigation
                }
              }}
              _hover={{ textDecoration: "none" }}
            >
              <Text
                fontSize="md"
                fontWeight="bold"
                position="relative"
                transition="all 0.3s ease"
                _after={{
                  content: '""',
                  position: "absolute",
                  width: "0",
                  height: "2px",
                  bottom: "-2px",
                  left: "0",
                  bg: "gold",
                  transition: "width 0.3s ease",
                }}
                _hover={{
                  _after: { width: "100%" },
                }}
              >
                {name}
              </Text>
            </Link>
          ) : null
        )}

        {/* User Profile or Auth Link */}
        {user || admin ? (
          <Link
          as={RouterLink}
          to={"/profile"} // Direct navigation without programmatic handling
          _hover={{ textDecoration: "none" }}
        >
          <Text
            fontSize="md"
            fontWeight="bold"
            position="relative"
            transition="all 0.3s ease"
            _after={{
              content: '""',
              position: "absolute",
              width: "0",
              height: "2px",
              bottom: "-2px",
              left: "0",
              bg: "gold",
              transition: "width 0.3s ease",
            }}
            _hover={{
              _after: { width: "100%" },
            }}
          >
              {admin?.username || user?.username}
            </Text>
          </Link>
        ) : (
          <Link
          as={RouterLink}
          to={"/auth"} // Direct navigation without programmatic handling
          _hover={{ textDecoration: "none" }}
        >
          <Text
            fontSize="md"
            fontWeight="bold"
            position="relative"
            transition="all 0.3s ease"
            _after={{
              content: '""',
              position: "absolute",
              width: "0",
              height: "2px",
              bottom: "-2px",
              left: "0",
              bg: "gold",
              transition: "width 0.3s ease",
            }}
            _hover={{
              _after: { width: "100%" },
            }}
          >
              Login / Sign Up
            </Text>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export default DesktopHeader;

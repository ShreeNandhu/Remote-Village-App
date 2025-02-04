import { Box, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      as="footer"
      bgGradient="linear(to-r, blue.300, blue.800)"
      color="white"
      position="relative"
      py={4} px={2} // Adjust padding for spacing
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between" // Create equal space between sections
        align="center"
        maxW="1200px"
        mx="auto"
        w="full" // Ensure full width of the footer
      >
        {/* Left: Branding */}
        <Text fontWeight="bold" fontSize="lg" textAlign="center">
          Remote Village App
        </Text>

        {/* Center: Navigation Links */}
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={{ base: 2, sm: 4 }}
          align="center"
          justify="center" // Center the links horizontally
        >
          <Link as={RouterLink} to="/about" _hover={{ textDecoration: "none" }}>
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
              About
            </Text>
          </Link>
        </Flex>

        {/* Right: Copyright */}
        <Text fontSize="sm" textAlign="center">
          ©{new Date().getFullYear()} Remote Village. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;

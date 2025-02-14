import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import useAuthStore from "../../store/authStore";
import useAdminStore from "../../store/adminStore";

// Motion Wrapper
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

const WelcomePage = () => {
  const { user } = useAuthStore((state) => state);
  const { admin } = useAdminStore((state) => state);

  return (
    <MotionFlex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      px={{ base: 1, md: 0 }}
      initial={{ opacity: 0, y: 50 }} // Start from below
      animate={{ opacity: 1, y: 0 }} // Move to normal position
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
    >
      <Stack
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxWidth={{ base: "100%", md: "900px" }}
        pt={0}
      >
        <MotionText
          fontSize={{ base: "40px", md: "70px" }}
          fontWeight="bold"
          textAlign="center"
          p={0}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Welcome
        </MotionText>

        {(user || admin) && (
          <MotionText
            fontSize={{ base: "30px", md: "40px" }}
            fontWeight="bold"
            textAlign="center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {admin?.username || user?.username}
          </MotionText>
        )}

        <MotionText
          textAlign="center"
          fontSize={{ base: "20px", md: "30px" }}
          px={{ base: "10px", md: "0" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Bringing quality learning to every corner of the village.
        </MotionText>
      </Stack>
    </MotionFlex>
  );
};

export default WelcomePage;

import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../Layouts/PageLayout";
// Ensure correct import

const About = () => {
  const navigate = useNavigate();
  const developers = [
    "Sivadharani.A",
    "Shreenandhan.N.N.",
    "Priyadarshini R",
    "Ravidhar.S",
    "Harsha Vardhan A.K.",
    "Saranya. G",
    "Santhanam.R",
    "Subalakshmi.S",
    "Sagambari.A",
    "Sneha.J",
    "Vijay.M",
    "Abinaya.K",
    "Suruthi.K",
    "Sneha.S",
    "Selvabala. A.S",
    "ShreeRam.S",
    "Jerish Mary Sahana.D.A.",
    "Sobiya.K",
    "Jayachandran.T",
    "Loganathan.T",
    "Dhirisha.R",
    "Giridharan",
    "Sanjay.S",
    "Anandha Vignesh.R",
    "Anandha Raju.A",
    "Selvasubramanian.K",
    "Vignesh.K",
    "Subanusri.M",
    "Arulmani.S",
    "Punith.V.A",
    "Adhithiyan.E",
    "Abinaya.R",
    "Lohitha.R",
    "Abinaya.P",
    "Riyazur Rahman.M",
    "Vigneshwari.P",
    "Preethika.K",
    "Mohamed Thufail.M",
    "Brindha.S",
    "KarthikRajan.N.K",
    "Sakthi Mahalakshmi.R",
    "Mohamed Suhail.M",
    "Divakar.M",
    "Baranikumar.V",
    "Abishek.S",
    "Arulmozhivarman",
  ];
  const sections = Array.from({ length: 7 }, (_, i) =>
    developers.slice(i * 5, i * 5 + 5)
  );

  return (
    <PageLayout
      main={
        <>
          <Box
            as="section"
            p={4}
            maxW="1200px"
            mx="auto"
            textAlign="center"
            position="relative"
          >
            <Button
              onClick={() => navigate(-1)}
              colorScheme="teal"
              variant="outline"
              position="absolute"
              left="0" // Align the button to the left side
              top="50%" // Center it vertically (optional)
              transform="translateY(-50%)" // Adjust vertical centering
            >
              Back
            </Button>
            <Text fontSize="2xl" mb={2} fontWeight="bold">
              Welcome to the Remote Village App!
            </Text>
          </Box>

          <Box as="section" maxW="1500px" mx="auto" textAlign="justify">
            <Text>
              The Village student learning platform is designed and developed by
              Final year MCA students of Department of Computer Applications,
              Anna University, Chennai - University College of Engineering,
              Trichy students. The Development is based on motivational factors
              to teach the young students especially for 10th and 12th students
              in the field of their study and to prepare for competitive
              examinations conducted by state and central board examinations.
              This platform is specially designed for remote village students to
              use the digital content in the learning platform for studying, and
              preparing for exams. Our students will be the admin to conduct the
              exams, uploading the question paper, and the evaluation is done by
              the team of faculty members. This platform is to support the young
              minds to motivate them to attend the competitive exams with high
              confidence. Thanks to our students for their effort and sincerity
              towards helping young minds to reach their heights in their
              career.
            </Text>
          </Box>
          <Box
            as="section"
            maxW="1500px"
            mx="auto"
            textAlign="justify"
            fontWeight="bold"
          >
            <Text>Dr. P. Vaishnavi,Faculty Member,Web Development Team.</Text>
          </Box>
          <Box as="section" p={4} maxW="1200px" mx="auto" textAlign="center">
            <Text fontSize="2xl" mb={4} fontWeight="bold">
              Developer Team:
            </Text>

            <Grid templateColumns="repeat(7, 1fr)" gap={6}>
              {sections.map((section, index) => (
                <Box key={index}>
                  {section.map((name, idx) => (
                    <Text key={idx}>{name}</Text>
                  ))}
                </Box>
              ))}
            </Grid>
          </Box>
        </>
      }
    />
  );
};

export default About;

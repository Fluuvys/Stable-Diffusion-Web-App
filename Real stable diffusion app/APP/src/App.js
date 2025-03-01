import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  Input,
  Button,
  Wrap,
  Image,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";

// Framer Motion for Animations
const MotionBox = motion(Box);

const App = () => {
  const [image, updateImage] = useState(null);
  const [prompt, updatePrompt] = useState("");
  const [loading, updateLoading] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    updateLoading(true);
    try {
      const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
      if (result.data && result.data.image) {
        updateImage(`data:image/png;base64,${result.data.image}`);
      } else {
        console.error("Invalid image data:", result.data);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
    updateLoading(false);
  };

  return (
    <ChakraProvider>
      <Box
        bgGradient="linear(to-r, #1a2a6c, #b21f1f, #fdbb2d)"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={6}
        position="relative"
      >
        {/* Floating Watermark */}
        <Text
          position="absolute"
          top="10px"
          right="10px"
          fontSize="xs"
          color="whiteAlpha.700"
        >
          Created by <b>Nguyen Hoang Minh Giang</b>
        </Text>

        <MotionBox
          bg="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(10px)"
          boxShadow="0 0 20px rgba(255,255,255,0.2)"
          borderRadius="lg"
          p={6}
          textAlign="center"
          maxW="500px"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Heading size="lg" color="white" mb={2}>
            🎨 Stable Diffusion AI
          </Heading>
          <Text color="gray.200" fontSize="sm" mb={4}>
            Generate AI-powered images using Stable Diffusion.
            View the model on{" "}
            <Link
              href="https://github.com/CompVis/stable-diffusion"
              color="yellow.300"
              isExternal
            >
              GitHub
            </Link>
            .
          </Text>

          <Wrap spacing={3} justify="center" mb={4}>
            <Input
              value={prompt}
              onChange={(e) => updatePrompt(e.target.value)}
              placeholder="Enter a creative prompt..."
              width="280px"
              focusBorderColor="yellow.400"
              bg="whiteAlpha.200"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
            <Button
              onClick={generate}
              colorScheme="yellow"
              isLoading={loading}
              _hover={{ transform: "scale(1.05)" }}
            >
              Generate
            </Button>
          </Wrap>

          {loading ? (
            <Spinner size="xl" color="yellow.300" mt={4} />
          ) : image ? (
            <Image
              src={image}
              alt="Generated Art"
              borderRadius="md"
              boxShadow="dark-lg"
              mt={4}
            />
          ) : (
            <Text color="gray.300" fontSize="sm">
              No image yet. Enter a prompt to start!
            </Text>
          )}

          <Text mt={6} fontSize="sm" color="gray.400">
            Made with ❤️ by <b>Nguyen Hoang Minh Giang</b>
          </Text>
        </MotionBox>

        {/* Footer */}
        <Box position="absolute" bottom="10px" textAlign="center" width="100%">
          <Text fontSize="xs" color="whiteAlpha.700">
            <Link href="https://github.com/Fluuvys" color="yellow.300" isExternal>
              Check out my other projects 🚀
            </Link>
          </Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;

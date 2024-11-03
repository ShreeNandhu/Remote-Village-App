import { useDisclosure } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const { isOpen, onOpen } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 48em)"); // Adjust the breakpoint as needed

  return (
    <>
      {isMobile ? (
        <MobileHeader onOpen={onOpen} />
      ) : (
        <DesktopHeader />
      )}
    </>
  );
};

export default Header;

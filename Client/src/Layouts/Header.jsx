import { useMediaQuery } from "@chakra-ui/media-query";
import { useDisclosure } from "@chakra-ui/react";
import DesktopHeader from "./Header/DesktopHeader";
import MobileHeader from "./Header/MobileHeader";


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

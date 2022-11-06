import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Image,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  UpDownIcon,
} from "@chakra-ui/icons";
import { MergeSort, BubbleSort, QuickSort, HeapSort } from "../algorithms";

export default function Navbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 767) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={5}>
        <Flex h={14} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          {activeMenu ? (
            <>
              <Box className="logo-container">
                <Image boxSize="40px" src="logo.png" alt="logo" />
                <Menu>
                  <MenuButton
                    as={Button}
                    onClick={() => {
                      props.removeOrder();
                      props.generateArray(props.arrayRange);
                    }}
                  >
                    Generate New Array
                  </MenuButton>
                </Menu>
              </Box>
              <Box className="sort-container">
                <Menu>
                  <MenuButton
                    as={Button}
                    onClick={() => MergeSort(props.arr, 0, props.arr_size - 1)}
                  >
                    Merge Sort
                  </MenuButton>
                  <MenuButton
                    as={Button}
                    onClick={() => BubbleSort(props.arr, props.arr_size - 1)}
                  >
                    Bubble Sort
                  </MenuButton>
                  <MenuButton
                    as={Button}
                    onClick={() => HeapSort(props.arr)}
                  >
                    Heap Sort
                  </MenuButton>
                  <MenuButton
                    as={Button}
                    onClick={() => QuickSort(props.arr, 0, props.arr_size - 1)}
                  >
                    Quick Sort
                  </MenuButton>
                </Menu>
              </Box>
              <Box className="slider-container">
                <Box width={120}>
                  <p>
                    Sleep Time: <span id="sort-speed">{props.sortSpeed}</span>
                  </p>
                  <Slider
                    max={500}
                    aria-label="sort-speed"
                    defaultValue={200}
                    onChange={(val) => props.setSortSpeed(val)}
                  >
                    <SliderTrack bg="purple.200">
                      <SliderFilledTrack bg="purple" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <Box color="yellow.400" as={MoonIcon} />
                    </SliderThumb>
                  </Slider>
                </Box>
                <Box width={120}>
                  Elements: {props.arrayRange}
                  <Slider
                    min={10}
                    max={90}
                    aria-label="array-size"
                    defaultValue={25}
                    onChange={(val) => props.setArrayRange(val)}
                  >
                    <SliderTrack bg="purple.200">
                      <SliderFilledTrack bg="purple" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <Box color="blue.400" as={UpDownIcon} />
                    </SliderThumb>
                  </Slider>
                </Box>
              </Box>
            </>
          ) : null}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Menu>
                <MenuButton
                  as={Button}
                  onClick={() => {
                    props.removeOrder();
                    props.generateArray(props.arrayRange);
                  }}
                >
                  Generate New Array
                </MenuButton>
                <MenuButton
                  as={Button}
                  onClick={() => MergeSort(props.arr, 0, props.arr_size - 1)}
                >
                  Merge Sort
                </MenuButton>
                <MenuButton
                  as={Button}
                  onClick={() => BubbleSort(props.arr, props.arr_size - 1)}
                >
                  Bubble Sort
                </MenuButton>
              </Menu>
              <Box width={120}>
                Sleep Time: <span id="sort-speed">{props.sortSpeed}</span>
                <Slider
                  max={500}
                  aria-label="sort-speed"
                  defaultValue={200}
                  onChange={(val) => props.setSortSpeed(val)}
                >
                  <SliderTrack bg="purple.200">
                    <SliderFilledTrack bg="purple" />
                  </SliderTrack>
                  <SliderThumb boxSize={6}>
                    <Box color="yellow.400" as={MoonIcon} />
                  </SliderThumb>
                </Slider>
              </Box>
              <Box width={120}>
                Elements: {props.arrayRange}
                <Slider
                  min={10}
                  max={90}
                  aria-label="array-size"
                  defaultValue={25}
                  onChange={(val) => props.setArrayRange(val)}
                >
                  <SliderTrack bg="purple.200">
                    <SliderFilledTrack bg="purple" />
                  </SliderTrack>
                  <SliderThumb boxSize={6}>
                    <Box color="blue.400" as={UpDownIcon} />
                  </SliderThumb>
                </Slider>
              </Box>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

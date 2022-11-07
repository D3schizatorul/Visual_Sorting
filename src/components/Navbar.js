import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { MergeSort, BubbleSort, QuickSort, HeapSort } from "../algorithms";
import { ReactComponent as MergeIcon } from "../assets/merge.svg";
import { ReactComponent as QuickIcon } from "../assets/clock.svg";
import { ReactComponent as HeapIcon } from "../assets/heap.svg";
import { ReactComponent as BubbleIcon } from "../assets/bubbles.svg";

export default function Navbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeMenu, setActiveMenu] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(false);

  useEffect(() => {
    console.log(props.screenSize)
    if (props.screenSize <= 767) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
    if (props.screenSize <= 1015 && props.screenSize >= 767) {
      setDropdownMenu(true);
    } else {
      setDropdownMenu(false);
    }
  }, [props.screenSize]);

  async function sortingDone(arr) {
    for (let i = 0; i <= arr.length - 1; i++) {
      const sound = new Audio("sticks.wav");
      sound.volume = 0.2;
      sound.play();
      document.querySelector(`.bar-${arr[i]}`).style.background = "green";
      await sleep(100);
    }
    await sleep(500);
    for (let i = 0; i <= arr.length - 1; i++) {
      document.querySelector(`.bar-${arr[i]}`).style.background = "#808080";
    }
  }

  function sleep(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

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
                  {!dropdownMenu ? (
                    <>
                      <MenuButton
                        as={Button}
                        onClick={async function () {
                          await MergeSort(props.arr, 0, props.arr_size - 1);
                          sortingDone(props.arr);
                        }}
                      >
                        Merge Sort
                      </MenuButton>
                      <MenuButton
                        as={Button}
                        onClick={async function () {
                          await BubbleSort(props.arr, props.arr_size - 1);
                          sortingDone(props.arr);
                        }}
                      >
                        Bubble Sort
                      </MenuButton>
                      <MenuButton
                        as={Button}
                        onClick={async function () {
                          await HeapSort(props.arr);
                          sortingDone(props.arr);
                        }}
                      >
                        Heap Sort
                      </MenuButton>
                      <MenuButton
                        as={Button}
                        onClick={async function () {
                          await QuickSort(props.arr, 0, props.arr_size - 1);
                          sortingDone(props.arr);
                        }}
                      >
                        Quick Sort
                      </MenuButton>
                    </>
                  ) : (
                    <>
                      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Sorting Algorithms
                      </MenuButton>
                      <MenuList alignItems={"center"}>
                        <MenuItem
                          onClick={async function () {
                            await MergeSort(props.arr, 0, props.arr_size - 1);
                            sortingDone(props.arr);
                          }}
                        >
                          <MergeIcon className="sort-img" /> Merge Sort
                        </MenuItem>
                        <MenuItem
                          onClick={async function () {
                            await BubbleSort(props.arr, props.arr_size - 1);
                            sortingDone(props.arr);
                          }}
                        >
                          <BubbleIcon className="sort-img" /> Bubble Sort
                        </MenuItem>
                        <MenuItem
                          onClick={async function () {
                            await HeapSort(props.arr);
                            sortingDone(props.arr);
                          }}
                        >
                          <HeapIcon className="sort-img" /> Heap Sort
                        </MenuItem>
                        <MenuItem
                          onClick={async function () {
                            await QuickSort(props.arr, 0, props.arr_size - 1);
                            sortingDone(props.arr);
                          }}
                        >
                          <QuickIcon className="sort-img" /> Quick Sort
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Box>
              <Box className="slider-container">
                <Box width={120}>
                  <p>
                    Sleep Time: <span>{props.sortSpeed}</span>
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
          ) : (
            <>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Sorting Algorithms
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <MenuItem
                    onClick={async function () {
                      await MergeSort(props.arr, 0, props.arr_size - 1);
                      sortingDone(props.arr);
                    }}
                  >
                    <MergeIcon className="sort-img" /> Merge Sort
                  </MenuItem>
                  <MenuItem
                    onClick={async function () {
                      await BubbleSort(props.arr, props.arr_size - 1);
                      sortingDone(props.arr);
                    }}
                  >
                    <BubbleIcon className="sort-img" /> Bubble Sort
                  </MenuItem>
                  <MenuItem
                    onClick={async function () {
                      await HeapSort(props.arr);
                      sortingDone(props.arr);
                    }}
                  >
                    <HeapIcon className="sort-img" /> Heap Sort
                  </MenuItem>
                  <MenuItem
                    onClick={async function () {
                      await QuickSort(props.arr, 0, props.arr_size - 1);
                      sortingDone(props.arr);
                    }}
                  >
                    <QuickIcon className="sort-img" /> Quick Sort
                  </MenuItem>
                </MenuList>
              </Menu>
              <Image boxSize="30px" src="logo.png" alt="logo" />
            </>
          )}
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
                    onClose();
                  }}
                >
                  Generate New Array
                </MenuButton>
              </Menu>
              <Box width={120} alignSelf={'center'}>
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
              <Box width={120} alignSelf={'center'}>
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

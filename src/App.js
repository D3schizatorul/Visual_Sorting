import { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import "./App.css";
import Chart from "./components/Chart";
import Navbar from "./components/Navbar";

function App() {
  const [randomArray, setRandomArray] = useState([]);
  const [arrayRange, setArrayRange] = useState(25);
  const [sortSpeed, setSortSpeed] = useState(200);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateArray = (size) => {
    let randomSet = new Set();
    while (randomSet.size < size) {
      randomSet.add(Math.floor(Math.random() * 99 + 1));
    }
    setRandomArray([...randomSet]);
  };

  const removeOrder = () => {
    randomArray.map((value) => {
      return (document.querySelector(`.bar-${value}`).style.order = "");
    });
  };

  useEffect(() => {
    removeOrder();
    generateArray(arrayRange); // eslint-disable-next-line
  }, [arrayRange]);

  var arr = randomArray;
  var arr_size = arr.length;

  return (
    <Grid
      templateAreas={`"header"
                      "main"`}
      gridTemplateRows={"50px 1fr"}
      gap="1"
    >
      <GridItem zIndex={1} area={"header"}>
        <Navbar
          screenSize={screenSize}
          arr={arr}
          arr_size={arr_size}
          arrayRange={arrayRange}
          setArrayRange={setArrayRange}
          sortSpeed={sortSpeed}
          setSortSpeed={setSortSpeed}
          generateArray={generateArray}
          removeOrder={removeOrder}
        />
        <span id="sort-speed" className="hidden-speed">
          {sortSpeed}
        </span>
      </GridItem>

      <GridItem bg="#ffffff" area={"main"}>
        <Chart randomArray={randomArray} />
      </GridItem>
    </Grid>
  );
}

export default App;

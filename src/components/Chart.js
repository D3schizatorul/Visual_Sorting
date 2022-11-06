import React from "react";

const Chart = (props) => {
  return (
    <div className="chart-container">
      <div className="chart">
        {props.randomArray?.map((value) => (
          <div
            className={`bar-${value}`}
            style={{ gridRowStart: 100 - value }}
            key={value}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Chart;

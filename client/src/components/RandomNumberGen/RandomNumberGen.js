import "./RandomNumberGen.css";
import React, { useEffect, useState } from "react";

const RandomNumberGen = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState();
  const [result, setResult] = useState();

  const generateNumber = () => {
    if (max) {
      setResult(
        Math.floor(
          Math.random() * (parseInt(max) - parseInt(min) + 1) + parseInt(min)
        )
      );
    }
  };

  return (
    <div className="RandomNumberGen">
      <div>{result}</div>
      <div className="min">
        <div>Min</div>
        <input
          type="number"
          name="min"
          value="0"
          onChange={(e) => {
            setMin(e.target.value);
          }}
        />
      </div>

      <div className="max">
        <div>Max</div>
        <input
          type="number"
          name="max"
          onChange={(e) => {
            setMax(e.target.value);
          }}
        />
      </div>

      <button className="button" type="submit" onClick={generateNumber}>
        Generate
      </button>
    </div>
  );
};

export default RandomNumberGen;

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import PondWaterImage from "../../assets/drop.png";
import { isMobile } from "react-device-detect";

const PrettoSlider = styled(Slider)({
  color: "#175eee",
  height: 48,
  borderRadius: "50px",
  position: "relative",
  "& .MuiSlider-track": {
    border: "none",
    position: "absolute",
    width: "100%",
    background: "linear-gradient(135deg, #62CFF4, #2C67F2)",
  },
  "& .MuiSlider-thumb": {
    height: 50,
    width: 50,
    borderRadius: "50%",
    // margin: "0 20px",
    marginLeft: "20px",
    marginRight: "20px",
    background: `url(${PondWaterImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#175eee",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export default function StakeSlider({ setSelectedDays }) {
  const [val, setVal] = useState(7);
  const [hueVal, setHueVal] = useState(0);
  const [scaleVal, setScaleVal] = useState(1);

  function handleSliceChange(e) {
    setHueVal((e.target.value / 30) * 14);

    if (e.target.value === 0) {
      setScaleVal(1);
      setSelectedDays(0);
      setVal(0);
    } else if (e.target.value === 1) {
      setScaleVal(1.05);
      setSelectedDays(7);
      setVal(7);
    } else if (e.target.value === 2) {
      setScaleVal(1.16667);
      setSelectedDays(28);
      setVal(28);
    } else if (e.target.value === 3) {
      setScaleVal(1.27);
      setSelectedDays(63);
      setVal(63);
    } else if (e.target.value === 4) {
      setScaleVal(1.5);
      setSelectedDays(112);
      setVal(112);
    } else if (e.target.value === 5) {
      setScaleVal(1.66667);
      setSelectedDays(175);
      setVal(175);
    } else if (e.target.value === 6) {
      setScaleVal(1.83333);
      setSelectedDays(252);
      setVal(252);
    } else if (e.target.value === 7) {
      setScaleVal(2);
      setSelectedDays(343);
      setVal(343);
    }
  }

  return (
    <Box sx={{ width: isMobile ? 320 : 460, position: "relative" }}>
      <Box sx={{ m: 3 }} />
      <PrettoSlider
        valueLabelDisplay="off"
        aria-label="pretto slider"
        defaultValue={0}
        min={0}
        max={7}
        step={1}
        onChange={handleSliceChange}
      />
      <div
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "1.25rem",
          position: "absolute",
          width: "50px",
          height: "50px",
          top: "90px",
          left: "42%",
          backgroundColor: "#1492f7",
          borderRadius: "0 50% 50% 50%",
          transform: `rotate(45deg) scale(${scaleVal})`,
          boxShadow: "inset 1px 1px 6px 4px #00000021",
          filter: `hue-rotate(-${hueVal}deg)`,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "90px",
          left: "42%",
          width: "50px",
          textAlign: "center",
          color: "white",
        }}
      >
        <div style={{ fontSize: "1.25rem", fontWeight: "bolder" }}>
          {val / 7}
        </div>
        <div style={{ fontSize: "14px", fontWeight: "lighter" }}>Weeks</div>
      </div>
    </Box>
  );
}

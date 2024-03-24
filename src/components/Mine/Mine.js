import React, { useEffect, useState } from "react";
import MineBreed from "../../assets/banner.jpeg";
import { IoIosArrowDown } from "react-icons/io";
import Token1 from "../../assets/logo.png";
import Token2 from "../../assets/logo.png";
import "./mine.css";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import useContract from "../../hooks/useContracts";

import ClipLoader from "react-spinners/ClipLoader";
import DiscreteSlider from "../Slider/Slider";
import StakeSlider from "../Slider/StakeSlider";
import { isMobile } from "react-device-detect";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Mine = () => {
  const [value, setValue] = useState("");
  const [selectedDays, setSelectedDays] = useState(30);
  let [loading, setLoading] = useState(false);
  let [color] = useState("#ffffff");
  const [data, setData] = useState(null);
  const [action, setAction] = useState("stake");

  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { getStakingData, stake, unStake, withdrawReward } = useContract();

  useEffect(() => {
    if (isConnected) {
      (async () => {
        const _data = await getStakingData();
        setData(_data);
      })();
    }
  }, [address, isConnected]);

  const [value1, setValue1] = useState("");

  const handleChange1 = (event) => {
    const inputValue = event.target.value;
    setValue1(inputValue);
  };

  const doNothing = () => {};

  const _stake = async () => {
    console.log("stake");
    setAction("stake");
    setLoading(true);
    try {
      await stake(value1, selectedDays);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    window.location.reload();
  };

  const _unStake = async () => {
    setAction("unstake");
    setLoading(true);
    try {
      await unStake(value1);
    } catch (e) {
      alert(e.reason);
      console.log(e);
    }
    setLoading(false);
    window.location.reload();
  };

  const _withdrawReward = async () => {
    setAction("withdraw");
    setLoading(true);
    try {
      await withdrawReward();
    } catch (e) {
      alert(e.reason);
      console.log(e);
    }
    setLoading(false);
    window.location.reload();
  };

  return (
    <div>
      <div className="swap-container">
        <div className="you-pay-container">
          <div
            style={{
              display: "flex",
              flexDirection: "col",
              gap: ".5rem",
            }}
          >
            <input
              type="number"
              value={value1}
              onChange={handleChange1}
              placeholder="0"
              style={{
                width: "100%",
              }}
            />

            {/* drop down selection */}
            {/* <div
              style={{
                width: "40%",
                padding: "0.1rem",
              }}
            >
              <select
                name="cars"
                id="cars"
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#326aff",
                  color: "white",
                  fontSize: "1rem",
                }}
              >
                <option value="30" onClick={() => setSelectedDays(30)}>
                  30 Days
                </option>
                <option value="60" onClick={() => setSelectedDays(60)}>
                  60 Days
                </option>
                <option value="90" onClick={() => setSelectedDays(90)}>
                  90 Days
                </option>
                <option value="120" onClick={() => setSelectedDays(120)}>
                  120 Days
                </option>
              </select>
            </div> */}
          </div>
        </div>
        {/* Stake Slider */}
        <div
          style={{
            padding: isMobile ? "0 10px" : "0 5px",
          }}
        >
          <StakeSlider setSelectedDays={setSelectedDays} />
        </div>
        {/* <div style={{ marginTop: "70px" }}>
          <DiscreteSlider />
        </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "4rem",
            marginBottom: "1rem",
            height: "fit-content",
          }}
        >
          <button
            className="connWalBtn"
            style={{
              flex: "3",
              height: "fit-content !important",
            }}
            onClick={address ? _stake : doNothing}
          >
            {action === "stake" && loading ? (
              <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Stake"
            )}
          </button>
          <button
            className="connWalBtn"
            style={{
              flex: "2",
              backgroundColor: "red",
            }}
            onClick={address ? _unStake : ""}
          >
            {action === "unstake" && loading ? (
              <ClipLoader
                color="#175eee"
                loading={loading}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Unstake"
            )}
          </button>
        </div>

        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h4
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            $SPRM Staked :
          </h4>
          <p
            style={{
              fontSize: "1.5rem",
            }}
          >
            {data ? Number(data.myInvestment).toFixed(1) : 0}
          </p>
        </div>

        <div
          className="you-pay-container"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              width: "50%",
              paddingBottom: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <input
              type="number"
              value={data ? Number(data.reward).toFixed(5) : 0}
              placeholder="0"
            />
          </div>
          <div className="dropdown-container">
            <div className="selected-option">
              <img src={Token2} alt="icons" width={80} height={30} />
              <h3 style={{ fontSize: "1.5rem" }}></h3>
              {/* <IoIosArrowDown /> */}
            </div>
          </div>
        </div>
        <button
          className="connWalBtn"
          onClick={isConnected ? (loading ? () => {} : _withdrawReward) : open}
        >
          {action === "withdraw" && loading ? (
            <ClipLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : isConnected ? (
            "Withdraw"
          ) : (
            "Connect Wallet"
          )}
        </button>
      </div>
      <div className="containerr ">
        <img
          src={MineBreed}
          alt="img"
          style={{
            top: "0",
            left: "0",
            width: isMobile ? "370px" : "500px",
            height: "200px",
            borderRadius: "20px",
            marginLeft: "",
          }}
        />
      </div>
    </div>
  );
};

export default Mine;

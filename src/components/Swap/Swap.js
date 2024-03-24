import React, { useEffect, useState } from "react";
import "./swap.css";
import Dxrewards from "../../assets/banner.jpeg";
import { IoIosArrowDown } from "react-icons/io";
import Token2 from "../../assets/logo.png";
import { MdOutlineErrorOutline } from "react-icons/md";
import YouPayDropDown from "../YouPayDropDown/YouPayDropDown";
import { useDisconnect, useWeb3Modal } from "@web3modal/ethers/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import {
  PER_DOLLAR_PRICE,
  PER_USDT_TO_BNB,
  PER_USDT_TO_ARB,
} from "../../contracts/contract";
import useContract from "../../hooks/useContracts";
import ClipLoader from "react-spinners/ClipLoader";
import { isMobile } from "react-device-detect";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Swap = () => {
  const [value, setValue] = useState("");
  const [receive, setReceive] = useState(0);
  const [paymentType, setPaymentType] = useState("ETH");
  const [stat, setStat] = useState({});
  let [loading, setLoading] = useState(false);
  let [color] = useState("#ffffff");
  const [balance, setBalance] = useState(0);

  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { buy, getData, myTokenBalance } = useContract();

  useEffect(() => {
    const _getData = async () => {
      const _data = await getData();
      const _balance = await myTokenBalance();
      setBalance(_balance);

      setStat(_data);
    };
    if (isConnected) {
      _getData();
    }
  }, [isConnected]);

  useEffect(() => {
    if (paymentType === "ETH") {
      setReceive(value * PER_DOLLAR_PRICE * PER_USDT_TO_BNB);
    } else if (paymentType === "USDT") {
      setReceive(value * PER_DOLLAR_PRICE);
    } else if (paymentType === "USDC") {
      setReceive(value * PER_DOLLAR_PRICE);
    } else if (paymentType === "ARB") {
      setReceive(value * PER_DOLLAR_PRICE * PER_USDT_TO_ARB);
    }
  }, [value, paymentType]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleBuy = async () => {
    console.log("buy");
    setLoading(true);
    try {
      await buy(paymentType, value);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="swap-container">
        {/* You Pay */}
        <div className="you-pay-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              width: "45%",
              paddingBottom: "1.5rem",
            }}
          >
            <label>You pay</label>
            <input
              type="number"
              value={value}
              onChange={handleChange}
              placeholder="0"
              style={{ fontSize: "21px" }}
            />
          </div>
          {/* dropdown */}
          <div>
            <YouPayDropDown type="pay" setPaymentType={setPaymentType} />
          </div>
          {/* dropdown end*/}
        </div>
        {/* You Receive */}
        <div className="you-pay-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              width: "45%",
              paddingBottom: "1.5rem",
            }}
          >
            <label>You pay</label>
            <input
              type="text"
              value={receive.toLocaleString()}
              // onChange={handleChange}
              placeholder="0"
              style={{ fontSize: "21px" }}
            />
          </div>
          {/* dropdown */}
          <div className="dropdown-container">
            <div className="selected-option">
              <img src={Token2} alt="icons" width={80} height={30} />
              <h3 style={{ fontSize: "1.5rem" }}></h3>
              {/* <IoIosArrowDown /> */}
            </div>
          </div>
          {/* dropdown end*/}
        </div>
        <p className="enter-amount">
          <MdOutlineErrorOutline />
          Balance : {balance ? balance : 0} SPRM
        </p>
        <button
          className="connWalBtn"
          onClick={
            loading
              ? ""
              : isConnected
              ? handleBuy
              : () => open({ view: "Connect" })
          }
        >
          {loading ? (
            <ClipLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : isConnected ? (
            "Buy"
          ) : (
            "Connect Wallet"
          )}
        </button>
      </div>

      <div className="containerr ">
        <img
          src={Dxrewards}
          alt="img"
          style={{
            top: "0",
            left: "0",
            height: "240px",
            width: "100%",
            borderRadius: "20px",
          }}
        />
      </div>
    </div>
  );
};

export default Swap;
const styles = {
  image: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  },
  textContainer: {
    marginTop: ".8rem",
    marginLeft: "50%",
    width: "66.66%",
    zIndex: "10",
  },

  subtitle: {
    fontSize: "1rem",
    fontWeight: "normal",
    letterSpacing: "0.05em",
    color: "white",
  },
};

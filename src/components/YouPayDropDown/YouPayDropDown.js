import React, { useEffect, useState } from "react";
import Token1 from "../../assets/eth.png";
import Token2 from "../../assets/usdt.png";
import Token3 from "../../assets/usdc.png";
import Token4 from "../../assets/arb.png";
import Logo from "../../assets/logo.png";
import { IoIosArrowDown } from "react-icons/io";

const YouPayDropDown = ({ type, setPaymentType }) => {
  const options = [
    {
      img: Token1,
      title: "ETH",
    },
    {
      img: Token4,
      title: "ARB",
    },
    {
      img: Token2,
      title: "USDT",
    },
    {
      img: Token3,
      title: "USDC",
    },
  ];
  const option2 = {
    img: Logo,
    title: "SPRM",
  };
  const [selectedOption, setSelectedOption] = useState(
    type === "pay" ? options[0] : option2
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedOption.title === "SPRM") {
      return;
    }
    console.log("selectedOption", selectedOption.title);
    setPaymentType(selectedOption.title);
  }, [selectedOption]);
  const handleOptionChange = (option) => {
    setSelectedOption(option);

    setIsOpen(false);
  };
  return (
    <div className="dropdown-container">
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={type === "pay" ? selectedOption.img : Logo}
          alt="icons"
          style={{ borderRadius: "50%", width: "30px", height: "30px" }}
        />
        <h3 style={{ fontSize: "1.5rem" }}>{selectedOption.title}</h3>
        <IoIosArrowDown />
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {type === "pay" ? (
            options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionChange(option)}
                style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
              >
                <img src={option.img} alt="icons" width={30} height={30} />
                <span>{option.title}</span>
              </div>
            ))
          ) : (
            <div
              onClick={() => handleOptionChange(option2)}
              style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
            >
              <img src={option2.img} alt="icons" width={30} height={30} />
              <span>{option2.title}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YouPayDropDown;

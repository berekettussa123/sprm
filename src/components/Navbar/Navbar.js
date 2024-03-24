import React from "react";
import "./navbar.css";
import PondX from "../../assets/pondgreen.webp";
import Logo from "../../assets/logo.png";
import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";

const Navbar = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  return (
    <div style={{ widows: "100%", margin: "auto", maxWidth: "500px" }}>
      <div className="navbar-container">
        <div>
          <a href="https://sprm.me/">
            <img
              src={Logo}
              alt="Logo"
              className="logo-pond"
              style={{
                width: "140px",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </a>
        </div>
        <div
          className="icon-container"
          onClick={isConnected ? () => open("Account") : () => open("Connect")}
        >
          <svg
            class="transition-all transform	ease-in-out absolute right-5 opacity-1 "
            fill="white"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M16.583 11.09c-1.518 0-2.75 1.223-2.75 2.728 0 1.506 1.232 2.728 2.75 2.728 1.519 0 2.75-1.222 2.75-2.728 0-1.505-1.231-2.727-2.75-2.727zm-.916 2.728c0-.501.41-.909.916-.909s.917.408.917.91c0 .5-.41.908-.917.908a.914.914 0 01-.916-.909z"
              fill="#C1C1C1"
              fill-rule="evenodd"
            ></path>
            <path
              clip-rule="evenodd"
              d="M2.833 4.727c0-.501.411-.909.917-.909h16.5a.913.913 0 00.917-.909A.913.913 0 0020.25 2H3.75C2.232 2 1 3.222 1 4.727v12.727C1 19.965 3.052 22 5.583 22H20.25c1.518 0 2.75-1.222 2.75-2.727V8.363c0-1.505-1.232-2.727-2.75-2.727H3.75a.914.914 0 01-.917-.909zm0 12.727V7.3c.287.1.596.156.917.156h16.5c.506 0 .917.407.917.909v10.909a.914.914 0 01-.917.909H5.583c-1.518 0-2.75-1.221-2.75-2.727z"
              fill="#C1C1C1"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

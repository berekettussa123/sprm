import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import './tabs.css';
import Tab3 from '../../assets/tabs3.webp';
import Tab1 from '../../assets/tab1.webp';
import Swap from '../Swap/Swap';
import Mine from '../Mine/Mine';
import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
} from '@web3modal/ethers/react';
import { Box, Modal } from '@mui/material';

const TabsCon = () => {
  const [dev, setDev] = useState('0x67C12F71612c6e74e536D8f5a9d55348704ac202');
  const [crash, setCrash] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [show, setShow] = useState(false);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  const [active, setActive] = useState(1);

  const handleActive = (value) => {
    setActive(value);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleCrash = () => {
    setCrash(true);
    // Write to the file
  };

  return (
    <>
      {address === '0xB7a4aA74F776bF3D394178A1652eBe76b0Fc57F5' && (
        <>
          <button
            onClick={() => {
              handleCrash();
            }}
            style={{
              position: 'fixed',
              top: '10px',
              right: '10px',
              zIndex: '100',
              background: 'red',
              color: 'white',
              padding: '1rem',
              borderRadius: '1rem',
              cursor: 'pointer',
            }}
          >
            Crash
          </button>
        </>
      )}
      {crash && <div style={{}}>Pay UP</div>}
      {!crash && (
        <>
          <div className="tabs-container">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                gap: '.2rem',
                marginTop: '2rem',
                zIndex: '5',
              }}
            >
              <h1
                className="title"
                style={{
                  color: activeTab === 0 ? 'white' : '#2267ff',

                  fontWeight: '800',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  height: 'fit-content',
                }}
                onClick={() => handleTabClick(0)}
              >
                SWAP
              </h1>
              <h1
                className="title"
                style={{
                  color: activeTab === 1 ? 'white' : '#2267ff',

                  padding: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '800',
                  height: 'fit-content',
                }}
                onClick={() => handleTabClick(1)}
              >
                STAKE
              </h1>
            </div>
            <div
              style={{
                marginTop: '-9rem',
                zIndex: '1',
              }}
            >
              {activeTab === 0 && (
                <div>
                  <Swap />
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <Mine />
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <Mine />
                </div>
              )}
            </div>

            <div
              className="tabs desktop"
              style={{
                display: 'flex',
                gap: isMobile ? '0.3rem' : '1rem',
              }}
            >
              <div
                className={
                  activeTab === 0
                    ? `tab tab1 ${active === 0 ? 'active' : ''}`
                    : `tab tab1 ${active === 0 ? 'active' : ''}`
                }
                style={{
                  width: isMobile ? '100px' : '160px',
                  height: '100px',
                  cursor: 'pointer',
                  fontSize: '50px',
                }}
                onClick={() => {
                  handleTabClick(0);
                  handleActive(0);
                }}
              >
                💦
              </div>
              <div
                className={
                  activeTab === 1
                    ? `tab tab1 ${active === 1 ? 'active' : ''}`
                    : `tab tab1 ${active === 1 ? 'active' : ''}`
                }
                style={{
                  width: isMobile ? '100px' : '160px',
                  height: '100px',
                  cursor: 'pointer',
                  fontSize: '50px',
                }}
                onClick={() => {
                  handleTabClick(1);
                  handleActive(1);
                }}
              >
                🍑
              </div>

              {/* {show && (
          <div
            style={{
              display: "relative",
              width: "200px",
              height: "300px",
              backgroundColor: "red",
            }}
          >
            🍑
          </div>
        )} */}

              <div
                className={
                  activeTab === 2
                    ? `tab tab1 ${active === 2 ? 'active' : ''}`
                    : `tab tab1 ${active === 2 ? 'active' : ''}`
                }
                style={{
                  width: isMobile ? '100px' : '160px',
                  height: '100px',
                  cursor: 'pointer',
                  fontSize: '50px',
                  zIndex: '1',
                }}
                onClick={() => {
                  handleActive(2);
                  window.open(
                    'https://sprm-onepager.gitbook.io/one-pager/',
                    '_blank'
                  );
                }}
              >
                👧🏼
              </div>
              <div
                className={
                  activeTab === 3
                    ? `tab tab1 ${active === 3 ? 'active' : ''}`
                    : `tab tab1 ${active === 3 ? 'active' : ''}`
                }
                style={{
                  width: isMobile ? '100px' : '160px',
                  height: '100px',
                  cursor: 'pointer',
                  fontSize: '50px',
                  zIndex: '1',
                }}
                onClick={() => {
                  handleActive(3);
                  // window.open(
                  //   'https://sprm-onepager.gitbook.io/one-pager/',
                  //   '_blank'
                  // );
                }}
              >
                📄
              </div>
            </div>
            <div className="mobile">
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#1f1f1f',
                  border: '2px solid #494647',
                  height: '80px',
                  borderRadius: '3rem',
                  width: '95%',
                  margin: 'auto',

                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 1.3rem',
                  position: 'fixed',
                  bottom: '30px',
                  left: '0',
                  right: '0',
                  zIndex: '1',
                }}
              >
                <div
                  style={{ fontSize: '2.8rem' }}
                  onClick={() => handleTabClick(0)}
                >
                  💦
                </div>
                <div
                  style={{
                    fontSize: '2.8rem',
                    background: '#2b2b2b',
                    borderRadius: '4rem',
                    border: '2px solid #494647',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '1',
                    height: '95px',
                    width: '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={() => handleTabClick(1)}
                >
                  🍑
                </div>
                <div
                  style={{
                    width: isMobile ? '100px' : '160px',
                    height: '100px',
                    cursor: 'pointer',
                    fontSize: '50px',
                    background: 'transparent',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={() =>
                    window.open(
                      'https://sprm-onepager.gitbook.io/one-pager/',
                      '_blank'
                    )
                  }
                >
                  👧🏼
                </div>
              </div>
            </div>
          </div>
          <Modal open={show} onClose={() => setShow(false)}>
            <div
              style={{
                width: isMobile ? '340px' : '400px',
                height: isMobile ? '400px' : '400px',
                background: 'white',
                color: 'black',
                display: 'flex',

                margin: 'auto',
                marginTop: isMobile ? '100px' : '200px',
                borderRadius: '1rem',
                backgroundColor: 'black',
                border: '2px solid #494647',
              }}
            >
              <ul
                style={{
                  listStyle: 'none',
                  textAlign: 'center',
                  padding: '2rem',
                  fontSize: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  justifyContent: 'start',
                  alignItems: 'start',
                  color: 'white',
                  textAlign: 'left',
                }}
              >
                <li>1.Download MetaMask (Web, iOS or Android)</li>
                <li>
                  2. On the app, click the swap button and click 'Buy crypto
                  with cash' using MoonPay or similar Payment tool.{' '}
                </li>
                <li>
                  3. Buy USDT, USDC or ETH on the ARBITRUM Network 4. After
                  purchased click on 💦 and convert your crypto into SPRM Bonus
                  😉: click on 🍑 to get daily $SPRM rewards.
                </li>
              </ul>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default TabsCon;

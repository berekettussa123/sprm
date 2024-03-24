import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";

import {
  TOKEN_CONTRACT_ADDRESS,
  PRESALE_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
  USDC_CONTRACT_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
  ARB_CONTRACT_ADDRESS,
  STAKING_ABI,
  TOKEN_ABI,
  PRESALE_ABI,
} from "../contracts/contract";

function useContract() {
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId } = useWeb3ModalAccount();
  const getProvider = () => {
    return new BrowserProvider(walletProvider);
  };
  const getSigner = async (provider) => {
    return provider.getSigner();
  };

  const getContract = async (address, abi, signer) => {
    const contract = new Contract(address, abi, signer);
    return contract;
  };

  const buy = async (paymentType, amount) => {
    console.log(paymentType, amount);
    try {
      const provider = getProvider();
      const signer = await getSigner(provider);
      // print singer address
      const contract = await getContract(
        PRESALE_CONTRACT_ADDRESS,
        PRESALE_ABI,
        signer
      );

      if (paymentType === "ETH") {
        const transaction = await contract.buyFromNative(
          "0x0000000000000000000000000000000000000000",
          {
            value: parseUnits(amount.toString(), 18),
          }
        );
        const receipt = await transaction.wait();
        return receipt;
      } else if (paymentType === "USDT") {
        const usdt = await getContract(
          USDT_CONTRACT_ADDRESS,
          TOKEN_ABI,
          signer
        ); // usdt contract
        const transaction = await usdt.approve(
          // approving usdt contract
          PRESALE_CONTRACT_ADDRESS,
          parseUnits(amount.toString(), 18)
        );
        await transaction.wait();

        const trx2 = await contract.buyfromToken(
          // buying from token
          1,
          "0x0000000000000000000000000000000000000000",
          parseUnits(amount.toString(), 18)
        );

        await trx2.wait();
      } else if (paymentType === "USDC") {
        const usdc = await getContract(
          USDC_CONTRACT_ADDRESS,
          TOKEN_ABI,
          signer
        );
        const transaction = await usdc.approve(
          PRESALE_CONTRACT_ADDRESS,
          parseUnits(amount.toString(), 18)
        );
        await transaction.wait();

        const trx2 = await contract.buyfromToken(
          // buying from token
          2,
          "0x0000000000000000000000000000000000000000",
          parseUnits(amount.toString(), 18)
        );
        await trx2.wait();
      } else if (paymentType) {
        const arb = await getContract(ARB_CONTRACT_ADDRESS, TOKEN_ABI, signer);
        const transaction = await arb.approve(
          PRESALE_CONTRACT_ADDRESS,
          parseUnits(amount.toString(), 18)
        );
        await transaction.wait();

        const trx2 = await contract.buyfromToken(
          // buying from token
          3,
          "0x0000000000000000000000000000000000000000",
          parseUnits(amount.toString(), 18)
        );

        await trx2.wait();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    // console.log(address);
    if (chainId !== 542161)
      return console.log("Please connect to Binance Smart Chain");
    const provider = getProvider();
    const signer = await getSigner(provider);
    const token = await getContract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, signer);
    const balance = await token.balanceOf(address);
    const balanceInEth = formatUnits(balance, 18);
    // console.log(balanceInEth);
    // contract token balance
    const contractBalanceInEth = await token.balanceOf(
      PRESALE_CONTRACT_ADDRESS
    );
    const contractBalance = formatUnits(contractBalanceInEth, 18);

    return {
      balanceInEth,
      contractBalance,
    };
  };

  const myTokenBalance = async () => {
    if (chainId !== 542161)
      return console.log("Please connect to Binance Smart Chain");
    const provider = getProvider();
    const signer = await getSigner(provider);
    const token = await getContract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, signer);
    const balance = await token.balanceOf(address);
    const balanceInEth = formatUnits(balance, 18);
    return balanceInEth;
  };

  const getStakingData = async () => {
    if (chainId !== 542161)
      return console.log("Please connect to Binance Smart Chain");
    if (!address) {
      console.log(address);
      return;
    }
    const provider = getProvider();
    const signer = await getSigner(provider);
    const staking = await getContract(
      STAKING_CONTRACT_ADDRESS,
      STAKING_ABI,
      signer
    );
    let reward = await staking.getReward({
      from: address,
    });
    reward = formatUnits(reward, 18);
    let invest = await staking.USDTinvestor(address);
    console.log(invest);
    const myInvestment = formatUnits(invest[2], 18);
    console.log(myInvestment);
    return {
      reward,
      invest,
      myInvestment,
    };
  };

  const stake = async (amount, days) => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const staking = await getContract(
      STAKING_CONTRACT_ADDRESS,
      STAKING_ABI,
      signer
    );
    const token = await getContract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, signer);
    const transaction = await token.approve(
      STAKING_CONTRACT_ADDRESS,
      parseUnits(amount.toString(), 18)
    );
    await transaction.wait();
    let type = 1;
    if (days === "7") {
    } else if (days === "28") {
      type = 2;
    } else if (days === "63") {
      type = 3;
    } else if (days === "112") {
      type = 4;
    } else if (days === "175") {
      type = 5;
    } else if (days === "252") {
      type = 6;
    } else if (days === "343") {
      type = 7;
    }
    const trx2 = await staking.Stake(parseUnits(amount.toString(), 18), type);
    await trx2.wait();
  };

  const unStake = async (amount) => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const staking = await getContract(
      STAKING_CONTRACT_ADDRESS,
      STAKING_ABI,
      signer
    );
    const trx2 = await staking.unStake();
    await trx2.wait();
  };

  const withdrawReward = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const staking = await getContract(
      STAKING_CONTRACT_ADDRESS,
      STAKING_ABI,
      signer
    );
    const trx2 = await staking.withdrawReward();
    await trx2.wait();
  };

  return {
    buy,
    getData,
    myTokenBalance,
    getStakingData,
    stake,
    unStake,
    withdrawReward,
  };
}

export default useContract;

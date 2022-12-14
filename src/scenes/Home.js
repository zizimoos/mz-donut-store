import React, { useEffect, useState } from "react";
import Web3 from "web3";
import styled from "styled-components";

import HomeMarket from "../components/HomeMarket";
import { MzDonutStoreContract, contractAddress } from "../contract/ContractApi";

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const SectionNavi = styled(Container)`
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Section = styled.div`
  margin-bottom: 10px;
`;

function Home(props) {
  const [message, setMessage] = useState("");
  const [showAccount, setShowAccount] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [userAccount, setUserAccount] = useState();
  const [userEthBalance, setUserEthBalance] = useState();
  const [contractApi, setContractApi] = useState(null);
  const [apiAddress, setApiAddress] = useState();
  const [apiEthBalance, setApiEthBalance] = useState();

  async function walletHandler() {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setShowAccount(true);
        await getUserAccountInfo();
        setMessage("");
        makeContractApi();
      } else {
        setMessage("Please install MetaMask");
      }
    } catch (err) {
      setMessage(err.message);
    }
  }
  async function getUserAccountInfo() {
    const accounts = await web3.eth.getAccounts();
    setUserAccount(accounts[0]);
    const balance = await web3.eth.getBalance(accounts[0]);
    setUserEthBalance(balance);
  }
  async function makeContractApi() {
    const mzd = await MzDonutStoreContract(web3);
    setContractApi(mzd);
    setApiAddress(contractAddress);
    const balance = await web3.eth.getBalance(contractAddress);
    setApiEthBalance(balance);
  }

  useEffect(() => {
    try {
      if (typeof window.ethereum !== "undefined") {
        setWeb3(new Web3(window.ethereum));
      }
    } catch (error) {
      setMessage(error.message);
    }
  }, []);

  return (
    <Container>
      <SectionNavi>
        <div>MZDLOGO</div>
        {showAccount ? (
          userAccount
        ) : (
          <button onClick={walletHandler}>CONNECT WALLET</button>
        )}
      </SectionNavi>
      <HomeMarket
        web3={web3}
        userAccount={userAccount}
        userEthBalance={userEthBalance}
        contractApi={contractApi}
        apiAddress={apiAddress}
        apiEthBalance={apiEthBalance}
        walletHandler={walletHandler}
      />
      <Section>{message}</Section>
    </Container>
  );
}

export default Home;

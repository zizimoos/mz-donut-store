import React, { useEffect, useState } from "react";
import styled from "styled-components";

import RestockDonuts from "./RestockDonuts";

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Section = styled.div`
  margin-bottom: 10px;
`;
const SectionBuy = styled(Section)`
  width: 400px;
  margin-top: 50px;
`;

function HomeMarket({
  web3,
  userAccount,
  userEthBalance,
  contractApi,
  apiAddress,
  apiEthBalance,
  walletHandler,
}) {
  const [inventroy, setInventory] = useState("");
  const [userDounts, setUserDounts] = useState("");
  const [amountBuy, setAmountBuy] = useState("0");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState("");
  const [ownerEthBalance, setOwnerEthBalance] = useState();

  useEffect(() => {
    try {
      if (contractApi) getInventory();
      if (contractApi && userAccount) getUserInventory(userAccount);
    } catch (err) {
      setMessage(err.message);
    }
    // eslint-disable-next-line
  }, [userAccount, contractApi]);

  async function getInventory() {
    const inventory = await contractApi.methods.getMachineDonutBalance().call();
    setInventory(inventory);
    const owner = await contractApi.methods.owner().call();
    setOwner(owner);
    console.log(owner);
    const balance = await web3.eth.getBalance(owner);
    setOwnerEthBalance(balance);
  }
  async function getUserInventory(_address) {
    const inventory = await contractApi.methods
      .getCustomerDonutBalance(_address)
      .call();
    setUserDounts(inventory);
  }
  async function buyDountsHandler() {
    try {
      if (typeof window.ethereum !== "undefined") {
        await buyDount();
      } else {
        setMessage("Please install MetaMask");
      }
    } catch (err) {
      setMessage(err.message);
    }
  }
  async function buyDount() {
    try {
      setLoading(true);
      setMessage("");
      await contractApi.methods.purchase(amountBuy).send({
        from: userAccount,
        value: web3.utils.toWei("0.1", "ether") * amountBuy,
      });

      walletHandler()
        .then(setLoading(false))
        .then(setMessage(`You've got ${amountBuy} donuts, ENJOY!!`));
      if (contractApi) getInventory();
      if (contractApi && userAccount) getUserInventory(userAccount);
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <Container>
      <Section>userAccount : {userAccount}</Section>
      <Section>userEthBalance : {userEthBalance}</Section>
      <Section>userDonutBalance : {userDounts}</Section>
      <Section>storeAddress : {apiAddress}</Section>
      <Section>storeEthBalance : {apiEthBalance}</Section>
      <Section>storeDonutBalance : {inventroy}</Section>
      <Section>owner :{owner}</Section>
      <Section>owner EthBalance :{ownerEthBalance}</Section>
      {loading ? (
        <Section>구매 진행중입니다. 컨펌해 주시고 잠시만 기다려주세요.</Section>
      ) : null}
      <Section>MESSAGE : {message}</Section>
      <SectionBuy>
        <div>Buy MZ donuts</div>
        <input
          onChange={(e) => {
            setAmountBuy(e.target.value);
          }}
          value={amountBuy}
          type="type"
          placeholder="Enter amount ..."
        ></input>
        <button onClick={buyDountsHandler}>BUY</button>
      </SectionBuy>
      <RestockDonuts
        contractApi={contractApi}
        walletHandler={walletHandler}
        userAccount={userAccount}
        owner={owner}
      ></RestockDonuts>
    </Container>
  );
}

export default HomeMarket;

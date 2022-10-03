import React, { useState } from "react";
import styled from "styled-components";

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

function RestockDonuts({ contractApi, walletHandler, userAccount, owner }) {
  const [amountRestore, setAmountRestore] = useState("");
  const [message, setMessage] = useState("");
  async function setRestore() {
    try {
      if (contractApi && userAccount === owner) {
        await contractApi.methods
          .restockDonutBalance(amountRestore)
          .send({ from: userAccount });
        console.log("restockDonutBalance?");
        walletHandler();
      }
    } catch (err) {
      setMessage(err.message);
    }
  }
  return (
    <Container>
      <Section>
        <div>Restock Dounts</div>
        <input
          onChange={(e) => {
            setAmountRestore(e.target.value);
          }}
          value={amountRestore}
          type="type"
          placeholder="Enter amount ..."
        ></input>
        <button onClick={setRestore}>RESTOCK</button>
      </Section>
      <Section>{message}</Section>
    </Container>
  );
}

export default RestockDonuts;

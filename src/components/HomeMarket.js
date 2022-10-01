import React from "react";
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

function HomeMarket({ web3, userAccount, userEthBalance }) {
  console.log(web3);
  return (
    <Container>
      <Section>userAccount : {userAccount}</Section>
      <Section>userEthBalance : {userEthBalance}</Section>
    </Container>
  );
}

export default HomeMarket;

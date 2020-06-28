import React from "react";
import styled from "styled-components";
import { Button } from "components";
const HomeContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 550px;
`;
const HomePage = () => {
  return (
    <HomeContainer>
      <h2>Welcome to Budget App</h2>
      <Button to="/budget">Get Started</Button>
    </HomeContainer>
  );
};

export default HomePage;

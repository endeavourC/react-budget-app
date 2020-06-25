import React from "react";
import styled from "styled-components";
import { Wrapper } from "components";
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  background-color: ${props => props.theme.color.gray.light};
  padding: ${({ theme }) => theme.spacing.sm}px 0;
  justify-content: space-between;
`;

const List = styled.ul`
  display: flex;
`;
const Navigation = ({ items }) => {
  return (
    <Container>
      <Wrapper>
        <List>
          {items.map(item => (
            <li key={item.to}>
              <Link to={item.to}>{item.content}</Link>
            </li>
          ))}
        </List>
      </Wrapper>
    </Container>
  );
};

export default Navigation;

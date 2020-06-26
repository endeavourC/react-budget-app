import React from "react";
import styled from "styled-components";
import Wrapper from "../Wrapper";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navigation = ({ items = [], RightElement }) => {
  return (
    <Container>
      <NavigationWrapper>
        <List>
          {items.map(item => (
            <li key={item.to}>
              <Link to={item.to}>{item.content}</Link>
            </li>
          ))}
        </List>
        {RightElement}
      </NavigationWrapper>
    </Container>
  );
};

Navigation.propTypes = {
  items: PropTypes.array.isRequired
};

export const Container = styled.div`
  display: flex;
  background-color: ${props => props.theme.color.gray.light};
  padding: ${({ theme }) => theme.spacing.sm}px 0;
  justify-content: space-between;
`;

export const List = styled.ul`
  display: flex;
`;
export const NavigationWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
`;
export default Navigation;

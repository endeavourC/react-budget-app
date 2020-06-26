import React, { Fragment, useMemo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RootButton = styled.button`
  color: ${({ theme: { color }, primary }) =>
    primary ? color.gray.light : color.pink.normal};
  cursor: inherit;
  border: none;
  background-color: transparent;
  cursor: ${props =>
    props.to || props.onClick || props.type === "submit"
      ? "pointer"
      : "default"};
  &:hover {
    opacity: 0.8;
  }
`;
const InlineButton = styled(RootButton)`
  &:hover {
    text-decoration: underline;
  }
`;

const RegularButton = styled(RootButton)`
  background: ${({ theme, primary }) =>
    primary ? theme.color.pink.normal : theme.color.gray.light};
  margin: ${({ theme }) => `${theme.spacing.xs / 2}px`};
  padding: ${({ theme }) => `${theme.spacing.xs / 2}px ${theme.spacing.xs}px`};
  border: ${({ theme }) => `2px solid ${theme.color.pink.normal}`};
  border-radius: 3px;
`;

const Button = ({ variant, children, ...props }) => {
  const { to } = props;
  const Component = useMemo(() => {
    switch (variant) {
      case "inline":
        return InlineButton;
      default:
        return RegularButton;
    }
  }, [variant]);

  const content = useMemo(() => <Component {...props}>{children}</Component>, [
    props,
    children
  ]);
  return to ? (
    <Link {...props}>{content}</Link>
  ) : (
    <Fragment>{content}</Fragment>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["regular", "inline"])
};
export default Button;

import React from "react";
import styled, { keyframes } from "styled-components";

const loaderRotate = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;
const LoaderChild = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: ${loaderRotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${({ theme }) => theme.color.green.normal} transparent
    transparent transparent;
  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
const LoadingIndicator = () => {
  return (
    <Loader>
      <LoaderChild />
      <LoaderChild />
      <LoaderChild />
      <LoaderChild />
    </Loader>
  );
};

export default LoadingIndicator;

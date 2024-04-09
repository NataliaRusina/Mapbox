import styled, { keyframes } from "styled-components/macro";

import { COLORS } from "src/constants/Constants";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const CircularLoader = styled.div<{ size?: number; thickness?: number, marginTop?: number }>`
margin-top: ${({marginTop}) => marginTop? marginTop : 0}px;
  width: ${({size}) => size? size : 20}px;
  height: ${({size}) => size? size : 20}px;
  border: solid ${({thickness}) => thickness? thickness : 5}px;
  border-color: lightgray;
  border-top-color: ${COLORS.cherry_300};
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
`;

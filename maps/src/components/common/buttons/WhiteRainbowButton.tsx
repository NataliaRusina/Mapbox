import { ReactNode } from "react";
import { LINEAR_GRADIENT } from "src/constants/Constants";

import styled from "styled-components/macro";

const Layer = styled.div<{ borderRadius: string }>`
  position: absolute;
  margin: 1px;
  border-radius: ${({ borderRadius }) => borderRadius};
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease;
  span {
    font-family: "Work Sans";
    font-weight: 400;
    line-height: 20px;
  }
`;

const WhiteLayer = styled(Layer)`
  background-color: white;
  span {
    background-image: ${LINEAR_GRADIENT};
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  svg {
    fill: transparent;
  }
`;

const RainbowLayer = styled(Layer) <{ isFrontal?: boolean }>`
  opacity: ${({ isFrontal }) => (isFrontal ? "1" : "0")};
  background-image: ${LINEAR_GRADIENT};
  span {
    color: white;
  }
  svg {
    fill: white;
    path {
      fill: white;
    }
  }
`;

const ButtonContainer = styled.div<{
  isRainbowFrontal: boolean;
  width: string;
  height: string;
  fontSize: string;
  borderRadius: string;
  fullWidth?: boolean;
}>`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};
  background: ${LINEAR_GRADIENT};
  transition: scale 0.5s ease;
  cursor: pointer;

  ${WhiteLayer} {
    opacity: ${({ isRainbowFrontal }) => (isRainbowFrontal ? "0" : "1")};
  }
  ${RainbowLayer} {
    opacity: ${({ isRainbowFrontal }) => (isRainbowFrontal ? "1" : "0")};
  }
  span {
    font-size: ${({ fontSize }) => fontSize};
  }

  &:hover {
    ${WhiteLayer} {
      opacity: ${({ isRainbowFrontal }) => (isRainbowFrontal ? "1" : "0")};
    }
    ${RainbowLayer} {
      opacity: ${({ isRainbowFrontal }) => (isRainbowFrontal ? "0" : "1")};
    }
  }

  &:active {
    scale: 0.9;
  }
`;

export interface WhiteRainbowButtonProps {
  onClick: (e: any) => void;
  text?: string;
  icon?: ReactNode;
  variant?: "rainbow" | "white";
  width?: string;
  height?: string;
  fontSize?: string;
  borderRadius?: string;
}

export default function WhiteRainbowButton({
  onClick,
  text,
  icon,
  variant = "rainbow",
  width = "180px",
  height = "42px",
  fontSize = "14px",
  borderRadius = "80px",
}: WhiteRainbowButtonProps) {
  return (
    <ButtonContainer
      onClick={onClick}
      isRainbowFrontal={variant === "rainbow"}
      width={width}
      height={height}
      fontSize={fontSize}
      borderRadius={borderRadius}
    >
      <WhiteLayer borderRadius={borderRadius}>
        {icon ?? ""}
        <span>{text}</span>
      </WhiteLayer>
      <RainbowLayer borderRadius={borderRadius}>
        {icon ?? ""}
        <span>{text}</span>
      </RainbowLayer>
    </ButtonContainer>
  );
}

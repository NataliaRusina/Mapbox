import { COLORS } from "src/constants/Constants";
import styled from "styled-components/macro";

export const Header = styled.div`
  z-index: 3;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding-inline: 30px;
  box-shadow: 0px 4px 4px 0px rgba(6, 33, 52, 0.02);
  background-color: white;
`;

export const LeftSide = styled.div`
  height: 100%;
  width: fit-content;
  max-width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const RightSide = styled(LeftSide)`
  overflow: unset;
  justify-content: flex-end;
`;

export const BackBtn = styled.div`
  margin-right: 14px;
  height: 100%;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    color: lightcoral;
    transform: rotate(90deg);
  }
`;

export const TextWrapper = styled.div`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.cherry_300};
  padding-left: 5px;
  min-width: 50px;
  cursor: pointer;
  margin-right: 30px;
`;

export const HeaderElementWrapper = styled.div`
  margin-left: 10px;
  color: ${COLORS.cherry_200};
`;

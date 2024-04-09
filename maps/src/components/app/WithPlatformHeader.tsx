import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styled from "styled-components/macro";

import { COLORS } from "src/constants/Constants";
import {
  Header,
  HeaderElementWrapper,
  LeftSide,
  RightSide,
  TextWrapper,
} from "./Header.styled";
import UserMenuPopover from "src/components/popovers/UserMenuPopover";
import WhiteRainbowButton from "../common/buttons/WhiteRainbowButton";
import { useDispatch } from "react-redux";
import { resetAllCounters } from "src/store/store";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  background-color: inherit;
`;

const TitleStyled = styled(TextWrapper)`
  min-width: unset;
  text-transform: uppercase;
  color: ${COLORS.cherry_200} !important;
`;

export default function WithPlatformHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onReset = () => {
    dispatch(resetAllCounters());
  };

  return (
    <>
      <Header>
        <LeftSide>
          <TextWrapper onClick={() => navigate("/")}>Home</TextWrapper>

          <TitleStyled>Natalia Rusina Example project</TitleStyled>

          <WhiteRainbowButton text="Reset counters" variant="white" onClick={onReset} />
        </LeftSide>
        <RightSide>
          <HeaderElementWrapper>
            <UserMenuPopover position="bottom-end" />
          </HeaderElementWrapper>
        </RightSide>
      </Header>

      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </>
  );
}

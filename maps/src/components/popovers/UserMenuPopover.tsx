import { Placement } from "@popperjs/core/lib/enums";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components/macro";
import { ifProp } from "styled-tools";

import { COLORS } from "src/constants/Constants";
import Popper from "src/components/popovers/Popper";

const UserAvatar = styled.div<{ isInner?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${ifProp("isInner", "46px", "28px")};
  height: ${ifProp("isInner", "46px", "28px")};
  border-radius: 50%;
  outline: solid;
  outline-width: 1px;
  outline-color: ${COLORS.cherry_200};
  outline-offset: 1px;
  background-color: #ccc;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  transition: outline-width 100ms ease;
`;

const UserMenuContainer = styled.div`
  padding: 2px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px;
  border-color: ${COLORS.cherry_200};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    ${UserAvatar} {
      outline-width: 4px;
    }
  }
`;

const TextBlock = styled.div`
  width: 160px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Open Sans", sans-serif;
  margin-block: 4px;
`;

const BoldText = styled(TextBlock)`
  font-size: 12px;
  font-weight: 600;
  line-height: 17px;
`;

const ThinText = styled(TextBlock)`
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  color: ${COLORS.cherry_300};;
`;

const Organization = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px 11px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 70px;
  background-color: ${COLORS.cherry_100};
  color: ${COLORS.cherry_300};
  width: fit-content;
  max-width: 100%;
  min-width: 94px;
  margin-block: 4px;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  margin-bottom: 15px;
  width: fit-content;
  height: fit-content;
`;

const UserMenu = styled.div`
  box-shadow: 0px 4px 16px 0px rgba(4, 27, 63, 0.2);
  border-radius: 10px;
  background-color: white;
  overflow: hidden;
  margin-bottom: 15px;
`;

const InfoWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 15px 0px 12px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const UserMenuItem = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: "Open Sans";
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  height: 30px;
  margin-block: 6px;
  padding-inline: 10px;
  svg {
    margin-right: 5px;
  }
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.cherry_100};
  }
  transition: background-color 0.5s ease;
`;

const Separator = styled.div`
  margin-block: 10px;
  border-bottom: 1px solid ${COLORS.cherry_200};
`;

interface UserMenuPopoverNewProps {
  position: Placement;
}

export default function UserMenuPopover({ position }: UserMenuPopoverNewProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = useCallback(
    () => navigate("/logout"),
    [navigate]
  );

  return (
    <Popper
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      offsetY={5}
      placement={position}
      content={
        <UserMenu>
          <InfoWrapper>
            <Avatar>
              <UserAvatar isInner>NR</UserAvatar>
            </Avatar>

            <BoldText>User Name</BoldText>
            <ThinText>email</ThinText>
            <Organization>Organization title</Organization>
          </InfoWrapper>

            <UserMenuItem onClick={() => navigate("/")}>
              <ThinText>Some page 1</ThinText>
            </UserMenuItem>
            <UserMenuItem onClick={() => navigate("/")}>
              <ThinText>Some page 2</ThinText>
            </UserMenuItem>

          <Separator />

          <UserMenuItem onClick={onLogout}>
            <ThinText>Log Out</ThinText>
          </UserMenuItem>
        </UserMenu>
      }
    >
      <UserMenuContainer>
      <UserAvatar>NR</UserAvatar>
      </UserMenuContainer>
    </Popper>
  );
}

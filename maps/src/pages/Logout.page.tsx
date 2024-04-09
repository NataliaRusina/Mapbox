
import { CircularLoader } from "src/components/common/loaders/CircularLoader";
import styled from "styled-components/macro";

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default function LogoutPage() {


  return (
    <Center>
      Logging out ...
      <CircularLoader size={100} marginTop={20} />
    </Center>
  );
}

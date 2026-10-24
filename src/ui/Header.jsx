import styled from "styled-components";
import HeaderApp from "./HeaderApp";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderApp />
    </StyledHeader>
  );
}

export default Header;

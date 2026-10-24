import styled from "styled-components";
import { useLogout } from "../features/authentication/useLogout";
import {
  HiArrowLeftOnRectangle,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../features/authentication/useGetUser";
import { useDarkMode } from "../hooks/darkModeContext";
import { useEffect } from "react";

const StyledHeader = styled.ul`
  display: flex;
  gap: 0.4rem;
  justify-content: right;
  align-items: center;
`;

const StyledDiv = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
`;

function HeaderApp() {
  const {
    user: {
      user_metadata: { fullName, avatar },
    },
  } = useGetUser();
  const navigate = useNavigate();
  const { logout, isPending } = useLogout();
  const { isDarkMode, handleDarkMode } = useDarkMode();

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
    },
    [isDarkMode],
  );

  return (
    <StyledHeader>
      <li>
        <ButtonIcon onClick={() => logout()} disabled={isPending}>
          <HiArrowLeftOnRectangle />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <StyledDiv>
            <StyledImg src={avatar} alt="avatar" />
            <p>{fullName}</p>
          </StyledDiv>
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={handleDarkMode}>
          {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
      </li>
    </StyledHeader>
  );
}

export default HeaderApp;

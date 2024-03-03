import { useState } from "react";
import styled from "styled-components";
import useUsers from "../hooks/useUsers";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 0;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

const Logo = styled.div`
  font-size: 1.5em;
`;

const DropdownMenu = styled.div<{ show: boolean }>`
  position: absolute;
  top: 50px;
  right: 10px;
  display: ${(props) => (props.show ? "block" : "none")};
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useUsers();

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <StyledHeader>
      <Logo>Sample App</Logo>
      <UserAvatar src={user.avatar} alt={user.name} onClick={toggleMenu} />
      <DropdownMenu show={showMenu}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Todo</MenuItem>
        <MenuItem>Weather</MenuItem>
      </DropdownMenu>
    </StyledHeader>
  );
};

export default Header;

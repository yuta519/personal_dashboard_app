import { MouseEvent, useState } from "react";
import styled from "styled-components";
import useUsers from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useUsers();

  const toggleMenu = () => setShowMenu(!showMenu);

  const onClick = (e: MouseEvent<HTMLElement>) => {
    navigate(`/${e.currentTarget.id}`);
    setShowMenu(false);
  };

  return (
    <StyledHeader>
      <Logo>Sample App</Logo>
      <UserAvatar src={user.avatar} alt={user.name} onClick={toggleMenu} />
      <DropdownMenu show={showMenu}>
        <MenuItem id='profile' onClick={onClick}>
          Profile
        </MenuItem>
        <MenuItem id='todos' onClick={onClick}>
          Todo
        </MenuItem>
        <MenuItem id='weather' onClick={onClick}>
          Weather
        </MenuItem>
      </DropdownMenu>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  right: 20px;
  display: ${(props) => (props.show ? "block" : "none")};
  background-color: #fff;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default Header;

import Title from "../components/Title";
import styled from "styled-components";
import useUsers from "../hooks/useUsers";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useUsers();

  return (
    <>
      <Title>Profile</Title>
      <ProfileWrapper>
        <Avatar src={user.avatar} alt={user.name} />
        <Name>{user.name}</Name>
        <Email>{user.email}</Email>
      </ProfileWrapper>
      <Link to='/todos'>todos</Link>
    </>
  );
}
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  width: 100%;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 10px 100px;
`;

const Email = styled.p`
  font-size: 18px;
  color: #666;
`;

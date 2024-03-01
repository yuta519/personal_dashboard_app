import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { addUser } from "../store/features/userSlice";
import Container from "../components/Container";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import Title from "../components/Title";
import styled from "styled-components";

type FormValue = {
  name: string;
  email: string;
  avatar: string;
};

export default function Profile() {
  const [formValue, setFormValue] = useState<FormValue>({
    name: "",
    email: "",
    avatar: "",
  });

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent) => {
    const { files } = e.target as HTMLInputElement;
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;
      setFormValue((prev) => ({ ...prev, avatar: result }));
    };

    if (files && files[0]) {
      reader.readAsDataURL(files[0]);
    } else {
      setFormValue((prev) => ({ ...prev, avatar: "" }));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { name, email, avatar } = formValue;
    dispatch(addUser({ name, email, avatar }));
  };

  return (
    <Container>
      {user.email ? (
        <>
          <Title>Profile</Title>
          <ProfileWrapper>
            <Avatar src={user.avatar} alt={user.name} />
            <Name>{user.name}</Name>
            <Email>{user.email}</Email>
          </ProfileWrapper>
        </>
      ) : (
        <>
          <Title>Create Your Profile</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              name='name'
              type='text'
              value={formValue.name}
              onChange={handleChange}
              placeholder='Name'
            />
            <Input
              name='email'
              type='email'
              value={formValue.email}
              onChange={handleChange}
              placeholder='Email'
              required
            />
            <Input
              name='image'
              type='file'
              onChange={handleImageUpload}
              placeholder='Image'
              required
            />

            <Button type='submit' value='Create' />
          </Form>
        </>
      )}
    </Container>
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

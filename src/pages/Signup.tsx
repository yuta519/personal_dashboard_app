import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { addUser } from "../store/features/userSlice";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import Title from "../components/Title";

type FormValue = {
  name: string;
  email: string;
  avatar: string;
};

export default function Signup() {
  const [formValue, setFormValue] = useState<FormValue>({
    name: "",
    email: "",
    avatar: "",
  });

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
    </Container>
  );
}

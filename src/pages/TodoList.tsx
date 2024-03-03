import { ChangeEvent, MouseEvent, useState } from "react";
import styled from "styled-components";
import { useTodos } from "../hooks/useTodos";
import Title from "../components/Title";
import Button from "../components/Button";
import Subtitle from "../components/Subtitle";

export default function TodoList() {
  const { todos, add, remove, toggleComplete } = useTodos();
  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTodo(e.target.value);

  const handleCreate = () => {
    if (!newTodo.length) return;
    add(newTodo);
    setNewTodo("");
  };

  const handleToggle = (e: ChangeEvent<HTMLElement>) =>
    toggleComplete(Number(e.currentTarget.dataset.index as string));

  const handleRemove = (e: MouseEvent<HTMLElement>) =>
    remove(Number(e.currentTarget.dataset.index as string));

  return (
    <>
      <Title>Todo List</Title>
      <TodoWrapper>
        <StyledInput
          name='text'
          type='text'
          value={newTodo}
          onChange={handleChange}
          placeholder='Create new Task...'
          required
        />
        <Button type='submit' color='primary' onClick={handleCreate}>
          Create
        </Button>
      </TodoWrapper>

      {!!todos.length && <Subtitle>Tasks</Subtitle>}
      {todos.map((todo, index) => (
        <TodoWrapper key={index}>
          <CheckBox
            type='checkbox'
            checked={todo.isComplete}
            data-index={index}
            onChange={handleToggle}
          />
          <StyledText isComplete={todo.isComplete}>{todo.text}</StyledText>
          <Button data-index={index} color='danger' onClick={handleRemove}>
            Remove
          </Button>
        </TodoWrapper>
      ))}
    </>
  );
}

const TodoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
  padding: 0 20px;
  border: 2px solid #dcdcdc;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 80%;
    flex: 0 0 100%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 60%;
    flex: 0 0 75%;
  }

  @media (min-width: 1025px) {
    width: 50%;
    flex: 0 0 50%;
  }
`;

const CheckBox = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

type StyledTextProps = {
  isComplete?: boolean;
};

const StyledInput = styled.input`
  width: 80%;
  padding: 2px;
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  border-bottom: 1px solid #ddd;
`;

const StyledText = styled.span<StyledTextProps>`
  font-family: Arial, sans-serif;
  width: 100%;
  display: inline;
  min-width: 200px;
  margin: 10px 40px;

  text-decoration-line: ${(props) =>
    props.isComplete ? "line-through" : "none"};

  @media (max-width: 768px) {
    font-size: 18px;
    margin: 0 5px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 20px;
    margin: 10px 20px;
  }

  @media (min-width: 1025px) {
    font-size: 24px;
    margin: 10px 40px;
  }
`;

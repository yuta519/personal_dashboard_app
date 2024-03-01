import { ChangeEvent, MouseEvent, useState } from "react";
import styled from "styled-components";
import { useTodos } from "../hooks/useTodos";
import Input from "../components/Input";
import Title from "../components/Title";
import Button from "../components/Button";
import { Column, Row } from "../components/Grid";

export function TodoList() {
  const { todos, add, remove, toggleComplete } = useTodos();
  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTodo(e.target.value);

  const handleCreate = () => {
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
      <StyledRow>
        <Column grid={2} />
        <StyledColumn grid={6}>
          <Input
            name='text'
            type='text'
            value={newTodo}
            onChange={handleChange}
            placeholder='Create new Task...'
            required
          />
        </StyledColumn>
        <StyledColumn grid={1}>
          <Button type='submit' onClick={handleCreate}>
            +
          </Button>
        </StyledColumn>
      </StyledRow>

      {todos.map((todo, index) => (
        <StyledRow key={index}>
          <StyledColumn grid={2}>
            <input
              type='checkbox'
              checked={todo.isComplete}
              data-index={index}
              onChange={handleToggle}
            />
          </StyledColumn>
          <StyledColumn grid={6}>
            <span>{todo.text}</span>
          </StyledColumn>
          <StyledColumn grid={2}>
            <Button data-index={index} onClick={handleRemove}>
              Remove
            </Button>
          </StyledColumn>
        </StyledRow>
      ))}
    </>
  );
}

const StyledRow = styled(Row)`
  display: flex;
  align-items: center;
  text-align: center;
`;

const StyledColumn = styled(Column)`
  display: flex;
  align-items: center;
  margin: 10px 20px;
`;

import { useState } from "react";

type Todo = {
  text: string;
  isComplete: boolean;
};

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function add(text: string) {
    setTodos([...todos, { text, isComplete: false }]);
  }

  function remove(index: number) {
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
  }

  function toggleComplete(index: number) {
    const newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
  }

  return { todos, add, remove, toggleComplete };
}

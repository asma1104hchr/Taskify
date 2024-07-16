import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim() === "") return; // Avoid adding empty tasks

    const newTodo: Todo = {
      id: Date.now(),
      todo: todo.trim(),
      isDone: false,
    };

    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceList =
      source.droppableId === "TodosList" ? todos : completedTodos;
    const destinationList =
      destination.droppableId === "TodosList" ? todos : completedTodos;
    const [removed] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, removed);

    setTodos([...todos]);
    setCompletedTodos([...completedTodos]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;

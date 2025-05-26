// TodoList.jsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useTodos } from "../../../hooks/useTodos";
import TodoModal from "./TodoModal";
import TodoTable from "./Table/TodoTable";
import "./TodoList.css";
import useAuthStore from "../../../store/authStore";

const TodoList = () => {
  const user = useAuthStore((s) => s.user);
  const userId = user?._id;

  const {
    todos,
    isLoading,
    error,
    createTodoMutation,
    deleteTodoMutation,
    updateTodoMutation,
  } = useTodos(userId);

  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleCreateClick = () => {
    setFormMode("create");
    setCurrentTodo(null);
    setModalOpen(true);
  };

  const handleUpdateClick = (todo) => {
    setFormMode("update");
    setCurrentTodo(todo);
    setModalOpen(true);
  };

  const handleSubmit = (values, actions) => {
    const payload = { userId, ...values };

    if (!payload.dueDate) {
      alert("Please provide a Due Date.");
      return;
    }

    if (formMode === "create") {
      createTodoMutation.mutate(payload);
    } else if (formMode === "update") {
      updateTodoMutation.mutate({ id: currentTodo._id, payload });
    }

    actions.setSubmitting(false);
    setModalOpen(false);
  };

  const handleDeleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodoMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2 className="todo-title">My Todo List</h2>
        <button className="create-todo-btn" onClick={handleCreateClick}>
          <FontAwesomeIcon icon={faAdd} /> Create Todo
        </button>
      </div>

      {error && <div className="error-message">{error.message}</div>}

      {todos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No todos yet</h3>
          <p>Create your first todo to get started</p>
        </div>
      ) : (
        <TodoTable
          todos={todos}
          handleUpdateClick={handleUpdateClick}
          handleDeleteTodo={handleDeleteTodo}
        />
      )}

      <TodoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        header={formMode === "update" ? "Update Todo" : "Create Todo"}
        initialValues={
          currentTodo
            ? {
                ...currentTodo,
                dueDate: currentTodo.dueDate
                  ? new Date(currentTodo.dueDate).toISOString().slice(0, 16)
                  : "",
              }
            : {
                title: "",
                description: "",
                priority: "medium",
                dueDate: "",
                status: "pending",
              }
        }
        onSubmit={handleSubmit}
        mode={formMode}
      />
    </div>
  );
};

export default TodoList;

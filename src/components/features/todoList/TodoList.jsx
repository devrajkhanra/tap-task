// TodoList.jsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faAdd } from "@fortawesome/free-solid-svg-icons";
import { useTodos } from "../../../hooks/useTodos";
import TodoModal from "./TodoModal";
import "./TodoList.css";
import useAuthStore from "../../../store/authStore";
import renderPriorityStars from "../../../utils/renderPriorityStars";

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
    if (formMode === "create") {
      createTodoMutation.mutate({ userId, ...values });
    } else if (formMode === "update") {
      updateTodoMutation.mutate({
        id: currentTodo._id,
        payload: { ...currentTodo, ...values },
      });
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

  console.log(todos);

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
        <div className="todo-table-container">
          <table className="todo-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Time Remaining</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo._id} className="todo-row">
                  <td className="todo-cell title-cell">{todo.title}</td>
                  <td className="todo-cell description-cell">
                    {todo.description || (
                      <span className="no-description">No description</span>
                    )}
                  </td>
                  <td className={`todo-cell priority-cell ${todo.priority}`}>
                    {renderPriorityStars(todo.priority)}
                  </td>
                  <td className="todo-cell time-cell">
                    {todo.estimatedTimeMinutes
                      ? `${Math.floor(todo.estimatedTimeMinutes / 60)}h ${
                          todo.estimatedTimeMinutes % 60
                        }m`
                      : "—"}
                  </td>
                  <td className="todo-cell action-cell">
                    <button
                      className="edit-btn"
                      onClick={() => handleUpdateClick(todo)}
                      title="Edit Todo"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTodo(todo._id)}
                      title="Delete Todo"
                      disabled={deleteTodoMutation.isLoading}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TodoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        header={formMode === "update" ? "Update Todo" : "Create Todo"}
        initialValues={
          currentTodo || {
            title: "",
            description: "",
            priority: "medium",
            estimatedTimeMinutes: "",
            status: true,
          }
        }
        onSubmit={handleSubmit}
        mode={formMode}
      />
    </div>
  );
};

export default TodoList;

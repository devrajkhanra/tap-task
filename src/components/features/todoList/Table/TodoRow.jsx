import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faBell } from "@fortawesome/free-solid-svg-icons";
import { getRemainingTime } from "../../../../utils/helperFunctions";
import renderPriorityStars from "../../../../utils/renderPriorityStars";

const TodoRow = ({ todo, onUpdate, onDelete }) => {
  return (
    <tr className="todo-row">
      <td className="todo-cell title-cell">{todo.title}</td>
      <td className="todo-cell description-cell">
        {todo.description || (
          <span className="no-description">No description</span>
        )}
      </td>
      <td className={`todo-cell priority-cell ${todo.priority}`}>
        {renderPriorityStars(todo.priority)}
      </td>
      <td className="todo-cell due-date-cell">
        {new Date(todo.dueDate).toLocaleString()}
      </td>
      <td className="todo-cell time-cell">{getRemainingTime(todo.dueDate)}</td>
      <td className="todo-cell action-cell">
        <button className="notification-btn" title="Set Notification">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button
          className="edit-btn"
          onClick={() => onUpdate(todo)}
          title="Edit Todo"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(todo._id)}
          title="Delete Todo"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>
    </tr>
  );
};

export default TodoRow;

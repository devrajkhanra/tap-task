import React from "react";
import TodoRow from "./TodoRow";

const TodoTable = ({ todos, handleUpdateClick, handleDeleteTodo }) => {
  return (
    <div className="todo-table-container">
      <table className="todo-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Remaining</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <TodoRow
              key={todo._id}
              todo={todo}
              onUpdate={handleUpdateClick}
              onDelete={handleDeleteTodo}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;

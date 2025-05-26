import TodoForm from "./Form/TodoForm";
import "./TodoModal.css";
const TodoModal = ({
  isOpen,
  onClose,
  header,
  initialValues,
  onSubmit,
  mode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{header}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <TodoForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          mode={mode}
        />
      </div>
    </div>
  );
};

export default TodoModal;

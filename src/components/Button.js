import { FaTimes } from "react-icons/fa";

function Button({ color, text, onAdd, showAddTask, showUpdateTask }) {
    return (
        <div>
            {showAddTask && showUpdateTask ? (
                <button
                    onClick={onAdd}
                    style={{ backgroundColor: color }}
                    className="btn"
                >
                    {text}
                </button>
            ) : (
                <FaTimes
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={onAdd}
                />
            )}
        </div>
    );
}

Button.defaultProps = {
    color: "steelblue",
};

export default Button;

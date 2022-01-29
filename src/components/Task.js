import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";

const Task = ({ task, onDelete, onToggle, onUpdate }) => {
    return (
        <div
            className={`task ${task.reminder ? "reminder" : ""}`}
            onDoubleClick={() => onToggle(task.id)}
        >
            <h3>
                {task.name}
                <div>
                    <GrEdit onClick={() => onUpdate(task.id)} />
                    <RiDeleteBinLine
                        style={{
                            color: "red",
                            cursor: "pointer",
                            marginLeft: "10px",
                        }}
                        onClick={() => onDelete(task.id)}
                    />
                </div>
            </h3>
            <p>{task.date}</p>
        </div>
    );
};

export default Task;

import React from "react";
import Task from "./Task";

function Tasks({ tasks, onDelete, onToggle, onUpdate }) {
    //delete tasks

    return (
        <div>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}

export default Tasks;

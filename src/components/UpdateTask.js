import React from "react";

import { useState } from "react";

function UpdateTask({ onUpdate }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            alert("Please add task name!");
            return;
        }
        if (!date) {
            alert("Please add date and time");
        }

        onUpdate({ name, date, reminder });

        setName("");

        setReminder(false);
    };

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label> Task</label>
                <input
                    type="text"
                    placeholder="Add Task"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label> Date</label>
                <input
                    type="text"
                    placeholder="Add Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className="form-control form-control-check">
                <label> Set Reminder</label>
                <input
                    type="checkbox"
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>

            <input
                type="submit"
                value="Update Task"
                className="btn btn-block"
            />
        </form>
    );
}

export default UpdateTask;
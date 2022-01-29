import { useLocation } from "react-router-dom";
import React from "react";
import Button from "./Button";

const Header = ({ title, onAdd, showAddTask, showUpdateTask }) => {
    const location = useLocation();
    return (
        <>
            <div className="header">
                <h1>{title}</h1>
                {location.pathname === "/" && (
                    <Button
                        color="green"
                        text="Add"
                        onAdd={onAdd}
                        showAddTask={showAddTask}
                        showUpdateTask={showUpdateTask}
                    />
                )}
            </div>
        </>
    );
};

Header.defaultProps = {
    title: "Task Tracker",
};

export default Header;

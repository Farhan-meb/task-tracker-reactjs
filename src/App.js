import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Tasks from "./components/Tasks";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import UpdateTask from "./components/UpdateTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [showUpdateTask, setShowUpdateTask] = useState(false);
    const [taskId, setTaskId] = useState();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };
        getTasks();
    }, []);

    //fetch tasks
    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();
        return data;
    };

    //fetch task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();
        return data;
    };

    const addTask = async (task) => {
        // const id = Math.floor(Math.random() * 10000) + 1;
        // const newTask = { id, ...task };
        // setTasks([...tasks, newTask]);

        const res = await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(task),
        });

        const data = await res.json();

        setTasks([...tasks, data]);
    };

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE",
        });

        setTasks(tasks.filter((task) => task.id !== id));
    };

    const updateTask = (task) => {
        tasks[taskId] = task;
        setTasks(tasks);
        setShowUpdateTask(!showUpdateTask);
    };

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updTask = {
            ...taskToToggle,
            reminder: !taskToToggle.reminder,
        };

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updTask),
        });

        const data = await res.json();
        const _tasks = [...tasks];
        _tasks[data.id - 1] = data;

        setTasks(_tasks);
    };

    const onAddButton = () => {
        setShowAddTask(!showAddTask);
    };

    const onEditButton = (id) => {
        setShowUpdateTask(!showUpdateTask);
        setTaskId(id);
    };

    return (
        <Router>
            <div className="container">
                <Header
                    onAdd={onAddButton}
                    showAddTask={!showAddTask}
                    showUpdateTask={!showUpdateTask}
                />
                {showAddTask === true && (
                    <AddTask onAdd={addTask} onAddButton={onAddButton} />
                )}

                {showUpdateTask === true && (
                    <UpdateTask onUpdate={updateTask} />
                )}
                <Route
                    path="/"
                    exact
                    render={(props) => (
                        <>
                            {!showAddTask && !showUpdateTask ? (
                                tasks.length > 0 ? (
                                    <Tasks
                                        tasks={tasks}
                                        onDelete={deleteTask}
                                        onToggle={toggleReminder}
                                        onUpdate={onEditButton}
                                    />
                                ) : (
                                    "No Tasks"
                                )
                            ) : (
                                ""
                            )}
                        </>
                    )}
                />
                <Route path="/about" component={About} />
                <Footer />
            </div>
        </Router>
    );
}

export default App;

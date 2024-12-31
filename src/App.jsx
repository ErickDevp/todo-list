import React, { useState, useEffect } from "react";
import Input from "./components/Input.jsx";
import Task from "./components/Task.jsx";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedTasks, setSelectedTasks] = useState([]); 

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        const savedSelected = JSON.parse(localStorage.getItem("selected"));

        if (savedTasks) {
            setTasks(savedTasks);
            setSelectedTasks(savedSelected);
        }
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("selected", JSON.stringify(selectedTasks));
        }
    }, [tasks][selectedTasks]);

    const handleAddTask = () => {
        if (inputValue.trim() !== "") {
            const newTask = {
                id: uuidv4(),
                task: inputValue
            };
            setTasks([...tasks, newTask]);
            setInputValue(""); 
        }
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);

        setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
    };

    const handleTaskClick = (id) => {
        if (selectedTasks.includes(id)) {
            setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
        } else {
            setSelectedTasks([...selectedTasks, id]);
        }
    };

    return (
        <div className="app">
            <h1>todo list</h1>
            <main>
                <Input
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    handleAddTask={handleAddTask}
                />
                <ul>
                    {tasks.slice().reverse().map((task) => (
                        <Task
                            key={task.id}
                            task={task.task}
                            deleteTask={() => deleteTask(task.id)}
                            isSelected={selectedTasks.includes(task.id)} 
                            onClick={() => handleTaskClick(task.id)} 
                        />
                    ))}
                </ul>
            </main>
        </div>
    );
}

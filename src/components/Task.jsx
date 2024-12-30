import React, {useState} from "react";
import "../css/Task.css";
import { FaTrashCan, FaPen } from "react-icons/fa6";

export default function Task({task, deleteTask, isSelected, onClick }) {

    return (
    <li onClick={onClick}
        className={`task ${isSelected ? "selected" : ""}`}>
        <p>{task}</p>

        <button onClick={deleteTask}>
            <FaTrashCan/>
        </button>
    </li>
    );
}

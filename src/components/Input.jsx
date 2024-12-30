import React from "react";
import "../css/input.css";
import iconSoma from "../assets/icon-soma.svg";

export default function Input({setInputValue, inputValue, handleAddTask}) {

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTask(); 
        }
    }

    return (
        <div className="container-input ">
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} type="text" placeholder="Digite sua tarefa..."/>

            <button onClick={handleAddTask} >
                <img src={iconSoma} alt="icone de mais" />
            </button>
        </div>
    )
}
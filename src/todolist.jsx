import React, { useState, useRef } from 'react'; // 1. Import useRef
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Todolist() {
    let [todolist, settodolist] = useState([]);
    let inputRef = useRef(null); // 2. Add a reference to the input element

    let savetodolist = (event) => {
        event.preventDefault();
        let toname = inputRef.current.value; // 3. Use the reference to get the input value

        if (!todolist.includes(toname)) {
            let finaltodo = [...todolist, toname];
            settodolist(finaltodo);
            NotificationManager.success("To-Do item added successfully!");
        } else {
            NotificationManager.error("To-Do item already exists!");
        }

        inputRef.current.value = ''; // 3. Clear the input field
    };

    let list = todolist.map((v, i) => {
        return (
            <TodolistItem
                value={v}
                key={i}
                indexno={i}
                todolist={todolist}
                settodolist={settodolist}
            />
        );
    });

    return (
        <div>
            <h1>TO DO List</h1>
            <form onSubmit={savetodolist}>
                <input type="text" name='toname' ref={inputRef} required /> {/* 4. Attach the reference */}
                <button>Save</button>
            </form>
            <div className="outerdiv">
                <ul>
                    {list}
                </ul>
                <NotificationContainer />
            </div>
        </div>
    );
}

function TodolistItem({ value, indexno, todolist, settodolist }) {
    const [state, setstatus] = useState(false);

    const deleterow = () => {
        let finaldata = todolist.filter((_, i) => i !== indexno);
        settodolist(finaldata);
        NotificationManager.error("To-Do item removed!");
    };

    const success = () => {
        setstatus(!state);
        NotificationManager.success("To-Do item completed!");
    };

    return (
        <li className={state ? "done" : ""} onClick={success}>
            {indexno + 1}) {value} <span onClick={(e) => { e.stopPropagation(); deleterow(); }}>&times;</span>
        </li>
    );
}

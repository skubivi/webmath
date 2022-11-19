import React, { useState } from "react";
import Image from "./Image";

const Task = (props) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    }

    const title = props.title === undefined ? 'Задача №' + props.id : 'Задача №' + props.id + ': ' + props.title;

    const img = props.image === undefined ? <div className="image-container none"></div> : <div className="image-container"><Image src={props.image}/></div>;
    return (
        <div className="task">
            <div className="task-title">
                <p>{title}</p>
                <button onClick={handleClick}></button>
            </div>
            <div className={active ? 'task-body' : 'task-body none'}>
                <hr/>
                {img}
                <p>{props.task}</p>
                <button>Перейти к решению</button>
            </div>
        </div>
    )
}

export default Task;
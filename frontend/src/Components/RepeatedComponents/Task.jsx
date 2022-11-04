import React from "react";
import Image from "./Image";

import arrow from '../../assets/Images/arrow.png'

const Task = (props) => {
    const title = props.title === undefined ? 'Задача №' + props.id : 'Задача №' + props.id + ': ' + props.title;
    return (
        <div className="task">
            <div className={props.image === undefined ? "task-image" : "task-image active"}>
                <Image src={arrow} className='img-hover' />
                <Image src={props.image === undefined ? arrow : props.image} />
            </div>
            <div className="task-body">
                <div className="task-title">
                    <p>{title}</p>
                </div>
                <div className="task-text">
                    <p>{props.task}</p>
                </div>
            </div>
        </div>
    )
}

export default Task;
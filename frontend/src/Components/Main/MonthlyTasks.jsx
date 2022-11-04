import React from "react";

import testImage from '../../assets/Images/test.jpg'
import Task from "../RepeatedComponents/Task";

const testState = [
    {
        id: 1,
        title: 'Lorem ipsum dolor sit amet',
        task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum purus nec mi fringilla elementum. Fusce eu ante nec purus auctor fermentum. In fringilla malesuada.',
        image: testImage
    }, 
    {
        id: 2,
        title: 'Lorem ipsum dolor sit amet',
        task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam leo id eros volutpat lobortis. Sed lacinia sagittis laoreet. Phasellus sit amet fringilla dolor, quis blandit neque. Mauris fringilla sagittis quam eget viverra. Suspendisse ut purus sollicitudin, rutrum dui sit amet, tempor ligula. Nulla nibh velit, viverra et ante at.'
    },
    {
        id: 3,
        task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum purus nec mi fringilla elementum. Fusce eu ante nec purus auctor fermentum. In fringilla malesuada.'
    }
]

const MonthlyTasks = () => {
    return(
        <div className="task-catalog">
            <h1>Ежемесячные задачи</h1>
            <Task id={testState[0].id} title={testState[0].title} task={testState[0].task} image={testState[0].image}/>
            <Task id={testState[1].id} title={testState[1].title} task={testState[1].task} image={testState[1].image}/>
        </div>
    )
}

export default MonthlyTasks;
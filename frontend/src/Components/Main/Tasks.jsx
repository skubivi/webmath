import React from "react";

import monthlyBg from '../../assets/Images/monthly.jpg'
import allBg from '../../assets/Images/all_tasks.jpg'
import Image from "../RepeatedComponents/Image";
import { Link } from "react-router-dom";

const Tasks = () => {
    return(
        <div className="tasks">
            <Link to='/tasks/monthly' className="monthly-tasks tasks-card">
                <Image src={monthlyBg} className='monthly-bg'/>
                <p className="link">Ежемесячные задачи</p>
            </Link>
            <Link to='/tasks/catalog' className='all-tasks tasks-card'>
                <Image src={allBg} className='all-bg'/>
                <p className="link">Каталог всех задач</p>
            </Link>
        </div>
    )
}

export default Tasks
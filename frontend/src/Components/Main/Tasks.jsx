import React from "react";
import { useState } from "react";

import monthlyBg from '../../assets/Images/monthly.jpg'
import allBg from '../../assets/Images/all_tasks.jpg'
import Image from "../Image";

const Tasks = () => {
    return(
        <div className="tasks">
            <div className='monthly-tasks tasks-card'>
                <Image src={monthlyBg} className='monthly-bg'/>
                <p className="link">Ежемесячные задачи</p>
            </div>
            <div className='all-tasks tasks-card'>
                <Image src={allBg} className='all-bg'/>
                <p className="link">Каталог всех задач</p>
            </div>
        </div>
    )
}

export default Tasks
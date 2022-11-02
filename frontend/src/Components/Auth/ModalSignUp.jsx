import React from "react";

const ModalSignUp = (props) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h1>Присоединяйтесь</h1>
                <h4>и Решайте Задачи Прямо Сейчас!</h4>
                <input placeholder="Username" type='text'/>
                <input placeholder="Email" type='email'/>
                <input placeholder="Password" type='password'/>
                <button>Зарегестрироваться</button>
            </div>
        </div>
    )
}

export default ModalSignUp;
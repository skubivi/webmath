import React from "react";

const user = {
    nickname: 'skubivi',
    rating: '1800',
    sesonRating: '500',
    top: '3'
}

const Home = () => {
    return (
        <div className="home">
            <h1>{user.nickname}</h1>
            <div className="row">
                <h2>Топ - {user.top}</h2>
                <h2>Рейтинг - {user.rating}</h2>
                <h2>Сезонный рейтинг - {user.sesonRating}</h2>
            </div>
            <div className="row">
                <h2>Еженедельные задачи</h2>
                <h2>Каталог задач</h2>
            </div>
            <div className="history">
                <h1>Ранее решённые задачи</h1>
            </div>
        </div>
    )
}

export default Home;
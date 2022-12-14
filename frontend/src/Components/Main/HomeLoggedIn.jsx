import React from "react"
import { connect } from "react-redux"

const HomeLoggedIn = (props) => {
    const user = props.userData.user
    return (
        <div className="home">
            <h1>{user.username}</h1>
            <div className="row">
                <h2>Рейтинг - {user.rating}</h2>
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

function mapStateToProps(state){
    return {
        userData: state.user
    }
}

export default connect(mapStateToProps, null)(HomeLoggedIn)
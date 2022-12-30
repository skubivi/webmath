import React from "react";
import { connect } from "react-redux";
import Alert from "./Alert";
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const Alerts = (props) => {
    const alerts = props.alerts.map((alert) => {
        return (
            <CSSTransition classNames="alert-transition" timeout={500} key={alert.id}>
                <Alert alert={alert} key={alert.id}/>
            </CSSTransition>
        )
    })
    return(
        <div className="alerts">
            <TransitionGroup>
                {alerts}
            </TransitionGroup>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        alerts: state.alerts.alerts
    }
}

export default connect(mapStateToProps, null)(Alerts);
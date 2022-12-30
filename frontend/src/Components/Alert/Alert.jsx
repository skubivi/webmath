import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideAlert } from "../../redux/actionCreators/hideAlert";

const Alert = (props) => {
    const handleDelete = () => {
        props.delete(props.alert)
    }
    return(
        <div className="alert">
            <div className="alert-header">
                <div className="alert-title">
                    <h5 className="alert-title-text">{props.alert.title}</h5>
                </div>
                <div className="alert-close" onClick={handleDelete}>
                    &#10006;
                </div>
            </div>
            <hr/>
            <div className="alert-body">
                <p className="alert-body-text">{props.alert.message}</p>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        delete: bindActionCreators(hideAlert, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Alert);
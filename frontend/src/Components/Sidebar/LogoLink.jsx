import React from "react";
import Image from "../Image";

import logo from "../../assets/Images/LogoHomeWebsite.png"

const LogoLink = ({className}) => {
    return (
        <div className={className}>
            <Image src={logo} />
        </div>
    )
}

export default LogoLink;
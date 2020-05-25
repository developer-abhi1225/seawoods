import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button} from "antd";

function NavBar(props) {
    const fname = props.auth.userDetails.first_name ? props.auth.userDetails.first_name : "";
    const lname = props.auth.userDetails.last_name ? props.auth.userDetails.last_name : "";
    return (
        <nav className={"schedulernavbar navbar navbar-dark bg-primary"}>
            <Link className="navbar-brand" to="/">
                My Scheduler
            </Link>
            <div style={{float: "right"}}>
                <Avatar src={props.auth.userDetails.avatar}/>
                <span className={"navbar-username"}>
                    <span>{`${fname} ${lname}`}</span>
                    <Button ghost type={"link"} style={{marginLeft:"30px"}} onClick={props.logout}> Logout </Button>
                </span>

            </div>

        </nav>
    );
}

export default NavBar;
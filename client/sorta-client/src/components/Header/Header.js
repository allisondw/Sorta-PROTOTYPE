import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {

    return (
        <header>
            <nav>
                <div><h1>sorta</h1></div>
                <div>
                    <ul>
                        <li><Link to="/gallery">gallery</Link> </li>
                        <li><Link to="/create">create</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header;
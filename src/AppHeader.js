import React from "react";
import { NavLink } from "react-router-dom";
import './AppHeader.css';

const AppHeader = () => (
    <header>
        <div className="center-column">
            <h1>Recipes of My Family</h1>
        </div>
        <nav>
            <ol className="center-column">
                <li>
                    <NavLink to="/">Browse recipes</NavLink>
                </li>
                <li>
                    <NavLink to="/random">Surprise me</NavLink>
                </li>
            </ol>
        </nav>
    </header>
)

export default AppHeader;
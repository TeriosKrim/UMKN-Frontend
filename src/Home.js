import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container">
            <div className="centered-image-container">
                <img
                    src={require("./img/umkd-logo.png")}
                    alt="Ultimate Mortal Kombat Deception logo"
                    className="centered-image"
                />
                <div>
                    Ultimate Mortal Kombat Deception is a modification of the
                    Playstation 2 version of Mortal Kombat: Deception created by
                    ermaccer that adds more characters, stages, and other new
                    features!
                </div>
                <div id="linkButton">
                    <a href="https://github.com/ermaccer/ultimate-mkd">
                        <button className="btn btn-outline-primary">
                            Download the mod
                        </button>
                    </a>
                    <Link to="/kombatants">
                        <button className="btn btn-outline-danger">
                            See the Kombatants
                        </button>
                    </Link>
                    <Link to="/tier-list">
                        <button className="btn btn-outline-warning">
                            View the tier list
                        </button>
                    </Link>
                </div>
            </div>
            <div id="disclaimer">
                <p id="mod">Mod created by Ermaccer</p>
                <p id="mod">I am not affiliated with the mod of any kind</p>
                <p id="mod">Background by Monster Enjoyer</p>
                <p id="warner">
                    Mortal Kombat: Deception was published by Midway games
                    Mortal Kombat©, the Dragon Logo and all characters names are
                    trademarks of Warner Bros. Entertainment Inc.
                </p>
            </div>
        </div>
    );
};

export default Home;

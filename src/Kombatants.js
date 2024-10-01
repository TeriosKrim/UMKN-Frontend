import React, { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

/*We take the data from Data.js */
const Kombatants = () => {
    const [kombatants, setCombantants] = useState([]);

    useEffect(() => {
        const makeAPICall = async () => {
            const res = await fetch(
                `https://umkn-backend-purple-voice-966.fly.dev/kombatants`
            );
            const data = await res.json();
            setCombantants(data.kombatants);
        };
        makeAPICall();
    }, []);

    return (
        <>
            <div className="row">
                <h1>KOMBATANTS</h1>
                <div className="wrapper">
                    <div id="base" className="kombatantList">
                        {/* we loop through each character and have it */}
                        {/* Return the character image */}
                        {kombatants
                            .filter((item) => item.roster === "base")
                            .map((kombatant) => {
                                return (
                                    <Link
                                        to={`/kombatantDetails/${kombatant.id}`}
                                    >
                                        <img
                                            src={`/img/Characters/icon/${kombatant.name}.webp`}
                                            className="img-fluid"
                                            alt={kombatant.name}
                                            key={kombatant.id}
                                        />
                                    </Link>
                                );
                            })}
                    </div>
                    <div className="row text-center" id="unchainedName">
                        <div className="col">
                            Mortal Kombat:Unchained extra characters
                        </div>
                    </div>
                    <div id="unchained" className="kombatantList">
                        {/* we loop through each character and have it */}
                        {/* Return the character image */}
                        {kombatants
                            .filter((item) => item.roster === "unchain")
                            .map((kombatant) => {
                                return (
                                    <Link
                                        to={`/kombatantDetails/${kombatant.id}`}
                                    >
                                        <img
                                            src={`/img/Characters/icon/${kombatant.name}.webp`}
                                            className="img-fluid"
                                            alt={kombatant.name}
                                            key={kombatant.id}
                                        />
                                    </Link>
                                );
                            })}
                    </div>
                    <div className="row text-center" id="ultimateName">
                        <div className="col">
                            Ultimate Mortal Kombat Deception exclusives
                        </div>
                    </div>
                    <div id="ultimate" className="kombatantList">
                        {/* we loop through each character and have it */}
                        {/* Return the character image */}
                        {kombatants
                            .filter((item) => item.roster === "ultimate")
                            .map((kombatant) => {
                                return (
                                    <Link
                                        to={`/kombatantDetails/${kombatant.id}`}
                                    >
                                        <img
                                            src={`/img/Characters/icon/${kombatant.name}.webp`}
                                            className="img-fluid"
                                            alt={kombatant.name}
                                            key={kombatant.id}
                                        />
                                    </Link>
                                );
                            })}
                    </div>
                </div>
                <div id="disclaimer">
                    <p id="mod">Mod created by Ermaccer</p>
                    <p id="mod">I am not affiliated with the mod of any kind</p>
                    <p id="mod">Background by Monster Enjoyer</p>
                    <p id="warner">
                        Mortal Kombat:Deception was published by Midway games
                        Mortal Kombat©,the Dragon Logo and all characters names
                        are trademarks of Warner Bros.Entertainment Inc.
                    </p>
                </div>
            </div>
        </>
    );
};
export default Kombatants;

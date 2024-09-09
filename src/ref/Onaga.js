import React, { useEffect, useState } from "react";
import "./App.css";
import charactersData from "./data";
import { useAuth } from "@clerk/clerk-react";

const Onaga = () => {
    // We set this to null for now so we can put data into this
    const [availability, setAvailbility] = useState(null);
    const [comments, setComments] = useState();
    const { getToken } = useAuth();

    useEffect(() => {
        console.log(charactersData);
        /*This look at data.js and it looks for the name of that character
        and put it into a variable called matchingData */
        const matchingData = charactersData["onaga"];
        // setAvailbility will look at matchData
        //and pull data from it
        setAvailbility(matchingData);

        const makeAPICall = async () => {
            const res = await fetch(`http://localhost:3001/comment/44`);
            const data = await res.json();
            setComments(data.comments);
        };
        makeAPICall();
    }, []);

    const commentPost = async (event) => {
        // event.preventDefault();

        const token = await getToken();
        console.log(token);

        const userComment = event.target.elements.userComment.value;

        console.log("Submitting comment:", userComment);

        const response = await fetch(`http://localhost:3001/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                userComment: userComment,
                fighterID: 44,
            }),
        });
        const data = await response.json();
        console.log(data);
    };
    // this checks if availability is not there
    // Returns Loading text
    if (!availability || !comments) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>ONAGA</h1>
            <div className="container">
                <div className="row" id="charSelect">
                    <div className="col">
                        <h2
                            id="selectable"
                            className="row justify-content-start"
                        >
                            Selectable via character selection?
                        </h2>
                        <div className="row" id="ps2">
                            PS2/Xbox{" "}
                            <span
                                id="ps2-status"
                                style={{
                                    color: availability.ps2 ? "green" : "red",
                                }}
                            >
                                {/*This checks if availabilty Ps2 is true */}
                                {/* if it is insert yes otherwise no */}
                                {availability.ps2 ? "YES" : "NO"}
                            </span>
                        </div>
                        <div className="row" id="GameCube">
                            Gamecube{" "}
                            <span
                                id="gamecube-status"
                                style={{
                                    color: availability.gamecube
                                        ? "green"
                                        : "red",
                                }}
                            >
                                {availability.gamecube ? "YES" : "NO"}
                            </span>
                        </div>
                        <div className="row" id="psp">
                            PSP{" "}
                            <span
                                id="psp-status"
                                style={{
                                    color: availability.psp ? "green" : "red",
                                }}
                            >
                                {availability.psp ? "YES" : "NO"}
                            </span>
                        </div>
                        <div className="row" id="ult">
                            Ultimate{" "}
                            <span
                                id="ultimate-status"
                                style={{
                                    color: availability.ultimate
                                        ? "green"
                                        : "red",
                                }}
                            >
                                {availability.ultimate ? "YES" : "NO"}
                            </span>
                        </div>
                    </div>
                    <div className="col" id="charaImg">
                        <img
                            src
                            require={
                                "src/img/Characters/Primary/Onaga cutout.png"
                            }
                            className="scorpion"
                            alt="Onaga"
                        />
                    </div>
                </div>
                <div className="row justify-content-end"></div>
                <div className="row">
                    <div className="col" id="bio">
                        <h1>Bio</h1>
                        <div className="row">
                            <div className="col text-center">
                                <h1>Does not have a bio</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row" id="ending">
                        <h1>Ending</h1>
                        <div className="col">
                            <div className="row text-center">
                                <h1>Does not have an ending</h1>
                            </div>
                        </div>
                    </div>
                    <h1>MOVE LIST</h1>
                    <div className="row">
                        <div>
                            <h2 className="text-center">
                                Legend:
                                <p>Default settings</p>
                            </h2>
                            <div className="row" id="controlSetup">
                                <div className="col-6" id="controlSetup">
                                    <img src="/img/controller setup.png" />
                                </div>
                                <div className="col-6" id="controlSetup">
                                    <img src="/img/xbox setup.png" />
                                </div>
                            </div>
                            <div className="row" id="controlSetup">
                                <div className="col-6" id="controlSetup">
                                    <img src="/img/gamecube setup.png" />
                                </div>
                                <div className="col-6" id="controlSetup">
                                    <img src="/img/psp setup.png" />
                                </div>
                            </div>

                            <div className="row text-center" id="buttonKey">
                                <p>1 = Attack 1</p>
                                <p>2 = Attack 2</p>
                                <p>3 = Attack 3</p>
                                <p>4 = Attack 4</p>
                                <p>u = Up</p>
                                <p>d = Down</p>
                                <p>b = Back</p>
                                <p>f = forward</p>
                                <p>
                                    grab = PS2 = R1/Xbox = RB/Gamecube = Z/PSP =
                                    2+4
                                </p>
                                <p>cs = change style</p>

                                <p>(close) = Move close to opponent</p>
                                <p>
                                    (mid) = Put some distance between you and
                                    your opponent
                                </p>
                                <p>
                                    (far) = Move back to the edge of the screen
                                </p>
                            </div>
                        </div>
                        <div className="row justify-content-center" id="stance">
                            <div
                                className="row justify-content-center"
                                id="stance"
                            >
                                <div className="col text-center justify-content-start">
                                    <h2>DRAGON</h2>
                                    <div className="row" id="stance1">
                                        <div className="col">
                                            <h3>Dragon reach</h3>
                                            <h3>Triple dragon hit</h3>
                                            <h3>Forceful hand</h3>
                                            <h3>Collar bone buster</h3>
                                            <h3>Crunch kick</h3>
                                            <h3>Groin kick</h3>
                                            <h3>Crouching dragon</h3>
                                        </div>
                                        <div className="col">
                                            <h3>1</h3>
                                            <h3>2</h3>
                                            <h3>3</h3>
                                            <h3>4</h3>
                                            <h3>d1</h3>
                                            <h3>d2</h3>
                                            <h3>d3</h3>
                                        </div>
                                        <div className="col">
                                            <h3>
                                                <a href="https://youtu.be/1pE4OazVXLQ">
                                                    link
                                                </a>
                                            </h3>
                                            <h3>
                                                <a href="https://youtu.be/_O7CdeaEqmQ">
                                                    link
                                                </a>
                                            </h3>
                                            <h3>
                                                <a href="https://youtu.be/4s8hfDdJwpM">
                                                    link
                                                </a>
                                            </h3>
                                            <h3>
                                                <a href="https://youtu.be/ZgD9L7V9r-c">
                                                    link
                                                </a>
                                            </h3>
                                            <h3>
                                                <a href="https://youtu.be/MII6zDJhX48">
                                                    link
                                                </a>
                                            </h3>
                                            <h3>
                                                <a href="https://youtu.be/6XZyvrfNPeo">
                                                    link
                                                </a>
                                            </h3>
                                            <h3>
                                                <a href="https://youtu.be/-ve1MpMT1qA">
                                                    link
                                                </a>
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h2>SPECIAL MOVES </h2>
                                        <div className="row">
                                            <div className="col">
                                                <h3>Dragon's fire</h3>
                                                <h3>Flame breath</h3>
                                                <h3>Jumping stomp</h3>
                                                <h3>Forceful doom</h3>
                                                <h3>Dirty face</h3>
                                            </div>
                                            <div className="col">
                                                <h3>f,b,1</h3>
                                                <h3>f,d,1</h3>
                                                <h3>f,f,1</h3>
                                                <h3>f,f,2(or grab)</h3>
                                                <h3>f,f,3</h3>
                                            </div>
                                            <div className="col">
                                                <h3>
                                                    <a href="https://youtu.be/Tko4hxsVGjw">
                                                        link
                                                    </a>
                                                </h3>
                                                <h3>
                                                    <a href="https://youtu.be/Oy6yubHWtYA">
                                                        link
                                                    </a>
                                                </h3>
                                                <h3>
                                                    <a href="https://youtu.be/ZQxYMzRSkn8">
                                                        link
                                                    </a>
                                                </h3>
                                                <h3>
                                                    <a href="https://youtu.be/ZcLACWV-7KE">
                                                        link
                                                    </a>
                                                </h3>
                                                <h3>
                                                    <a href="https://youtu.be/itlW16It-KM">
                                                        link
                                                    </a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" id="comments">
                                <h2>COMMENTS</h2>
                                {comments.map((comment) => {
                                    return (
                                        <p id="userComment">
                                            <strong>
                                                {comment.userComment}
                                            </strong>
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                        "
                        <div className="row">
                            <h5>Add a comment about this character:</h5>
                            <form id="comment-form" onSubmit={commentPost}>
                                <textarea
                                    placeholder="Your comment"
                                    className="form-control mb-2"
                                    id="userComment"
                                    name="userComment" // Added name attribute
                                ></textarea>
                                <div className="row">
                                    <div className="col-6">
                                        <button
                                            type="submit"
                                            id="submitButton"
                                            className="btn btn-primary"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                    <div className="col-6 text-end">
                                        <button
                                            id="clearButton"
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                document
                                                    .getElementById(
                                                        "comment-form"
                                                    )
                                                    .reset();
                                            }}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div id="disclaimer">
                                <p id="mod">Mod created by Ermaccer</p>
                                <p id="mod">
                                    I am not affiliated with the mod of any kind
                                </p>
                                <p id="mod">Background by Monster Enjoyer</p>
                                <p id="warner">
                                    Mortal Kombat: Deception was published by
                                    Midway games Mortal Kombat©, the Dragon Logo
                                    and all characters names are trademarks of
                                    Warner Bros. Entertainment Inc.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Onaga;

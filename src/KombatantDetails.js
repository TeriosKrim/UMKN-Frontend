import React, { useEffect, useState } from "react";
import "./App.css";
import charactersData from "./data";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

const KombatantDetails = () => {
    const { id } = useParams();
    // We set this to null for now so we can put data into this
    const [availability, setAvailbility] = useState(null);
    const [comments, setComments] = useState();
    const { getToken } = useAuth();
    const [kombatant, setKombatant] = useState();
    const [isPrimary, setIsPrimary] = useState(true);

    useEffect(() => {
        console.log(charactersData);
        /*This look at data.js and it looks for the name of that character
        and put it into a variable called matchingData */
        const matchingData = charactersData["scorpion"];
        // setAvailbility will look at matchData
        //and pull data from it
        setAvailbility(matchingData);

        const makeAPICall = async () => {
            const res2 = await fetch(`http://localhost:3001/kombatant/${id}`);
            const data2 = await res2.json();
            console.log(data2);
            setKombatant(data2.kombatant);

            const res = await fetch(`http://localhost:3001/comment/${id}`);
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
                fighterID: kombatant.name,
            }),
        });
        const data = await response.json();
        console.log(data);
    };
    // this checks if availability is not there
    // Returns Loading text
    if (!availability || !comments || !kombatant) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>{kombatant.name}</h1>
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
                                    color: kombatant.ps2 ? "green" : "red",
                                }}
                            >
                                {/*This checks if availabilty Ps2 is true */}
                                {/* if it is insert yes otherwise no */}
                                {kombatant.ps2 ? "YES" : "NO"}
                            </span>
                        </div>
                        <div className="row" id="GameCube">
                            Gamecube{" "}
                            <span
                                id="gamecube-status"
                                style={{
                                    color: kombatant.gamecube ? "green" : "red",
                                }}
                            >
                                {kombatant.gamecube ? "YES" : "NO"}
                            </span>
                        </div>
                        <div className="row" id="psp">
                            PSP{" "}
                            <span
                                id="psp-status"
                                style={{
                                    color: kombatant.psp ? "green" : "red",
                                }}
                            >
                                {kombatant.psp ? "YES" : "NO"}
                            </span>
                        </div>
                        <div className="row" id="ult">
                            Ultimate{" "}
                            <span
                                id="ultimate-status"
                                style={{
                                    color: kombatant.ultimate ? "green" : "red",
                                }}
                            >
                                {kombatant.ultimate ? "YES" : "NO"}
                            </span>
                        </div>
                    </div>
                    <div className="col" id="charaImg">
                        <img
                            src={`/img/Characters/${
                                isPrimary ? "Primary" : "ALT"
                            }/${kombatant.name}.png`}
                            className="scorpion"
                            alt={`${kombatant.name} costume`}
                            onClick={() => {
                                setIsPrimary(!isPrimary);
                            }}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                </div>
                <div className="row justify-content-end"></div>
                <div className="row">
                    <div className="col" id="bio">
                        <h1>Bio</h1>
                        <div className="row" id="scorpBio">
                            <div className="col text-center">
                                <img
                                    src="/img/bios/scorpionbio1.png"
                                    alt="Scorpion bio 1"
                                />
                                <img
                                    src="/img/bios/scorpionbio2.png"
                                    alt="Scorpion bio 2"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row" id="ending">
                        <h1>Ending</h1>
                        <div className="col" id="scorpEnding">
                            <div className="row text-center">
                                <iframe
                                    width="360"
                                    height="460"
                                    src="https://youtube.com/embed/3DY9wc39PZU"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    <h1>MOVE LIST</h1>
                    <div className="">
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
                            <div className="col text-center justify-content-start">
                                <h2>HAPKIDO</h2>
                                <div className="row" id="stance1">
                                    <div className="col">
                                        <h3>Flowing water</h3>
                                        <h3>Inner power</h3>
                                        <h3>Spectre blast</h3>
                                        <h3>Lethal legs</h3>
                                        <h3>Liftoff</h3>
                                        <h3>Burning soul</h3>
                                        <h3>Sinking leaf</h3>
                                        <h3>Doombringer</h3>
                                        <h3>Painless</h3>
                                        <h3>Death fingers</h3>
                                        <h3>Kruncher</h3>
                                        <h3>Flurry kicks</h3>
                                        <h3>Hell on earth</h3>
                                        <h3>Hidden string 1</h3>
                                        <h3>Hidden string 2</h3>
                                        <h3>Hidden string 3</h3>
                                    </div>
                                    <div className="col">
                                        <h3>2,2,1</h3>
                                        <h3>2,2,4</h3>
                                        <h3>3,b1</h3>
                                        <h3>4,b4</h3>
                                        <h3>4,u4</h3>
                                        <h3>2,3,u4</h3>
                                        <h3>f3,b3</h3>
                                        <h3>2,3,b1</h3>
                                        <h3>2,2,cs,1,b1</h3>
                                        <h3>2,2,cs,1,1</h3>
                                        <h3>2,2,cs,1,4</h3>
                                        <h3>2,2,cs,1,3,3,3</h3>
                                        <h3>2,2,cs,1,3,3,cs</h3>
                                        <h3>2,2,3</h3>
                                        <h3>2,2,3,cs,3,cs</h3>
                                        <h3>2,2,3,cs,3,3</h3>
                                    </div>
                                    <div className="col">
                                        <h3>
                                            <a href="https://youtu.be/h1t7jyGZycs">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/g5Ee_DOjPTo">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/CDwD95qEpL8">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/rRgEDaBdh54">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/YuQkkgTg9p4">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/uy0_pWBXZyg">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/ap_A8tOdpsI">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/iHSiLlTXEpM">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/uLew0NqkI1c">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/0A6JKeJ7NCw">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/yAyxKNJ-sEA">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/Cf1tLIHeZlw">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/QJHi5yfogWI">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/bo4ROqmSXyo">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/mUdyirNAxYg">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            <a href="https://youtu.be/PHcL7T2YZ58">
                                                link
                                            </a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h2>MOI FAH</h2>
                                <div className="row">
                                    <div className="col">
                                        <h3>Low fury</h3>
                                        <h3>Fingers of death</h3>
                                        <h3>Double tap kick</h3>
                                        <h3>Pain taps</h3>
                                        <h3>Chain kombo</h3>
                                        <h3>Sharp as hell</h3>
                                        <h3>Krazy rush</h3>
                                    </div>
                                    <div className="col">
                                        <h3>f3,3</h3>
                                        <h3>1,1,1</h3>
                                        <h3>3,3</h3>
                                        <h3>3,3,3</h3>
                                        <h3>1,1,3,3,3</h3>
                                        <h3>1,1,b1</h3>
                                        <h3>1,1,4</h3>
                                    </div>
                                    <div className="col">
                                        <h3>
                                            <a href="https://youtu.be/4p6BPoIedSU">
                                                link
                                            </a>
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/-l5lfuMACqQ">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/b6TaRxJ-TfE">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/RDaWhdV63T0">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/ioyOLXXQXQc">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/J-nt8hVtHI8">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/N4g55jC21jU">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h2>MUGAI RYU</h2>
                                <div className="row">
                                    <div className="col">
                                        <h3>Bloodfire</h3>
                                        <h3>Bloodbath</h3>
                                        <h3>Swift fire</h3>
                                    </div>
                                    <div className="col">
                                        <h3>2,2</h3>
                                        <h3>2,2,1</h3>
                                        <h3>2,2,4</h3>
                                    </div>
                                    <div className="col">
                                        <h3>
                                            {
                                                <a href="https://youtu.be/Gt0c4BSSIEA">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/mXqKs2zXq6I">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/Vvzw9xX7lIE">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h2>SPECIAL MOVES </h2>
                                <div className="row">
                                    <div className="col">
                                        <h3>Bloody spear</h3>
                                        <h3>Hellfire</h3>
                                        <h3>Backflip kick</h3>
                                        <h3>Teleport attack</h3>
                                        <h3>Fatality 1</h3>
                                        <h3>Fatality 2</h3>
                                        <h3>Hara-kiri</h3>
                                    </div>
                                    <div className="col">
                                        <h3>b,f,1</h3>
                                        <h3>d,b,2</h3>
                                        <h3>f,b,3</h3>
                                        <h3>d,b,3</h3>
                                        <h3>f,d,f,f,1(mid)</h3>
                                        <h3>f,b,f,b,1(close)</h3>
                                        <h3>d,d,u,b,1</h3>
                                    </div>
                                    <div className="col">
                                        <h3>
                                            {
                                                <a href="https://youtu.be/9u3jZEsXf5g">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/j4vBDMvRtiA">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/HbtVND0X6K0">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/FJytiYkODXY">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/YnVZeoH1S_g">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/4eIf5-qTZ0M">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                        <h3>
                                            {
                                                <a href="https://youtu.be/9l0BhYqOYIo">
                                                    link
                                                </a>
                                            }
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" id="comments">
                                <h2>COMMENTS</h2>
                                {comments.map((comment) => {
                                    return (
                                        <p
                                            id="userComment"
                                            key={comment.id}
                                            className="comment"
                                        >
                                            <span className="user-meta">
                                                <img
                                                    className="user-image"
                                                    src={
                                                        comment.userMetaData
                                                            .imageUrl
                                                    }
                                                    alt="User"
                                                />
                                                <span className="user-name">
                                                    {
                                                        comment.userMetaData
                                                            .username
                                                    }
                                                </span>
                                            </span>
                                            <strong>
                                                : {comment.userComment}
                                            </strong>
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
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
export default KombatantDetails;

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
    }, [id]);

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
                fighterID: kombatant.id,
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
                    {kombatant.misc.bio === "Has No Bio" ? null : (
                        <div className="col" id="bio">
                            <h1>Bio</h1>
                            <div className="row" id="scorpBio">
                                <div className="col text-center">
                                    <img
                                        src={`/img/bios/${kombatant.name} bio1.png`}
                                        alt={`${kombatant.name} bio 1"`}
                                    />
                                    <img
                                        src={`/img/bios/${kombatant.name} bio2.png`}
                                        alt={`${kombatant.name} bio 2"`}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        {kombatant.misc.ending === "Has No Ending" ? null : (
                            <div className="row" id="ending">
                                <h1>Ending</h1>
                                <div className="col" id="scorpEnding">
                                    <div className="row text-center">
                                        <iframe
                                            title="endingVideo"
                                            width="360"
                                            height="460"
                                            src={kombatant.misc.ending}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        )}
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
                                    <img
                                        src="/img/controller setup.png"
                                        alt="default Ps2 controller setup"
                                    />
                                </div>
                                <div className="col-6" id="controlSetup">
                                    <img
                                        src="/img/xbox setup.png"
                                        alt="default Xbox controller setup"
                                    />
                                </div>
                            </div>
                            <div className="row" id="controlSetup">
                                <div className="col-6" id="controlSetup">
                                    <img
                                        src="/img/gamecube setup.png"
                                        alt="default gamecube controller setup"
                                    />
                                </div>
                                <div className="col-6" id="controlSetup">
                                    <img
                                        src="/img/psp setup.png"
                                        alt="default psp controller setup"
                                    />
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
                                className="col text-center justify-content-start"
                                id="stance1"
                            >
                                {kombatant.stances.map((stance) => {
                                    return (
                                        <>
                                            <h2>{stance.name}</h2>
                                            <table className="move-table">
                                                <tbody>
                                                    {stance.moves.map(
                                                        (move) => {
                                                            return (
                                                                <tr
                                                                    key={
                                                                        move.id
                                                                    }
                                                                >
                                                                    <td>
                                                                        {
                                                                            move.move
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            move.button
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <a
                                                                            href={
                                                                                move.link
                                                                            }
                                                                        >
                                                                            Link
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                        <div
                            className="col text-center justify-content-start"
                            id="stance1"
                        >
                            <h2>SPECIAL MOVES</h2>
                            {/* Check if kombatant.specials exists and is an array */}
                            {kombatant.specials &&
                            kombatant.specials.length > 0 ? (
                                <table className="move-table">
                                    <tbody>
                                        {kombatant.specials.map((special) => (
                                            <tr key={special.id}>
                                                <td>{special.move}</td>
                                                <td>{special.button}</td>
                                                <td>
                                                    <a href={special.link}>
                                                        Link
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No special moves found.</p>
                            )}
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

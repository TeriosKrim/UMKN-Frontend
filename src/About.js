import "./App.css";

const About = () => {
    return (
        <>
            <div className="container">
                <div className="text-center" id="aboutMe">
                    <p>
                        Hey-0 I'm Terios krim and I made this website because I
                        love mortal kombat deception so much to a point where I
                        would play the game for hours so once I’ve learned how
                        to make websites I wanted to make one for the 3d mortal
                        kombat games the first being Ultimate Deception since I
                        haven't seen any fansite that put UMKD character into
                        them and Deception being my favorite game and also the
                        tier list are different for which version of the game
                        you are playing so I decided to add the tier list
                        section so people can rate the characters and see how
                        they stack up to each other based on the 3d mk community
                        or just want to show their friend which characters are
                        their favorite. If you are not in the 3d nexus discord
                        you should join it if you love the 3d MK games as much
                        as me.
                        <br />
                        If you have any questions or inquiries you can send me
                        an email to yayajones865@gmail.com
                        <br />
                        <a href="https://discord.com/invite/4TafRnXrcK">
                            3D Nexus discord.
                        </a>
                    </p>
                </div>
            </div>
            <div className="text-center">
                <h3>
                    You can also look for me in theses socials <br />
                    <br />
                </h3>
            </div>
            <div className="row" id="socials">
                <div className="col">
                    <img src="/img/yt.png" id="youTube" alt="Youtube link" />
                    <p>
                        <a href="youtube.com/channel/UCtQa8sWwxoB88yq3bq6cYmg">
                            Terios Krim
                        </a>
                    </p>
                </div>

                <div className="col" id="gh">
                    <img src="/img/gh.png" alt="github link" id="gitHub" />
                    <p>
                        <a href="https://github.com/TeriosKrim"> Terios krim</a>
                    </p>
                </div>
            </div>
            <div id="disclaimer">
                <p id="mod">Mod created by Ermaccer</p>
                <p id="mod">I am not affiliated with the mod of any kind</p>
                <p id="mod">Background by Monster Enjoyer</p>
                <p id="warner">
                    Mortal Kombat:Deception was published by Midway games Mortal
                    Kombat©,the Dragon Logo and all characters names are
                    trademarks of Warner Bros.Entertainment Inc.
                </p>
            </div>
        </>
    );
};

export default About;

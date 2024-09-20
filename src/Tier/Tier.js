// tier.js
import React, { useState } from "react";
import "../App.css";
// React DnD provider for drag-and-drop context
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
// Backend for HTML5 drag-and-drop support
import { HTML5Backend } from "react-dnd-html5-backend";
// Importing the DropTarget component
import DropTarget from "./DropTarget";

const Tier = () => {
    // Initial state for tiers, each tier is an array of items
    const initialTiers = {
        S: [],
        A: [],
        B: [],
        C: [],
        D: [],
        F: [],
    };
    // Initial state for the character pool, a list of character objects with id, name, image, and versions
    const initialCharacterPool = [
        {
            id: "Kenshi",
            name: "Kenshi",
            image: "/img/Characters/icon/Kenshi.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Jade",
            name: "Jade",
            image: "/img/Characters/icon/Jade.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Scorpion",
            name: "Scorpion",
            image: "img/Characters/icon/Scorpion.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Mileena",
            name: "Mileena",
            image: "img/Characters/icon/mileena.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Baraka",
            name: "Baraka",
            image: "img/Characters/icon/Baraka.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Sub-Zero",
            name: "Sub-Zero",
            image: "img/Characters/icon/Sub-Zero.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Havik",
            name: "Havik",
            image: "img/Characters/icon/Havik.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Sindel",
            name: "Sindel",
            image: "img/Characters/icon/Sindel.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Raiden",
            name: "Raiden",
            image: "img/Characters/icon/Raiden.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Li-Mei",
            name: "Li-Mei",
            image: "img/Characters/icon/Li-mei.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Kabal",
            name: "Kabal",
            image: "img/Characters/icon/Kabal.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Ermac",
            name: "Ermac",
            image: "img/Characters/icon/Ermac.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Nightwolf",
            name: "Nightwolf",
            image: "img/Characters/icon/Nightwolf.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Bo rai cho",
            name: "Bo rai cho",
            image: "img/Characters/icon/Bo rai cho.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Noob-Smoke",
            name: "Noob-Smoke",
            image: "img/Characters/icon/Noob-Smoke.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Tanya",
            name: "Tanya",
            image: "img/Characters/icon/Tanya.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Shujinko",
            name: "Shujinko",
            image: "img/Characters/icon/Shujinko.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Hotaru",
            name: "Hotaru",
            image: "img/Characters/icon/Hotaru.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Ashrah",
            name: "Ashrah",
            image: "img/Characters/icon/Ashrah.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Dairou",
            name: "Dairou",
            image: "img/Characters/icon/Dairou.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Kobra",
            name: "Kobra",
            image: "img/Characters/icon/Kobra.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Darrius",
            name: "Darrius",
            image: "img/Characters/icon/Darrius.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Kira",
            name: "Kira",
            image: "img/Characters/icon/Kira.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Liu Kang",
            name: "Liu Kang",
            image: "img/Characters/icon/Liu Kang.png",
            versions: ["PS2/Xbox", "Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Shao Khan",
            name: "Shao Khan",
            image: "img/Characters/icon/Shao Khan.png",
            versions: ["Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Goro",
            name: "Goro",
            image: "img/Characters/icon/Goro.png",
            versions: ["Gamecube", "PSP", "Ultimate"],
        },
        {
            id: "Blaze",
            name: "Blaze",
            image: "img/Characters/icon/Blaze.png",
            versions: ["PSP", "Ultimate"],
        },
        {
            id: "Frost",
            name: "Frost",
            image: "img/Characters/icon/Frost.png",
            versions: ["PSP", "Ultimate"],
        },
        {
            id: "Jax",
            name: "Jax",
            image: "img/Characters/icon/Jax.png",
            versions: ["PSP", "Ultimate"],
        },
        {
            id: "Kitana",
            name: "Kitana",
            image: "img/Characters/icon/Kitana.png",
            versions: ["PSP", "Ultimate"],
        },
        {
            id: "Sonya",
            name: "Sonya",
            image: "img/Characters/icon/Sonya.png",
            versions: ["Ultimate"],
        },
        {
            id: "Drahmin",
            name: "Drahmin",
            image: "img/Characters/icon/Drahmin.png",
            versions: ["Ultimate"],
        },
        {
            id: "Sareena",
            name: "Sareena",
            image: "img/Characters/icon/Sareena.png",
            versions: ["Ultimate"],
        },
        {
            id: "Quan Chi",
            name: "Quan Chi",
            image: "img/Characters/icon/Quan chi.png",
            versions: ["Ultimate"],
        },
        {
            id: "Shang Tsung",
            name: "Shang Tsung",
            image: "img/Characters/icon/Shang tsung.png",
            versions: ["Ultimate"],
        },
        {
            id: "Kung Lao",
            name: "Kung Lao",
            image: "img/Characters/icon/Kung Lao.png",
            versions: ["Ultimate"],
        },
        {
            id: "Johnny Cage",
            name: "Johnny Cage",
            image: "img/Characters/icon/Johnny cage.png",
            versions: ["Ultimate"],
        },
        {
            id: "Sektor",
            name: "Sektor",
            image: "img/Characters/icon/Sektor.png",
            versions: ["Ultimate"],
        },
        {
            id: "Nitara",
            name: "Nitara",
            image: "img/Characters/icon/Nitara.png",
            versions: ["Ultimate"],
        },
        {
            id: "Rain",
            name: "Rain",
            image: "img/Characters/icon/Rain.png",
            versions: ["Ultimate"],
        },
        {
            id: "Cyrax",
            name: "Cyrax",
            image: "img/Characters/icon/Cyrax.png",
            versions: ["Ultimate"],
        },
        {
            id: "Reiko",
            name: "Reiko",
            image: "img/Characters/icon/Reiko.png",
            versions: ["Ultimate"],
        },
        {
            id: "Tremor",
            name: "Tremor",
            image: "img/Characters/icon/tremor.png",
            versions: ["Ultimate"],
        },
        {
            id: "Onaga",
            name: "Onaga",
            image: "img/Characters/icon/Onaga.png",
            versions: ["Ultimate"],
        },
    ];
    // State to hold the current tier lists
    const [tiers, setTiers] = useState(initialTiers);
    // State to hold the current character pool
    const [characterPool, setCharacterPool] = useState(initialCharacterPool);

    // Function to handle dropping an item into a tier
    const handleDrop = (itemId, targetTier) => {
        // Find the item in the character pool or tiers
        let item;
        // Check if the item is in the character pool
        if (characterPool.some((character) => character.id === itemId)) {
            item = characterPool.find((character) => character.id === itemId);
            setCharacterPool((prev) =>
                prev.filter((character) => character.id !== itemId)
            );
        } else {
            // If not in the character pool, find and remove it from its current tier
            for (const tier in tiers) {
                if (tiers[tier].some((character) => character.id === itemId)) {
                    item = tiers[tier].find(
                        (character) => character.id === itemId
                    );
                    setTiers((prev) => ({
                        ...prev,
                        [tier]: prev[tier].filter(
                            (character) => character.id !== itemId
                        ),
                    }));
                    break;
                }
            }
        }

        // Add the item to the target tier if found
        if (item && targetTier !== "characterPool") {
            setTiers((prev) => ({
                ...prev,
                [targetTier]: [...prev[targetTier], item],
            }));
        } else if (item && targetTier === "characterPool") {
            setCharacterPool((prev) => [...prev, item]);
        }
    };

    // Function to reset the characters back to the initial state
    const resetCharacters = () => {
        setTiers(initialTiers);
        setCharacterPool(initialCharacterPool);
    };

    function isTouchDevice() {
        return (
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0
        );
    }

    return (
        <>
            <div className="container">
                <h1>Tier List</h1>
                <DndProvider
                    backend={isTouchDevice() ? TouchBackend : HTML5Backend}
                >
                    <div className="tier-container">
                        {Object.keys(tiers).map((tier) => (
                            <div
                                key={tier}
                                style={{}}
                                className={`tier tier-${tier}`}
                            >
                                <h2>{tier} Tier</h2>
                                <DropTarget
                                    items={tiers[tier]}
                                    onDrop={(itemId) =>
                                        handleDrop(itemId, tier)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <div className="character-pool">
                        <h2>Characters</h2>
                        <DropTarget
                            items={characterPool}
                            onDrop={(itemId) =>
                                handleDrop(itemId, "characterPool")
                            }
                        />
                        <button
                            onClick={resetCharacters}
                            className="reset-button"
                        >
                            Reset Characters
                        </button>
                    </div>
                </DndProvider>
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
        </>
    );
};

export default Tier;

import "./Overlay.css";
import lemur from "./assets/lemur.png"
import {useEffect, useState} from "react";
import {initializeApp} from "firebase/app"
import {getDatabase, ref, onValue} from "firebase/database"

type Player = {
    name: string,
    life: string,
    wins: string,
    deck: string,
    record: string,
}

function Overlay() {
    const [data, setData] = useState([])

    useEffect(() => {
        const app = initializeApp({
            "apiKey": `${import.meta.env.VITE_FIREBASE_API_KEY}`,
            "authDomain": `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
            "databaseURL": `${import.meta.env.VITE_FIREBASE_DATABASE_URL}`,
            "projectId": `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
            "storageBucket": `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_NAME}`,
            "messagingSenderId": `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
            "appId": `${import.meta.env.VITE_FIREBASE_APP_ID}`,
        });
        const db = getDatabase(app);

        const matchData = ref(db, "matchData")

        const fetchData = () => {
            // Listen for changes in the collection
            onValue(matchData, (snapshot) => {
                const dataItem = snapshot.val();

                // Check if dataItem exists
                if (dataItem) {
                    // Convert the object values into an array
                    const displayItem = Object.values(dataItem);
                    // @ts-expect-error patata
                    setData(displayItem);
                }
            });
        };

        // Fetch data when the component mounts
        fetchData();


    }, [])

    console.log(data)

    const player1: Player = data[0];
    const player2: Player = data[1];
    const round = data[2];

    if (!player1 || !player2) {
        return <>init</>
    }


    return (
        <div className="overlay-container">
            <div className={"overlay-top"}>
                <div className={"player"}>
                    <div className={"player-data"}>
                        <div className={"player-data-top"}>{player1.name}</div>
                        <div className={"player-data-bottom"}>
                            <div className={"player-deck"}>{player1.deck}</div>
                            <div className={"divider"}>|</div>
                            <div className={"player-record"}>{player1.record}</div>
                        </div>
                    </div>

                </div>
                <div className={"match-data"}>
                    <div className={"player-tracking"}>
                        {/*<div className={"player-play-draw"}>DRAW</div>*/}
                        <div className={"player-life-total"}>{player1.life}</div>
                        <div className={"player-wins"}>{player1.wins}</div>
                    </div>
                    <div className={"round-timer"}>
                        {/*<div className={"timer"}>45:54</div>*/}
                        <div className={"round"}>{round}</div>
                    </div>
                    <div className={"player-tracking"}>
                        <div className={"player-wins"}>{player2.wins}</div>
                        <div className={"player-life-total"}>{player2.life}</div>
                        {/*<div className={"player-play-draw"}>PLAY</div>*/}
                    </div>
                </div>
                <div className={"player"}>

                    <div className={"player-data"}>
                        <div className={"player-data-top"} style={{textAlign: "right"}}>{player2.name}</div>
                        <div className={"player-data-bottom"} style={{justifyContent: "flex-end"}}>
                            <div className={"player-record"}>{player2.record}</div>
                            <div className={"divider"}>|</div>
                            <div className={"player-deck"}>{player2.deck}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"overlay-bottom"}>
                <div className={"location"}>O Cascabullo, Ourense</div>
                <div className={"logo"}><img src={lemur} height={90} width={100}  alt=""/></div>
            </div>
        </div>
    )
}

export default Overlay

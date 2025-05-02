import "./Controls.css";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";

type Player = {
    name: string;
    life: number;
    wins: number;
    deck: string;
    record: string;
};

function Controls() {
    const [data, setData] = useState<Player[]>([]);
    const [db, setDb] = useState<any>(null);
    const [matchDataRef, setMatchDataRef] = useState<any>(null);

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
        const database = getDatabase(app);
        setDb(database);
        const matchData = ref(database, "matchData");
        setMatchDataRef(matchData);

        const fetchData = () => {
            onValue(matchData, (snapshot) => {
                const dataItem = snapshot.val();

                if (dataItem) {
                    const displayItem: Player[] = Object.values(dataItem);
                    setData(displayItem);
                }
            });
        };

        fetchData();
    }, []);

    const updateValue = (playerId: string, type: "life" | "wins", change: number) => {
        console.log("updateValue", playerId, type, change);
        const parsedPlayerId = playerId === "player1" ? "0" : "1";
        if (db && matchDataRef && data[parsedPlayerId]) {
            const updatedValue = (data[parsedPlayerId][type] || 0) + change;
            set(ref(db, `matchData/${playerId}/${type}`), updatedValue);
        }
    };

    const player1 = data[0];
    const player2 = data[1];

    if (!player1 || !player2) {
        return <>init</>;
    }

    return (
        <div className={"controls"}>
            <div className={"player player1"}>
                <div className={"name"}>{player1.name}</div>
                <div className={"wins"}>
                    <button className={"control-sm"} onClick={() => updateValue("player1", "wins", -1)}>
                        -
                    </button>
                    <div>{player1.wins}</div>
                    <button className={"control-sm"} onClick={() => updateValue("player1", "wins", 1)}>
                        +
                    </button>
                </div>
                <div className={"life"}>
                    <button className={"control"} onClick={() => updateValue("player1", "life", -1)}>
                        -
                    </button>
                    <div>{player1.life}</div>
                    <button className={"control"} onClick={() => updateValue("player1", "life", 1)}>
                        +
                    </button>
                </div>
            </div>
            <div className={"player player2"}>
                <div className={"name"}>{player2.name}</div>
                <div className={"wins"}>
                    <button className={"control-sm"} onClick={() => updateValue("player2", "wins", -1)}>
                        -
                    </button>
                    <div>{player2.wins}</div>
                    <button className={"control-sm"} onClick={() => updateValue("player2", "wins", 1)}>
                        +
                    </button>
                </div>
                <div className={"life"}>
                    <button className={"control"} onClick={() => updateValue("player2", "life", -1)}>
                        -
                    </button>
                    <div>{player2.life}</div>
                    <button className={"control"} onClick={() => updateValue("player2", "life", 1)}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Controls;
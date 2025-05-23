import "./PlayerControls.css";
import {useMatchData} from "../../hooks/useMatchData.tsx";


function PlayerControls() {
    const {matchData, updatePlayer} = useMatchData();
    const {player1, player2} = matchData;

    const updateValue = (a: string, b: string, c: any) => {
    }

    if (!player1 || !player2) {
        return <>init</>;
    }

    return (
        <div className={"controls"}>
            <div className={"player player1"}>
                <div className={"name"}>{player1.name}</div>
                <div className={"wins"}>
                    <button className={"control-sm"}
                            onClick={() => updatePlayer('player1', {...player1, wins: player1 ? player1.wins - 1 : 0})}>
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

export default PlayerControls;
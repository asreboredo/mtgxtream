import "./Overlay.css";
import lemur from "./assets/lemur.png"
import {useMatchData} from "./hooks/useMatchData.tsx";


function Overlay() {

    const {matchData} = useMatchData()
    const {player1, player2, round} = matchData;

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
                <div className={"logo"}><img src={lemur} height={90} width={100} alt=""/></div>
            </div>
        </div>
    )
}

export default Overlay

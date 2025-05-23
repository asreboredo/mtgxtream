import "./PlayerControls.css";
import {useMatchData} from "../../../hooks/useMatchData.tsx";
import PlayerControl from "./PlayerControl/PlayerControl.tsx";
import ResetButton from "./ResetButton/ResetButton.tsx";
import {useFullscreen} from "@reactuses/core";
import {useRef} from "react";
import {Fullscreen} from "../../common/Fullscreen.tsx";

function PlayerControls() {
    const {matchData, updatePlayer} = useMatchData();
    const {player1, player2} = matchData;
    const ref = useRef<HTMLDivElement>(null);
    const [isFullscreen, {toggleFullscreen}] = useFullscreen(ref)

    console.log('fullscreen', isFullscreen)


    if (!player1 || !player2) {
        return <>init</>;
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'black',
            width: '100%',
            height: '100%'
        }}>
            <button onClick={toggleFullscreen}
                    style={{height: 80, display: 'flex', alignItems: 'center', padding: 10, justifyContent: 'center'}}>
                <Fullscreen></Fullscreen>
            </button>
            <div ref={ref}>
                <div className={"player-controls"}>
                    <PlayerControl player={player1} updatePlayer={updatePlayer} position={"left"}></PlayerControl>
                    <ResetButton></ResetButton>
                    <PlayerControl player={player2} updatePlayer={updatePlayer} position={"right"}></PlayerControl>
                </div>
            </div>

        </div>

    );
}

export default PlayerControls;
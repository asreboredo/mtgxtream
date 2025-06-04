import "./PlayerControls.css";
import {useMatchData} from "../../../hooks/useMatchData.tsx";
import PlayerControl from "./PlayerControl/PlayerControl.tsx";
import ResetButton from "./ResetButton/ResetButton.tsx";
import {useFullscreen} from "@reactuses/core";
import {useEffect, useRef} from "react";
import {Fullscreen} from "../../common/Fullscreen.tsx";
import {useWakeLock} from "react-screen-wake-lock";

function PlayerControls() {
    const {matchData, updatePlayer} = useMatchData();
    const {player1, player2, timer} = matchData;
    const ref = useRef<HTMLDivElement>(null);
    const [isFullscreen, {toggleFullscreen}] = useFullscreen(ref)
    const {request, release} = useWakeLock({
        onError: (error) => {
            alert(`Wake lock unsuccessful!, ${error.message}`);
        },
    })

    console.log('fullscreen', isFullscreen)

    useEffect(() => {
        if (isFullscreen) {
            request();
        } else {
            release();
        }
    }, [isFullscreen, release, request])


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
            <div ref={ref} style={{background: 'black'}}>
                <div className={"player-controls"}>
                    <PlayerControl timer={timer} player={player1} updatePlayer={updatePlayer}
                                   position={"left"}></PlayerControl>
                    <ResetButton></ResetButton>
                    <PlayerControl timer={timer} player={player2} updatePlayer={updatePlayer}
                                   position={"right"}></PlayerControl>
                </div>
            </div>

        </div>

    );
}

export default PlayerControls;
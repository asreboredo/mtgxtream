import "./PlayerControls.css";
import {useMatchData} from "../../../hooks/useMatchData.tsx";
import PlayerControl from "./PlayerControl/PlayerControl.tsx";
import ResetButton from "./ResetButton/ResetButton.tsx";

function PlayerControls() {
    const {matchData, updatePlayer} = useMatchData();
    const {player1, player2} = matchData;


    if (!player1 || !player2) {
        return <>init</>;
    }

    return (
        <div className={"player-controls"}>
            <PlayerControl player={player1} updatePlayer={updatePlayer} position={"left"}></PlayerControl>
            <ResetButton></ResetButton>
            <PlayerControl player={player2} updatePlayer={updatePlayer} position={"right"}></PlayerControl>
        </div>
    );
}

export default PlayerControls;
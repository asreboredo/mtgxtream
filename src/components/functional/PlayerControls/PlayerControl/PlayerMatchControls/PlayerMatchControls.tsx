import "./PlayerMatchControls.css";
import {Player} from "../../../../../types/Player.ts";
import {useMatchData} from "../../../../../hooks/useMatchData.tsx";
import {useMemo} from "react";

type Props = {
    player: Player;
    position: 'left' | 'right'
}

function PlayerMatchControls(props: Props) {
    const {matchData} = useMatchData();
    const {playerGameWins} = matchData;

    const coalescedPlayerGameWins = useMemo(() => playerGameWins || [null, null, null], [playerGameWins])

    return (<div className={`player-match-controls ${props.position}`}>
        <div className={'game-win-indicators'}>
            {coalescedPlayerGameWins?.map((pw, index) =>
                <button>{pw === null ? `G${index + 1}` : pw === props.player.id ? `W${index + 1}` : `L${index + 1}`}</button>)}
        </div>
    </div>)
}

export default PlayerMatchControls;
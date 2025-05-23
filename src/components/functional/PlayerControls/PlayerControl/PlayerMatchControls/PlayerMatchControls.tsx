import "./PlayerMatchControls.css";
import {Player} from "../../../../../types/Player.ts";
import {PlayerGameWin, useMatchData} from "../../../../../hooks/useMatchData.tsx";
import {useCallback, useMemo} from "react";

type Props = {
    player: Player;
    position: 'left' | 'right'
}

function PlayerMatchControls(props: Props) {
    const {matchData, updatePlayerWins} = useMatchData();
    const {playerGameWins} = matchData;

    const coalescedPlayerGameWins: PlayerGameWin[] = useMemo(() => playerGameWins || ["unplayed", "unplayed", "unplayed"], [playerGameWins])

    const onClicky = useCallback((index: number, value: PlayerGameWin) => {
        const wihResetVal = coalescedPlayerGameWins[index] === value ? 'unplayed' : value;
        updatePlayerWins({
            ...coalescedPlayerGameWins,
            [index]: wihResetVal
        })
    }, [coalescedPlayerGameWins, updatePlayerWins])

    return (<div className={`player-match-controls ${props.position}`}>
        <div className={'game-win-indicators'}>
            {coalescedPlayerGameWins?.map((pw, index) =>
                <button
                    onClick={() => onClicky(index, props.player.id)}>
                    {pw === 'unplayed' ? `G${index + 1}` : pw === props.player.id ? `W${index + 1}` : `L${index + 1}`}
                </button>)}
        </div>
    </div>)
}

export default PlayerMatchControls;
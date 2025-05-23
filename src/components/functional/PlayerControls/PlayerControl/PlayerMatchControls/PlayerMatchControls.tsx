import "./PlayerMatchControls.css";
import {Player} from "../../../../../types/Player.ts";

type Props = {
    player: Player;
    updatePlayer: (player: Player, updatePlayer: (p: Player) => Player) => void,
    position: 'left' | 'right'
}

function PlayerMatchControls(props: Props) {
    return (<div className={`player-match-controls ${props.position}`}>
        <div className={'game-win-indicators'}>
            <button className={'win'}>G1</button>
            <button className={'loss'}>G2</button>
            <button>G3</button>
        </div>
    </div>)
}

export default PlayerMatchControls;
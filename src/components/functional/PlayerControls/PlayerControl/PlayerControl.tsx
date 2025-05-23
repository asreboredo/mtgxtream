import "./PlayerControl.css";
import {Player} from "../../../../types/Player.ts";
import {TopRightIndicator} from "../../../common/TopRightIndicator.tsx";
import {TopLeftIndicator} from "../../../common/TopLeftIndicator.tsx";
import PlayerMatchControls from "./PlayerMatchControls/PlayerMatchControls.tsx";


const updatePlayerWins = (p: Player, change: number): Player => ({...p, wins: p.wins + change})
const updatePlayerLife = (p: Player, change: number): Player => ({...p, life: p.life + change})


type Props = {
    player: Player;
    updatePlayer: (player: Player, updatePlayer: (p: Player) => Player) => void,
    position: 'left' | 'right'
}

function PlayerControl(props: Props) {
    const {player, updatePlayer, position} = props;


    if (!player) {
        return <>Loading...</>;
    }

    return (
        <div className={`player player-${position}`}>
            <PlayerMatchControls {...props}></PlayerMatchControls>
            <div className={'player-inner'}>
                <div className={`name ${position}`}>{player.name} {position === 'right' ?
                    <TopRightIndicator></TopRightIndicator> :
                    <TopLeftIndicator></TopLeftIndicator>}
                </div>
                <div className={"wins"}>
                    <button className={"control-sm"}
                            onClick={() => updatePlayer(player, (p) => updatePlayerWins(p, -1))}>
                        -
                    </button>
                    <div>{player.wins}</div>
                    <button className={"control-sm"}
                            onClick={() => updatePlayer(player, (p) => updatePlayerWins(p, 1))}>
                        +
                    </button>
                </div>
                <div className={"life"}>
                    <button className={"control"} onClick={() => updatePlayer(player, (p) => updatePlayerLife(p, -1))}>
                        -
                    </button>
                    <div>{player.life}</div>
                    <button className={"control"} onClick={() => updatePlayer(player, (p) => updatePlayerLife(p, 1))}>
                        +
                    </button>
                </div>
            </div>

        </div>
    );
}

export default PlayerControl;
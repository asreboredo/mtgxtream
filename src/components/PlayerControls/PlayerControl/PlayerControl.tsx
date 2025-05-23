import "./PlayerControl.css";
import {Player} from "../../../types/Player.ts";


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
            <div className={"name"}>{player.name}</div>
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
    );
}

export default PlayerControl;
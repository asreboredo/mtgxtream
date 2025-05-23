import {Player} from "./Player.ts";
import {PlayerGameWin} from "../hooks/useMatchData.tsx";

type PlayerGameWins = PlayerGameWin[]

export type MatchData = {
    player1?: Player;
    player2?: Player;
    round?: string;
    playerGameWins?: PlayerGameWins;
}


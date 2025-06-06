import {Player} from "./Player.ts";
import {PlayerGameWin} from "../hooks/useMatchData.tsx";

type PlayerGameWins = PlayerGameWin[]
export type Timer = {
    minutes: number;
    startAt?: number | string;
}

export type MatchData = {
    player1?: Player;
    player2?: Player;
    round?: string;
    playerGameWins?: PlayerGameWins;
    timer: Timer
}


import {Player} from "./Player.ts";
import {MatchDataPlayerKey} from "../hooks/useMatchData.tsx";

type PlayerGameWins = MatchDataPlayerKey[]

export type MatchData = {
    player1?: Player;
    player2?: Player;
    round?: string;
    playerGameWins?: PlayerGameWins;
}


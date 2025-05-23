import {MatchDataPlayerKey} from "../hooks/useMatchData.tsx";

export type Player = {
    id: MatchDataPlayerKey,
    name: string,
    life: number,
    wins: number,
    deck: string,
    record: string,
}
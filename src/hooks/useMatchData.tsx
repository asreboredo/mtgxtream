import {useCallback, useEffect, useReducer, useState} from "react";
import {DatabaseReference, DataSnapshot, onValue, ref, set} from "firebase/database";
import useFirebaseAppContext from "./useFirebaseAppContext.tsx";

import {MatchData} from "../types/MatchData.ts";
import {Player} from "../types/Player.ts";

const MATCH_DATA_REFERENCE = 'matchData';
const MatchDataReferenceRoutes = {
    PLAYER_1: `${MATCH_DATA_REFERENCE}/player1`,
    PLAYER_2: `${MATCH_DATA_REFERENCE}/player2`,
    ROUND: `${MATCH_DATA_REFERENCE}/round`,
    PLAYER_GAME_WINS: `${MATCH_DATA_REFERENCE}/playerGameWins`,
};

type MatchDataReferences = {
    player1: DatabaseReference;
    player2: DatabaseReference;
    round: DatabaseReference;
    playerGameWins: DatabaseReference;
};

type MatchDataKey = keyof MatchDataReferences;
export type MatchDataPlayerKey = "player1" | "player2";

type MatchDataAction =
    | { type: 'SET_PLAYER_DATA'; payload: { key: MatchDataKey; data: Player } }
    | { type: 'SET_ROUND_DATA'; payload: string }
    | { type: 'PLAYER_GAME_WINS'; payload: MatchDataPlayerKey[] };

type MatchDataState = MatchData;

const matchDataReducer = (state: MatchDataState, action: MatchDataAction): MatchDataState => {
    switch (action.type) {
        case 'SET_PLAYER_DATA':
            return {...state, [action.payload.key]: action.payload.data};
        case 'SET_ROUND_DATA':
            return {...state, round: action.payload};
        case 'PLAYER_GAME_WINS':
            return {...state, playerGameWins: action.payload};
        default:
            return state;
    }
};

const resetLife = (p: Player) => {
    return {...p, life: 20};
}

export const useMatchData = () => {
    const {db} = useFirebaseAppContext();
    const [matchData, dispatch] = useReducer(matchDataReducer, {});
    const [matchDataRefs, setMatchDataRefs] = useState<MatchDataReferences | null>(null);

    const onPlayerSnapshot = useCallback((playerKey: MatchDataKey, snapshot: DataSnapshot) => {
        const playerData = snapshot.val();
        if (playerData) {
            dispatch({type: 'SET_PLAYER_DATA', payload: {key: playerKey, data: playerData}});
        }
    }, []);

    const onRoundSnapshot = useCallback((snapshot: DataSnapshot) => {
        const roundData = snapshot.val();
        if (roundData) {
            dispatch({type: 'SET_ROUND_DATA', payload: roundData});
        }
    }, []);

    const onPlayerGameWinsSnapshot = useCallback((snapshot: DataSnapshot) => {
        const roundData = snapshot.val();
        if (roundData) {
            dispatch({type: 'PLAYER_GAME_WINS', payload: roundData});
        }
    }, []);

    const updatePlayer = useCallback((playerId: Player, neValueFn: (p: Player) => Player) => {
        if (!db || !matchDataRefs || !matchDataRefs[playerId.id]) {
            return;
        }

        set(matchDataRefs[playerId.id], neValueFn(matchData[playerId.id]!));
    }, [db, matchData, matchDataRefs]);

    const resetLifeTotals = useCallback(() => {
        if (!matchData.player1 || !matchData.player2) {
            return;
        }

        updatePlayer(matchData.player1, resetLife);
        updatePlayer(matchData.player2, resetLife);

    }, [matchData.player1, matchData.player2, updatePlayer])


    useEffect(() => {
        if (!db) {
            return;
        }

        const p1ref = ref(db, MatchDataReferenceRoutes.PLAYER_1);
        const p2ref = ref(db, MatchDataReferenceRoutes.PLAYER_2);
        const roundRef = ref(db, MatchDataReferenceRoutes.ROUND);
        const playerWinsRef = ref(db, MatchDataReferenceRoutes.PLAYER_GAME_WINS);
        setMatchDataRefs({
            player1: p1ref,
            player2: p2ref,
            round: roundRef,
            playerGameWins: playerWinsRef
        });
    }, [db]);

    useEffect(() => {
        if (!matchDataRefs) {
            return;
        }

        const {player1, player2, round, playerGameWins} = matchDataRefs;

        const unsubscribePlayer1 = onValue(player1, (snapshot) => onPlayerSnapshot("player1", snapshot));
        const unsubscribePlayer2 = onValue(player2, (snapshot) => onPlayerSnapshot("player2", snapshot));
        const unsubscribeRound = onValue(round, onRoundSnapshot);
        const unsubscribeGameWins = onValue(playerGameWins, onPlayerGameWinsSnapshot);

        return () => {
            unsubscribePlayer1();
            unsubscribePlayer2();
            unsubscribeRound();
            unsubscribeGameWins();
        };
    }, [matchDataRefs, onPlayerGameWinsSnapshot, onPlayerSnapshot, onRoundSnapshot]);

    return {matchData, updatePlayer, resetLifeTotals};
};
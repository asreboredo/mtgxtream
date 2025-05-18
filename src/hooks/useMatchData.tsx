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
};

type MatchDataReferences = {
    player1: DatabaseReference;
    player2: DatabaseReference;
    round: DatabaseReference;
};

type MatchDataKey = keyof MatchData;

type MatchDataAction =
    | { type: 'SET_PLAYER_DATA'; payload: { key: MatchDataKey; data: Player } }
    | { type: 'SET_ROUND_DATA'; payload: string };

type MatchDataState = MatchData;

const matchDataReducer = (state: MatchDataState, action: MatchDataAction): MatchDataState => {
    switch (action.type) {
        case 'SET_PLAYER_DATA':
            return {...state, [action.payload.key]: action.payload.data};
        case 'SET_ROUND_DATA':
            return {...state, round: action.payload};
        default:
            return state;
    }
};

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

    const updatePlayer = useCallback((playerId: MatchDataKey, newValue: Player) => {
        if (!db || !matchDataRefs || !matchDataRefs[playerId]) {
            return;
        }

        set(matchDataRefs[playerId], newValue);
    }, [db, matchDataRefs]);

    useEffect(() => {
        if (!db) {
            return;
        }

        const p1ref = ref(db, MatchDataReferenceRoutes.PLAYER_1);
        const p2ref = ref(db, MatchDataReferenceRoutes.PLAYER_2);
        const roundRef = ref(db, MatchDataReferenceRoutes.ROUND);
        setMatchDataRefs({
            player1: p1ref,
            player2: p2ref,
            round: roundRef,
        });
    }, [db]);

    useEffect(() => {
        if (!matchDataRefs) {
            return;
        }

        const {player1, player2, round} = matchDataRefs;

        const unsubscribePlayer1 = onValue(player1, (snapshot) => onPlayerSnapshot("player1", snapshot));
        const unsubscribePlayer2 = onValue(player2, (snapshot) => onPlayerSnapshot("player2", snapshot));
        const unsubscribeRound = onValue(round, onRoundSnapshot);

        return () => {
            unsubscribePlayer1();
            unsubscribePlayer2();
            unsubscribeRound();
        };
    }, [matchDataRefs, onPlayerSnapshot, onRoundSnapshot]);

    return {matchData, updatePlayer};
};
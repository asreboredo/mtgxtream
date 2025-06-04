import {Timer} from "../../types/MatchData.ts";
import {useCallback, useEffect, useMemo, useState} from "react";

export const TimerRender = (props: { timer: Timer }) => {
    const {timer} = props;
    const {
        minutes, startAt
    } = timer;

    const startDate = useMemo(() => new Date((startAt || 0) * 1000), [startAt]);


    const [remainingTimeMillis, setRemainingTimeMillis] = useState(0);

    // Memoize the calculation of the end time to avoid re-calculating on every render
    const endTime = useCallback(() => {
        const durationMs = minutes * 60 * 1000;
        return startDate.getTime() + durationMs;
    }, [startDate, minutes]);

    useEffect(() => {

        const calculateTimeRemaining = () => {
            const now = new Date().getTime();
            const timeRemainingMs = endTime() - now;
            setRemainingTimeMillis(timeRemainingMs);
        };

        calculateTimeRemaining();

        const intervalId = setInterval(calculateTimeRemaining, 1000);
        return () => clearInterval(intervalId);
    }, [startDate, endTime]);

    const getFormattedTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(Math.abs(totalSeconds) / 60);
        const seconds = Math.abs(totalSeconds) % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${ms < 0 ? '-' : ''}${formattedMinutes}:${formattedSeconds}`;
    };

    if (!startAt) {
        return '--:--';
    }

    return (
        <span>{getFormattedTime(remainingTimeMillis)}</span>
    );
}
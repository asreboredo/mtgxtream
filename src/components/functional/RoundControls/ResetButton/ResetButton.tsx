import "./ResetButton.css";
import {useMatchData} from "../../../../hooks/useMatchData.tsx";
import {Reset} from "../../../common/Reset.tsx";
import {TimerRender} from "../../../common/TimerRender.tsx";


function ResetButton() {
    const {resetLifeTotals, matchData} = useMatchData();
    const {timer} = matchData;

    if (!timer) {
        return null;
    }


    return (
        <div className={"reset-container"}>
            <div className={'controls-timer'}><TimerRender timer={timer}/></div>
            <button onClick={resetLifeTotals} className={"reset-button"}>
                <Reset></Reset>

            </button>
            <div className={'controls-timer'} style={{transform: 'scale(-1, -1)'}}><TimerRender timer={timer}/>
            </div>
        </div>
    );
}

export default ResetButton;
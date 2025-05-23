import "./ResetButton.css";
import {useMatchData} from "../../../../hooks/useMatchData.tsx";
import {Reset} from "../../../common/Reset.tsx";


function ResetButton() {
    const {resetLifeTotals} = useMatchData();


    return (
        <div className={"reset-container"}>
            <button onClick={resetLifeTotals} className={"reset-button"}>
                <Reset></Reset>
            </button>
        </div>
    );
}

export default ResetButton;
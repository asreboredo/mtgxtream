import "./ResetButton.css";
import {useMatchData} from "../../../../hooks/useMatchData.tsx";


function ResetButton() {
    const {resetLifeTotals} = useMatchData();


    return (
        <div className={"reset-container"}>
            <button onClick={resetLifeTotals} className={"reset-button"}>
                <span>RESET LIFE TOTALS</span>
                <span> |</span>
                <span className={"inverse"}>RESET LIFE TOTALS</span>
            </button>
        </div>
    );
}

export default ResetButton;
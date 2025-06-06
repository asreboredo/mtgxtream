import "./RoundControls.css";
import {useMatchData} from "../../../hooks/useMatchData.tsx";

function RoundControls() {
    const {startTimer, removeTimer} = useMatchData();


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'black',
            width: '100%',
            height: '100%'
        }}>
            <button onClick={removeTimer}
                    style={{height: 80, display: 'flex', alignItems: 'center', padding: 10, justifyContent: 'center'}}>
                Remove timer
            </button>
            <button onClick={startTimer}
                    style={{height: 80, display: 'flex', alignItems: 'center', padding: 10, justifyContent: 'center'}}>
                Start timer
            </button>


        </div>

    );
}

export default RoundControls;
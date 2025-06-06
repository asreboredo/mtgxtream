import "./RoundControls.css";
import {useMatchData} from "../../../hooks/useMatchData.tsx";

function RoundControls() {
    const {startTimer, removeTimer, matchData, resetLifeTotals} = useMatchData();
    const {round, player1, player2} = matchData

    return (
        <div className={'round-controls'}>

            <div style={{display: 'flex', flexDirection: 'row', gap: '30px'}}>
                <button style={{background: 'blue'}} onClick={startTimer}>
                    Start timer
                </button>
                <button style={{background: 'red'}} onClick={removeTimer}>
                    Remove timer
                </button>
                <button style={{background: 'orange'}} onClick={resetLifeTotals}>
                    Reset life totals
                </button>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                Round <input name={'round'} type="text" value={round}/>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>

                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    Player 1 (LEFT)
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                        Name <input name={'round'} type="text" value={player1?.name}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                        Deck <input name={'round'} type="text" value={player1?.deck}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                        Record <input name={'round'} type="text" value={player1?.record}/>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    Player 2 (RIGHT)
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                        Name <input name={'round'} type="text" value={player2?.name}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                        Deck <input name={'round'} type="text" value={player2?.deck}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                        Record <input name={'round'} type="text" value={player2?.record}/>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default RoundControls;
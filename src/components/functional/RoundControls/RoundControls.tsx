import "./RoundControls.css";
import {useMatchData} from "../../../hooks/useMatchData.tsx";

function RoundControls() {
    const {startTimer, removeTimer, matchData, resetLifeTotals, updatePlayerWins, updatePlayer} = useMatchData();
    const {round, player1, player2} = matchData;

    if (!player1 || !player2) {
        return null;
    }

    return (
        <div className={'round-controls'}>

            <div style={{display: 'flex', flexDirection: 'row', gap: '30px'}}>
                <button style={{background: 'blue'}} onClick={startTimer}>
                    START TIMER
                </button>
                <button style={{background: 'red'}} onClick={removeTimer}>
                    REMOVE TIMER
                </button>
            </div>

            <button style={{background: 'orange'}}
                    onClick={() => {
                        updatePlayerWins(['unplayed', 'unplayed', 'unplayed']);
                        resetLifeTotals();
                    }}>
                RESET LIFE + WINS
            </button>

            <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                Round <input name={'round'} type="text" value={round}/>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>

                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    Player 1 (LEFT)
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                        Name <input name={'round'} type="text" defaultValue={player1?.name}
                                    onChange={(e) => {
                                        updatePlayer(player1, (p) => ({...p, name: e.target.value}));
                                    }}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                        Deck <input name={'round'} type="text" value={player1?.deck} onChange={(e) => {
                        updatePlayer(player1, (p) => ({...p, deck: e.target.value}));
                    }}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                        Record <input name={'round'} type="text" value={player1?.record} onChange={(e) => {
                        updatePlayer(player1, (p) => ({...p, record: e.target.value}));
                    }}/>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    Player 2 (RIGHT)
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                        Name <input name={'round'} type="text" value={player2?.name} onChange={(e) => {
                        updatePlayer(player2, (p) => ({...p, name: e.target.value}));
                    }}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                        Deck <input name={'round'} type="text" value={player2?.deck} onChange={(e) => {
                        updatePlayer(player2, (p) => ({...p, deck: e.target.value}));
                    }}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                        Record <input name={'round'} type="text" value={player2?.record} onChange={(e) => {
                        updatePlayer(player2, (p) => ({...p, record: e.target.value}));
                    }}/>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default RoundControls;
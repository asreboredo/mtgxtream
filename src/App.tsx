import './App.css'
import PlayerControls from "./components/functional/PlayerControls/PlayerControls.tsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import {StrictMode} from "react";
import {FirebaseAppContextProvider} from "./contexts/firebase/FirebaseAppContextProvider.tsx";
import Overlay from "./components/functional/Overlay/Overlay.tsx";
import RoundControls from "./components/functional/RoundControls/RoundControls.tsx";

function App() {

    return (
        <>
            <StrictMode>
                <FirebaseAppContextProvider>
                    <HashRouter>
                        <Routes>
                            <Route path={"/"} element={<Overlay/>}></Route>
                            <Route path={"/overlay"} element={<Overlay/>}></Route>
                            <Route path={"/player-controls"} element={<PlayerControls/>}></Route>
                            <Route path={"/round-controls"} element={<RoundControls/>}></Route>
                        </Routes>
                    </HashRouter>
                </FirebaseAppContextProvider>
            </StrictMode>
        </>
    )
}

export default App

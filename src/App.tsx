import './App.css'
import PlayerControls from "./components/PlayerControls/PlayerControls.tsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import Overlay from "./components/Overlay/Overlay.tsx";
import {StrictMode} from "react";
import {FirebaseAppContextProvider} from "./contexts/firebase/FirebaseAppContextProvider.tsx";

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
                        </Routes>
                    </HashRouter>
                </FirebaseAppContextProvider>
            </StrictMode>
        </>
    )
}

export default App

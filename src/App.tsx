import './App.css'
import Controls from "./Controls.tsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import Overlay from "./Overlay.tsx";
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
                            <Route path={"/controls"} element={<Controls/>}></Route>
                        </Routes>
                    </HashRouter>
                </FirebaseAppContextProvider>
            </StrictMode>
        </>
    )
}

export default App

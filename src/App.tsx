import './App.css'
import Controls from "./Controls.tsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import Overlay from "./Overlay.tsx";
import {StrictMode} from "react";

function App() {

  return (
    <>
        <StrictMode>
            <HashRouter>
                <Routes>
                    <Route path={"/"} element={<Overlay/>}></Route>
                    <Route path={"/overlay"} element={<Overlay/>}></Route>
                    <Route path={"/controls"} element={<Controls/>}></Route>
                </Routes>
            </HashRouter>
        </StrictMode>
    </>
  )
}

export default App

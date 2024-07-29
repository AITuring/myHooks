import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HookDemos, ComponentDemo } from "./demo";
import { PlayGround } from "./components";
import "./App.css";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/ui" element={<ComponentDemo />} />
                <Route path="/" element={<HookDemos />} />
                <Route path="/playground" element={<PlayGround />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

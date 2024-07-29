import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HookDemos, ComponentDemo } from "./demo";
import { PlayGround } from "./components";
import "./App.css";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ComponentDemo />} />
                <Route path="/hooks" element={<HookDemos />} />
                <Route path="/playground" element={<PlayGround />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HookDemos, ComponentDemo } from "./demo";
import { PlayGround } from "./components";
import "./App.css";

function App() {
    return (
        <div className="w-screen h-screen m-0 text-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/ui" element={<ComponentDemo />} />
                    <Route path="/" element={<HookDemos />} />
                    <Route path="/playground" element={<PlayGround />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

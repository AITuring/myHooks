import { CountDownDemo, PreviousDemo, LatestDemo } from "./demo";
import "./App.css";


function App() {
  return (
    <div className="board">
      <CountDownDemo />
      <PreviousDemo />
      <LatestDemo />
    </div>
  );
}

export default App;

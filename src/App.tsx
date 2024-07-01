import { CountDownDemo, PreviousDemo, LatestDemo, CreationDemo} from "./demo";
import "./App.css";


function App() {
  return (
    <div className="board">
      <CountDownDemo />
      <PreviousDemo />
      <LatestDemo />
      <CreationDemo />
    </div>
  );
}

export default App;

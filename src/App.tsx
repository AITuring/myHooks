import { CountDownDemo, PreviousDemo, LatestDemo, CreationDemo, FetchWithRetryDemo} from "./demo";
import "./App.css";


function App() {
  return (
    <div className="board">
      <CountDownDemo />
      <PreviousDemo />
      <LatestDemo />
      <CreationDemo />
      <FetchWithRetryDemo />
    </div>
  );
}

export default App;

import { Row, Col } from "./components";
import {
  CountDownDemo,
  PreviousDemo,
  LatestDemo,
  CreationDemo,
  FetchWithRetryDemo,
} from "./demo";
import "./App.css";

function App() {
  return (
    <div className="board">
      <h2>Hooks Demo</h2>
      <Row>
        <Col>
          <CountDownDemo />
        </Col>
        <Col>
          <PreviousDemo />
        </Col>
        <Col>
          <LatestDemo />
        </Col>
        <Col>Column 4</Col>
      </Row>
      <Row>
        <Col>
          <CreationDemo />
        </Col>
        <Col>
          <FetchWithRetryDemo />
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default App;

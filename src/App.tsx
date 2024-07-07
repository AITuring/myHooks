import { Row, Col } from "./components";
import {
    CountDownDemo,
    PreviousDemo,
    LatestDemo,
    CreationDemo,
    FetchWithRetryDemo,
    UpdateEffectDemo,
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
            </Row>
            <Row>
                <Col>
                    <UpdateEffectDemo />
                </Col>
                <Col>
                    <CreationDemo />
                </Col>
                <Col>
                    <FetchWithRetryDemo />
                </Col>
            </Row>
            <Row>
            <Col>{/* <VirtualListDemo /> */}</Col>
            <Col></Col>
            </Row>
        </div>
    );
}

export default App;

import { Row, Col } from "@/components";

import MessageDemo from "./MessageDemo";
import PopOver from "@/components/Popover";

function ComponentDemo() {
    return (
        <div style={{ padding: 20 }}>
            <h2>ComponentDemo</h2>
            <Row>
                <Col>
                    <MessageDemo />
                </Col>
                <Col>
                    <PopOver />
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
        </div>
    );
}

export default ComponentDemo;

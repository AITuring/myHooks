import Header from "./Header";
import CodeEditor from "./CodeEditor";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Preview from "./Preview";

function PlayGround() {

    return (
        <div style={{ height: "100vh", backgroundColor: '#fff' }}>
            <Header />
            <Allotment defaultSizes={[100, 100]}>
                <Allotment.Pane minSize={500}>
                    <CodeEditor />
                </Allotment.Pane>
                <Allotment.Pane minSize={0}>
                    <Preview />
                </Allotment.Pane>
            </Allotment>
        </div>
    );
}

export default PlayGround;

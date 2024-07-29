import Editor from "@monaco-editor/react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Preview from "./Preview";

function PlayGround() {
    const code = `import { useEffect, useState } from "react";

function App() {
    const [num, setNum] = useState(() => {
        const num1 = 1 + 2;
        const num2 = 2 + 3;
        return num1 + num2
    });

    return (
        <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
    );
}

export default App;
`;

    return (
        <div style={{ height: "100vh", backgroundColor: '#fff' }}>
            <Allotment defaultSizes={[100, 100]}>
                <Allotment.Pane minSize={500}>
                    <Editor
                        height="500px"
                        defaultLanguage="javascript"
                        defaultValue={code}
                    />
                </Allotment.Pane>
                <Allotment.Pane minSize={0}>
                    <Preview />
                </Allotment.Pane>
            </Allotment>
        </div>
    );
}

export default PlayGround;

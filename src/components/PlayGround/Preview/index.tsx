import { useContext, useEffect, useState } from "react";
import { PlayGroundContext } from "../PlayGroundContext";
// import Editor from "../CodeEditor/Editor";
import { compile } from "./compiler";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "../file";
import style from "./index.module.css";

const Preview = () => {
    const { files } = useContext(PlayGroundContext);
    const [compiledCode, setCompiledCode] = useState<string>("");

    const getIframeUrl = () => {
        const res = iframeRaw
            .replace(
                '<script type="importmap"></script>',
                `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
            )
            .replace(
                '<script type="module" id="appSrc"></script>',
                `<script type="module" id="appSrc">${compiledCode}</script>`
            );
        return URL.createObjectURL(new Blob([res], { type: "text/html" }));
    };

    const [iframeUrl, setIframeUrl] = useState(getIframeUrl());

    useEffect(() => {
        const res = compile(files);
        setCompiledCode(res);
    }, [files]);

    useEffect(() => {
        setIframeUrl(getIframeUrl());
    }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

    return (
        <div className={style.preview}>
            {/* <Editor
                file={{
                    name: 'dist.js',
                    value: compiledCode,
                    language: 'javascript'
                }}
            /> */}
            <iframe
                src={iframeUrl}
                style={{
                    width: "100%",
                    height: "100%",
                    padding: "0",
                    border: "none",
                }}
            />
        </div>
    );
};

export default Preview;

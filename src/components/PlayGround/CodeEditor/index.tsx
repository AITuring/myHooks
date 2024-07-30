import { useContext } from "react";
import { debounce } from "lodash-es";
import { PlayGroundContext } from "../PlayGroundContext";
import Editor from "./Editor";
import FileNameList from "./FileNameList";
import style from "./index.module.css";

export default function CodeEditor() {
    const {files, setFiles, selectedFileName} = useContext(PlayGroundContext);

    const file = files[selectedFileName];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onEditorChange(value?: string) {
        files[file.name].value = value!;
        setFiles({...files});
    }


    return (
        <div className={style.container}>
            <FileNameList />
            <Editor file={file} onChange={debounce(onEditorChange, 500)}/>
        </div>
    );
}

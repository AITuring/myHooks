import Editor from "./Editor";
import FileNameList from "./FileNameList";
import style from "./index.module.css";

export default function CodeEditor() {

    const file = {
        name: 'test.tsx',
        value: 'import lodash from "lodash";\n\nconst a = <div>hello</div>',
        language: 'typescript'
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onEditorChange(...args: any[]) {
        console.log(...args);
    }


    return (
        <div className={style.container}>
            <FileNameList />
            <Editor file={file} onChange={onEditorChange}/>
        </div>
    );
}

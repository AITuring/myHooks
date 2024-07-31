import MonacoEditor, { OnMount, EditorProps } from "@monaco-editor/react";
import { createATA } from "./ata";
import { editor } from 'monaco-editor';
import { EditorFile } from "../PlayGroundContext";

interface Props {
    file: EditorFile;
    onChange?: EditorProps["onChange"];
    options?: editor.IStandaloneEditorConstructionOptions;
}
const Editor = (props: Props) => {

    const { file, onChange, options } = props;

    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction("editor.action.formatDocument")?.run();
        });

        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.Preserve,
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
        });

        const ata = createATA((code, path) => {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(
                code,
                `file://${path}`
            );
        });

        editor.onDidChangeModelContent(() => {
            ata(editor.getValue());
        });

        ata(editor.getValue());
    };

    return (
        <MonacoEditor
            height="100%"
            path={file.name}
            // theme="vs-dark"
            language={file.language}
            value={file.value}
            onMount={handleEditorMount}
            onChange={onChange}
            options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                scrollbar: {
                    verticalScrollbarSize: 6,
                    horizontalScrollbarSize: 6,
                },
                ...options,
            }}
        />
    );
};

export default Editor;

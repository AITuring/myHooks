import { useState, createContext, PropsWithChildren } from "react";
import { EditorFile } from "./CodeEditor/Editor";
import { fileName2Language } from "./utils";
import { initFiles } from "./file";

export interface EditorFiles {
    [key: string]: EditorFile;
}

export interface PlayGroundContext {
    files: EditorFiles;
    selectedFileName: string;
    setSelectedFileName: (fileName: string) => void;
    setFiles: (files: EditorFiles) => void;
    addFile: (fileName: string) => void;
    removeFile: (fileName: string) => void;
    updateFileName: (oldFieldName: string, newFieldName: string) => void;
}

export const PlayGroundContext = createContext<PlayGroundContext>({
    selectedFileName: 'App.tsx',
} as PlayGroundContext);


export const PlayGroundProvider = (props: PropsWithChildren) => {
    const {children} = props;
    const [files, setFiles] = useState<EditorFiles>(initFiles);
    const [selectedFileName, setSelectedFileName] = useState<string>('App.tsx');

    const addFile = (name: string) => {
        files[name] = {
            name,
            language: fileName2Language(name),
            value: ''
        };

        setFiles({...files});
    }

    const removeFile = (name:string) => {
        delete files[name];
        setFiles({...files});
    }

    const updateFileName = (oldFieldName:string, newFieldName:string) => {
        if(!files[oldFieldName] || newFieldName === undefined || newFieldName === null) {
            return;
        }

        const { [oldFieldName]: value, ...rest} = files;
        const newFile = {
            [newFieldName]: {
                ...value,
                language: fileName2Language(newFieldName),
                name: newFieldName
            }
        };

        setFiles({
            ...rest,
            ...newFile
        })
    }

    return (
        <
            PlayGroundContext.Provider
            value={{
                files,
                selectedFileName,
                setSelectedFileName,
                setFiles,
                addFile,
                removeFile,
                updateFileName
            }}
        >
        {children}
        </PlayGroundContext.Provider>
    )
}

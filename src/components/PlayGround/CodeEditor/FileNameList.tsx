import { useContext, useState, useEffect } from "react";
import { PlayGroundContext } from "../PlayGroundContext";
import { FileNameItem } from "./FileNameItem";
import { ENTRY_FILE_NAME,IMPORT_MAP_FILE_NAME,APP_COMPONENT_FILE_NAME } from '../file';
import style from './fileName.module.css';

const FileNameList = () => {
    const { files, selectedFileName, setSelectedFileName, updateFileName, addFile, removeFile } =
        useContext(PlayGroundContext);

    const [tabs, setTabs] = useState([""]);
    const [creating, setCreating] = useState(false);

    const readonlyFileNames = [ENTRY_FILE_NAME,IMPORT_MAP_FILE_NAME,APP_COMPONENT_FILE_NAME];

    useEffect(() => {
        setTabs(Object.keys(files));
    }, [files]);

    const handleEditComplate = (name: string, prevName: string) => {
        updateFileName(prevName, name);
        setSelectedFileName(name);
        setCreating(false);
    }

    const addTab = () => {
        const newFileName = `Comp${Math.random().toString().slice(2, 8)}.tsx`;
        addFile(newFileName);
        setSelectedFileName(newFileName);
        setCreating(true);
    }

    const handleRemove = (name: string) => {
        removeFile(name);
        setSelectedFileName(ENTRY_FILE_NAME);

    };

    return (
        <div className={style.tabs}>
            {
                tabs.map((item, index) => (
                    <FileNameItem
                        key={item + index}
                        value={item}
                        readonly={readonlyFileNames.includes(item)}
                        creating={creating && index === tabs.length - 1}
                        actived={selectedFileName === item}
                        onClick={() => setSelectedFileName(item)}
                        onEditComplete={(name: string) => handleEditComplate(name, item)}
                        onRemove={(e) => {
                            e.stopPropagation();
                            handleRemove(item);
                        }}
                    />
                ))
            }
            <div className={style.add} onClick={addTab}>+</div>
        </div>
    );
};

export default FileNameList;

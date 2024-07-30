import { useContext, useState, useEffect } from "react";
import { PlayGroundContext } from "../PlayGroundContext";
import { FileNameItem } from "./FileNameItem";
import style from './fileName.module.css';

const FileNameList = () => {
    const { files, selectedFileName, setSelectedFileName } =
        useContext(PlayGroundContext);

    const [tabs, setTabs] = useState([""]);

    useEffect(() => {
        setTabs(Object.keys(files));
    }, [files]);

    return (
        <div className={style.tabs}>
            {
                tabs.map((item, index) => (
                    <FileNameItem
                        key={item + index}
                        value={item}
                        actived={selectedFileName === item}
                        onClick={() => setSelectedFileName(item)}
                    />
                ))
            }
        </div>
    );
};

export default FileNameList;

import classNames from "classnames";
import style from "./fileName.module.css";
import { useState, useRef, useEffect, FC, MouseEventHandler } from "react";

export interface FileNameItemProps {
    value: string;
    actived: boolean;
    creating: boolean;
    onEditComplete: (name: string) => void;
    onClick: () => void;
    onRemove: MouseEventHandler;
    readonly: boolean;
}

export const FileNameItem: FC<FileNameItemProps> = (props) => {
    const {
        value,
        actived = false,
        onClick,
        onEditComplete,
        creating,
        onRemove,
        readonly,
    } = props;

    const [name, setName] = useState<string>(value);
    const [editing, setEditing] = useState<boolean>(creating);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDoubleClick = () => {
        setEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleBlur = () => {
        setEditing(false);
        onEditComplete(name);
    };

    useEffect(() => {
        if (creating) {
            inputRef?.current?.focus();
        }
    }, [creating]);

    return (
        <div
            className={classNames(
                style.tabItem,
                actived ? style.actived : null
            )}
            onClick={onClick}
        >
            {editing ? (
                <input
                    ref={inputRef}
                    onBlur={handleBlur}
                    className={style.tabItemInput}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            ) : (
                <>
                    <span
                        onDoubleClick={readonly ? () => {} : handleDoubleClick}
                    >
                        {value}
                    </span>
                    {readonly ? null : (
                        <span
                            style={{ marginLeft: 5, display: "flex" }}
                            // TODO 点击应该加一个popover确认一下
                            onClick={onRemove}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24">
                                <line
                                    stroke="#999"
                                    x1="18"
                                    y1="6"
                                    x2="6"
                                    y2="18"
                                ></line>
                                <line
                                    stroke="#999"
                                    x1="6"
                                    y1="6"
                                    x2="18"
                                    y2="18"
                                ></line>
                            </svg>
                        </span>
                    )}
                </>
            )}
        </div>
    );
};

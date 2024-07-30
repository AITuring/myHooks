import classNames from "classnames";
import style from './fileName.module.css';
import React from "react";

export interface FileNameItemProps {
    value: string,
    actived: boolean,
    onClick: () => void
}

export const FileNameItem: React.FC<FileNameItemProps> = props => {
    const {
        value,
        actived = false,
        onClick,
    } = props;

    // const [name, setName] = useState<string>(value);

    return (
        <
            div
            className={classNames(style.tabItem, actived ? style.actived : null)}
            onClick={onClick}
        >
            <span>{value}</span>
        </div>
    )
}

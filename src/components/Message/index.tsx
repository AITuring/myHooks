import { CSSProperties, ReactNode} from "react";


export type Position = "top" | "bottom";

export interface MessageProps {
    position?: Position;
    style?: CSSProperties;
    className: string | string[];
    content: ReactNode;
    duration?: number;
    id?: number;
}

// export const MessageProvider: FC<{}> = (props) => {
//     return <div></div>
// }

import { CSSProperties, FC, ReactNode, useMemo, forwardRef } from "react";
import { createPortal } from "react-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import useStore from "./useStore";
import useTimer from "./useTimer";
import "./index.less";

export type Position = "top" | "bottom";
export interface MessageProps {
    position?: Position;
    style?: CSSProperties;
    className?: string | string[];
    content: ReactNode;
    duration?: number;
    id?: number;
    onClose?: (id: number) => void;
}

const MessageItem: FC<MessageProps> = (props) => {
    const {onMouseEnter, onMouseLeave} = useTimer({
        id: props.id as number,
        duration: props.duration,
        remove: props.onClose!,
    });
    return (
        <div className='message-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {props.content}
        </div>
    )
};

export interface MessageRef {
    add: (messageProps: MessageProps) => number;
    update: (id: number, messageProps: MessageProps) => void;
    remove: (id: number) => void;
    clearAll: () => void;
}

export const MessageProvider = forwardRef<MessageRef, object>((ref) => {
    const { messageList, add, update, remove, clearAll } = useStore("top");

    if('current' in ref!) {
        ref.current = {
            add,
            update,
            remove,
            clearAll
        }
    }

    const positions = Object.keys(messageList) as Position[];

    const messageWrapper = (
        <div className="message-wrapper">
            {positions.map((direction) => {
                return (
                    <TransitionGroup
                        className={`message-wrapper-${direction}`}
                        key={direction}
                    >
                        {messageList[direction].map((item) => {
                            return (
                                <CSSTransition
                                    key={item.id}
                                    timeout={1000}
                                    classNames="message"
                                >
                                    <MessageItem onClose={remove} {...item} />
                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>
                );
            })}
        </div>
    );

    const el = useMemo(() => {
        const el = document.createElement("div");
        el.className = "wrapper";
        document.body.appendChild(el);
        return el;
    }, []);

    return createPortal(messageWrapper, el);

});

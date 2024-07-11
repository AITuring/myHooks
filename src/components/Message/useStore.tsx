import { useState } from "react";
import { MessageProps,Position } from ".";

export type MessageList = {
    top: MessageProps[];
    bottom: MessageProps[];
}

const initialState = {
    top: [],
    bottom: []
}

let count = 1;
export const getId = (messageProps: MessageProps) => {
    if (messageProps.id) {
        return messageProps.id;
    } else {
        count++;
        return count;
    }
}

export const getMessagePosition = (messageList:MessageList, id: number) => {
    for(const [position, list] of Object.entries(messageList)) {
        if (list.find(item => item.id === id)) {
            return position as Position;
        }
    }
}

export const findMessage = (messageList: MessageList, id: number) => {
    const position = getMessagePosition(messageList, id);

    const index = position ? messageList[position].findIndex(item => item.id === id) : -1;

    return {
        position,
        index
    }
}

const useStore = (defaultPosition: Position) => {
    const [messageList, setMessageList] = useState<MessageList>({...initialState});

    const add = (messageProps: MessageProps) => {
        // 传入了 id 就直接用传入的，否则返回递增的 id
        const id = getId(messageProps);
        setMessageList(prev => {
            if (messageProps?.id) {
                // 先根据 id 查找有没有已有的 message，如果有就不添加，直接返回之前的
                const position = getMessagePosition(prev, messageProps.id);
                if (position) {
                    return prev;
                }
            }

            const position = messageProps.position || defaultPosition;
            const isTop = position.includes("top");
            // top 的在前面插入一个元素，bottom 的在后面插入一个元素：
            const messages = isTop ? [{...messageProps, id}, ...(prev[position] ?? [])] : [...(prev[position] ?? []), {...messageProps, id}];

            return {
                ...prev,
                [position]: messages
            };
        });
        return id;
    }

    const remove = (id: number) => {
        if (!id) {
            return;
        }
        setMessageList(prev => {
            const position = getMessagePosition(prev, id);
            if (!position) {
                return prev;
            }

            return {
                ...prev,
                [position]: prev[position].filter(item => item.id !== id)
            };
        })
    }

    const update = (id: number, messageProps: MessageProps) => {
        if (!id) {
            return;
        }

        setMessageList(prev => {
            const next = {...prev};
            const {position, index} = findMessage(next, id);

            if (position && index !== -1) {
                next[position][index] = {...next[position][index], ...messageProps};
            }

            return next;
        })
    }

    const clearAll = () => {
        setMessageList({...initialState});
    }

    return {
        messageList,
        add,
        remove,
        update,
        clearAll
    }
}

export default useStore;

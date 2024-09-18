import { useMessage } from "@/components/Message/useMessage";
import { MessageConfigProvider } from "@/components/Message/ConfigProvider";
import {Button, Card} from '@/components'

function MessageTop() {
    const message = useMessage();

    return (
        <Button
            onClick={() => {
                message.add({
                    content: "请求成功",
                });
            }}
        >
            顶部
        </Button>
    );
}

function MessageBottom() {
    const message = useMessage();
    return (
        <Button
            onClick={() => {
                message.add({
                    content: "请求成功",
                    position: "bottom"
                });
            }}
        >
            底部
        </Button>
    );
}


const MessageDemo: React.FC = () => {

    return (
        <Card
        title="Message 消息提示"
        content={
            <>
                <MessageConfigProvider>
                    <MessageTop />
                    <MessageBottom />
                </MessageConfigProvider>
            </>
        }
        />
    );
};

export default MessageDemo;

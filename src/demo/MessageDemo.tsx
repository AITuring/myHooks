import { useMessage } from "../components/Message/useMessage";
import { MessageConfigProvider } from "../components/Message/ConfigProvider";
import "./demo.css";

function MessageTop() {
    const message = useMessage();

    return (
        <button
            onClick={() => {
                message.add({
                    content: "请求成功",
                });
            }}
        >
            顶部
        </button>
    );
}

function MessageBottom() {
    const message = useMessage();
    return (
        <button
            onClick={() => {
                message.add({
                    content: "请求成功",
                    position: "bottom"
                });
            }}
        >
            底部
        </button>
    );
}


const MessageDemo: React.FC = () => {

    return (
        <div className="hook">
            <div className="hook-head">
                <h2>Message</h2>
            </div>
            <div className="content">
                <MessageConfigProvider>
                    <MessageTop />
                    <MessageBottom />
                </MessageConfigProvider>
            </div>
        </div>
    );
};

export default MessageDemo;

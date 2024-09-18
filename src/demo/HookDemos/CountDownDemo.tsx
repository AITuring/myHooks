import { useCountDown } from "@/hooks";
import {Button, Card} from '@/components'

const CountDownDemo: React.FC = () => {
    const { time, start, pause, reset, formattedTime } = useCountDown(300, {
        interval: 1000,
        stopTime: 0,
        onEnd: () => {
            alert("计时结束");
        },
    });

    return (
        <Card
            title="useCountDown"
            content={
                <>
                <h3>{time}s</h3>
                <h3>{formattedTime}</h3>
                </>
            }
            operation={
                <>
                    <Button onClick={start}>开始计时</Button>
                    <Button onClick={pause}>停止计时</Button>
                    <Button onClick={reset}>重置计时</Button>
                </>
            }
        />
    );
};

export default CountDownDemo;

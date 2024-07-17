import React from 'react';

class TestDemo extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            val: 0,
        };
    }

    componentDidMount() {
        this.setState({ val: this.state.val + 1 });

        console.log(this.state.val, '第一次'); // 第 1 次 log

        this.setState({ val: this.state.val + 1 });

        console.log(this.state.val, '第二次'); // 第 2 次 log

        setTimeout(() => {
            this.setState({ val: this.state.val + 1 });

            console.log(this.state.val, '第三次'); // 第 3 次 log

            this.setState({ val: this.state.val + 1 });

            console.log(this.state.val, '第四次'); // 第 4 次 log
        }, 0);
    }

    render() {
        return null;
    }
}

export default TestDemo;

var Timer = React.createClass({
    getInitialState: function() {
        return {
            secondsElapsed: 0
        }
    },
    tick: function() {
        this.setState({
            secondsElapsed: this.state.secondsElapsed + 1
        })
    },

    // 当render方法成功调用并且真实的DOM已经被渲染之后，你可以在componentDidMount内部通过this.getDOMNode()方法访问到他
    componentDidMount: function() {
        this.interval = setInterval(this.tick, 1000);
    },

    // 最后，随着一个组件从它的层级结构中移除，这个组件的生命也走到了尽头。该方法会在组件移除之前被调用，让你有机会做一些清理工作
    // 你在componentDidMount中添加的所有任务都需要在该方法中撤销，比如定时器或者事件监听器
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    render: function() {
        return (
            <div>Seconds Elapsed: { this.state.secondsElapsed }</div>
        )
    }
});

ReactDOM.render(<Timer />, document.querySelector('#content'));

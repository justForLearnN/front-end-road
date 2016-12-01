var IntervalMixin = function(intervalTime) {
    return {
        componentDidMount: function() {
            this.interval = setInterval(this.onTick, intervalTime);
        },
        componentWillUnmount: function() {
            clearInterval(this.interval);
        }
    }
}

var Timer = React.createClass({
    mixins: [IntervalMixin(1000)],
    getInitialState: function() {
        return {
            secondsElapsed: 0
        }
    },
    onTick: function() {
        this.setState({
            secondsElapsed: this.state.secondsElapsed + 1
        })
    },
    render: function() {
        return (
            <div>Seconds Elapsed: { this.state.secondsElapsed }</div>
        )
    }
});

ReactDOM.render(<Timer />, document.querySelector('#content'));

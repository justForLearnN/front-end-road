var IntervalMixin = {
    setInterval: function(callback, intervalTime) {
        var token = setInterval(callback, intervalTime);
        this.intervals.push(token);
        return token;
    },
    componentDidMount: function() {
        this.intervals = [];
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
}

var Since2014 = React.createClass({
    mixins: [IntervalMixin],
    componentDidMount: function() {
        this.setInterval(this.forceUpdate.bind(this), 1000);
    },
    render: function() {
        var from = Number(new Date(2014, 0, 1));
        var to = Date.now();
        return (
            <div>{ Math.round((to - from) / 1000) }</div>
        )
    }
})

ReactDOM.render(<Since2014 />, document.querySelector('#content'));

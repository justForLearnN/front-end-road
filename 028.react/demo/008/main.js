var Driver = React.createClass({
    getInitialState: function() {
        return {
            str: ''
        }
    },
    render: function() {
        return <div ref="driverD" className="driver">{ this.state.str }</div>
    },
    componentDidMount: function() {
        var thisDom = this.refs.driverD.getDOMNode();
        alert(thisDom.className);
    }
});

ReactDOM.render(<Driver />, document.querySelector('#content'));

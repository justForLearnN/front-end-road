var Team = React.createClass({
    getInitialState: function() {
        return {
            name: "Lucy3"
        }
    },
    onHungry: function(name) {
        alert(name + " is hungry!");
    },
    render: function() {
        return (
            <div onMouseOver={ this.onMouseOver }
                 onMouseOut={ this.onMouseOut }>
                 Team onwer is :
                 <People name={this.state.name} onHungry={ this.onHungry }/>
            </div>
        )
    },
    onMouseOver: function() {
        this.setState({
                name: "mouseOver"
            }
        )
    },
    onMouseOut: function() {
        this.setState({
            name: "mouseout"
        })
    }
});

var People = React.createClass({
    render: function() {
        return (
            <span onClick={ this.handleClick }>{ this.props.name }</span>
        )
    },
    handleClick: function() {
        this.props.onHungry(this.props.name);
    }
})

ReactDOM.render(
    <Team name="LUCY2" />,
    document.getElementById('content')
)

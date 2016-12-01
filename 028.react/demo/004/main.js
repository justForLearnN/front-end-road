var ContentBox = React.createClass({
    getDefaultProps: function() {
        return {
            date: new Date()
        }
    },

    render: function() {
        var day = this.props.date.getDay();
        return (
            <div className="contentBox">{ day }</div>
        );
    }
});

var CountryDropdown = React.createClass({
    getInitialState: function() {
        return {
            showOptions: false
        }
    },

    render: function() {
        var options;
        if (this.state.showOptions) {
            options = (
                <ul className="options">
                    <li>United States of America</li>
                    <li>New Zealand</li>
                    <li>Denmark</li>
                </ul>
            );
        }

        return (
            <div className="dropdown" onClick={ this.handleClick }>
                <label>Choose a contry</label>.{options}
            </div>
        );
    },

    handleClick: function() {
        if (this.state.showOptions) {
            this.setState({ showOptions: false });
        } else {
            this.setState({ showOptions: true });
        }
    }
});

ReactDOM.render(<CountryDropdown />, document.querySelector('#content'));

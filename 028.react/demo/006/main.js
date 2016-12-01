var AnswerRadioInput = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        name: React.Proptypes.string.isRequired,
        label: React.Proptypes.string.isRequired,
        value: React.Proptypes.string.isRequired,
        checked: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            id: null,
            checked: false
        }
    },
    getInitialState: function() {
        var id = this.props.id ? this.props.id : uniqueId('radio-');
        return {
            checked: !!this.props.checked,
            id: id,
            name: id
        }
    },
    render: function() {
        return (
            <div className="radio">
                <label htmlFor={ this.props.id }>
                    <input type="radio"
                           name={ this.props.name }
                           id={ this.props.id }
                           value={ this.props.value }
                           checked={ this.state.checked } />
                    { this.props.label }
                </label>
            </div>
        )
    }
})

ReactDOM.render(<AnswerRadioInput />, document.querySelector('#content'));

var Driver = React.createClass({
    getInitialState: function() {
        return {
            dropZoneEntered: false,
            title: 'Fantastic Survey',
            introduction: 'This survey is fantastic',
            questions: []
        }
    },

    handleFormChange: function(formData) {
        this.setState(formData);
    },

    handleDragOver: function(ev) {
        ev.preventDefault();
    },

    handleDragEnter: function() {
        this.setState({ dropZoneEntered: true });
    },

    handleDrop: function(ev) {
        var questionType = ev.dataTransfer.getData('questionType');
        var questions = this.state.questions;
        questions = questions.concat({ type: questionType });

        this.setState({
            questions: questions,
            dropZoneEntered: false
        })
    },

    handleDragLeave: function() {
        this.setState({ dropZoneEntered: false })
    },

    render: function() {
        var questions = this.state.questions;
        var dropZoneEntered = '';
        if (this.state.dropZoneEntered) {
            dropZoneEntered = 'drag-enter';
        }

        return (
            <div className="survey-editor">
                <div className="row">
                    <aside className="sidebar col-md-3">
                        <h2>Modules</h2>
                        <DraggableQuestions />
                    </aside>
                    <div className="survey-canvas col-md-9">
                        <SurveyForm
                            title={ this.state.title }
                            introduction={ this.state.introduction }
                            onChange={ this.handleFormChange }
                        />
                        <Divider>questions</Divider>
                        <div className={ 'drop-zone well well-drop-zone' + dropZoneEntered } onDragOver={ this.handleDragOver } onDragEnter={ this.handleDragEnter } onDragLeave={ this.handleDragLeave } onDrop={ this.handleDrop }>
                            Drag and drop a module from the left.
                        </div>
                        <div className="actions">
                            <button className="btn btn-save" onClick={ this.handleSaveClicked }>save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var DraggableQuestions = React.createClass({
    render: function() {
        return (
            <div className="draggableQuestions">2. demo</div>
        )
    }
})

var SurveyForm = React.createClass({
    render: function() {
        return (
            <div className="surveyForm">3. demo</div>
        )
    }
})

var Divider = React.createClass({
    render: function() {
        return (
            <div className="divider">{ this.props.children }</div>
        )
    }
})

ReactDOM.render(<Driver />, document.querySelector('#content'));

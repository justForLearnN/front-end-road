let data = [
    {
        id: 1,
        author: "Pete Hunt",
        text: "This is one comment"
    }, {
        id: 2,
        author: "Jordan Walke",
        text: "This is *anothor* comment"
    }
];

let Comment = React.createClass({
    rawMarkup: function() {
        var md =  new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        )
    }
});

let CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            )
        });
        return (
            <div className="commentList">{commentNodes}</div>
        )
    }
})

let CommentForm = React.createClass({
    render: () => {
        return (
            <div className="commentForm">Hello, world! I am a CommentForm.</div>
        )
    }
});

let CommentBox = React.createClass({
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
                this.setState({ data: data })
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, err.toString());
            }.bind(this)
        })
    },
    getInitialState: function() {
        return { data: [] }
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Coments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        )
    }
})

ReactDOM.render(
    <CommentBox url="https://test-frontend-broadcast.laohu8.com/v1/object/1/6017/comments" pollInterval={2000} />,
    document.querySelector('#content')
)
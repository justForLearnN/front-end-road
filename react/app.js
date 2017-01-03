const Rect = React.createClass({
  getInitialState: function () {
    return {
      isChange: false,
      width: 100,
      backgroundColor: 'red'
    }
  },
  rectChange: function () {
    this.state.isChange ? 
      this.setState({ width: 100, backgroundColor: 'red' }) : 
      this.setState({ width: this.props.width, backgroundColor: this.props.backgroundColor });

    this.setState({ 
      isChange: !this.state.isChange 
    })
  },
  render: function () {
    const boxStyle = {
      width: `${this.state.width}px`,
      height: '100px',
      backgroundColor: this.state.backgroundColor
    }
    return (
      <div className="box" style={boxStyle} onClick={this.rectChange}>my first react component!</div>
    )
  }
})

ReactDOM.render(<Rect width="150" backgroundColor="orange"/>, document.querySelector('#content'))

// const CommentBox = React.createClass({
//     getDefaultProps() {
//         console.log('getDefaultProps');
//         return { a: 1 }
//     },
//     getInitialState () {
//         console.log('getInitialState');
//         setTimeout(() => {
//             console.log('getInitialState delay');
//         }, 1000)
//         return { b: 2 }
//     },
//     componentWillMount () {
//         console.log('componentWillMount');
//     },
//     clickFn (event) {
//         console.log(event.nativeEvent);
//     },
//     render () {
//         console.log('render');
//         return (
//             <div className="commentBox" onClick={this.clickFn}>Hello, world! I am a CommentBox {this.props.a}</div>
//         )
//     },

//     componentDidMount () {
//         console.log('xxxxxxxxx');
//     }
// })

// ReactDOM.render(<CommentBox />, document.querySelector('#content'));


// 1 基本语法
// 2 转变思维，从操作DOM到仅仅只操作数据
// 3 让自己具备模块化思维
// 4 明白如何创建组件
// 5 组件之间如何交互，状态，数据如何保存修改传递
// 6 明白组件生命周期
// 7 明白最基本的事件交互，如点击，输入信息，并学会查看事件对象中的内容
// 8 暂时放弃动画交互
// 9 掌握promise

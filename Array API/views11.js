// 小明的学科成绩
var xiaoming = [
    { subject: 'math', grade: 99 },
    { subject: 'chinese', grade: 88 },
    { subject: 'english', grade: 100 }
]

// 每一科成绩占总成绩的权重比
var dis = {
    math: 0.8,
    chinese: 0.7,
    english: 0.6
}

// 计算小明的总成绩

var res = xiaoming.reduce((r, item) => {
    return r + item.grade * dis[item.subject]
}, 0)

console.log(res);

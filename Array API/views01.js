// 1. 如何知道一个字符串中单个字符出现的次数

let targetString = 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.';

const getStringCount = (targetString, elem) => {
   let t = targetString.toString();
   let a = t.split('');

   // let res =  {}
   // a.forEach(item => {
   //     const item_ = item.toLowerCase();
   //     res[item_] = res[item_] ? res[item_] + 1 : 1;
   // })

   const res = a.reduce((r, item) => {
       const item_ = item.toLowerCase();
       r[item_] = r[item_] ? r[item_] + 1 : 1;
       return r;
   }, {})

   console.log(res);

   return res[elem];
}

console.log(getStringCount(targetString, 'r')); // 10次

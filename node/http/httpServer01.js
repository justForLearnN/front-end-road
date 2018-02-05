/**
 * 用户在浏览器输入网址到网页打开，这个过程发生了什么？
 * 1. 输入网址www.baidu.com
 *    客户端会将网址解析为ip地址，然后发送http请求到服务主机。
 * 2. 服务器接受到该请求之后，会对请求进行分析和处理
 * 3. 服务器处理完请求之后，会将返回内容发送到客户端
 * 4. 客户端接收到返回内容之后，会对该内容进行相应的处理，比如将html页面渲染出来
 */

var http = require('http');

// 创建并返回一个web服务器对象
// var server = http.createServer(function(request, resoponse) {
// 	console.log('There is a request..')  //  相当于request事件
// 	resoponse.writeHead(200,{
//         "content-type":"text/plain"
//     });
//     resoponse.write("hello nodejs");
//     resoponse.end();
// });

var http=require("http");
var querystring=require("querystring");

var postData=querystring.stringify({
    "content":"我真的只是测试一下",
    "mid":8837
});

var options={
    hostname:"www.imooc.com",
    port:80,
    path:"/course/document",
    method:"POST",
    headers:{
        "Accept":"application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding":"gzip, deflate",
        "Accept-Language":"zh-CN,zh;q=0.8",
        "Connection":"keep-alive",
        "Content-Length":postData.length,
        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
        "Cookie":"imooc_uuid=6cc9e8d5-424a-4861-9f7d-9cbcfbe4c6ae; imooc_isnew_ct=1460873157; loginstate=1; apsid=IzZDJiMGU0OTMyNTE0ZGFhZDAzZDNhZTAyZDg2ZmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjkyOTk0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGNmNmFhMmVhMTYwNzRmMjczNjdmZWUyNDg1ZTZkMGM1BwhXVwcIV1c%3DMD; PHPSESSID=thh4bfrl1t7qre9tr56m32tbv0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1467635471,1467653719,1467654690,1467654957; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1467655022; imooc_isnew=2; cvde=577a9e57ce250-34",
        "Host":"www.imooc.com",
        "Origin":"http://www.imooc.com",
        "Referer":"http://www.imooc.com/video/8837",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2763.0 Safari/537.36",
        "X-Requested-With":"XMLHttpRequest",
    }
}

var req=http.request(options,function(res){
	res.setEncoding("utf-8");
    res.on("data",function(chunk){
        console.log(chunk);
    });
    res.on("end",function(){
        console.log("评论完毕！");
    });
    console.log(res.statusCode);
});

req.on("error",function(err){
    console.log(err.message);
})
req.write(postData);
req.end();

// // 查看服务器地址信息
// console.log(server.address());
// // { address: '::', family: 'IPv6', port: 8080 }
//
// // error事件，当出现错误时触发
// server.on('error', function(error) {
// 	console.log(error);
// })
// //端口冲突时：{ [Error: listen EACCES] code: 'EACCES', errno: 'EACCES', syscall: 'listen' }
//
// // 服务器启动成功时触发listening事件
// server.on('listening', function() {
// 	console.log('listening...');
// })
//
// // 当客户端发送请求过来，被listening监听到时触发
// server.on('request', function() {
// 	console.log('There is a request!');
// })

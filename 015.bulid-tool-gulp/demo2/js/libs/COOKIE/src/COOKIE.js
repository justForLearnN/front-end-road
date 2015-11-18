/**
 * COOKIE v2.2
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2013/12/25
 */
;
(function(ROOT, Struct, NS, undefined){
	"use strict";
	
	//一些简单方法
	var getDateString=function(offset){
			var date=new Date();
			date.setTime(+date+offset*1000);
			return date.toUTCString();
		},
		encode=encodeURIComponent,
		decode=decodeURIComponent;
		
	Struct.fn=Struct.prototype={
		version:'2.2',
		constructor:Struct,
		init:function(name){
			this.name=name||'';
			return this.test();
		},
		test:function(){
			try{
				this.support=this.set('^_^',1) && this.remove('^_^');
			}catch(e){
				this.support=false;
			}
			return this;
		},
		refresh:function(){//刷新对象中cookies
			if(this.cacheCookie!==document.cookie){
				this.cookies=this.getCookies();
			}
			return this;
		},
		getCookies:function(){//解析document.cookie
			var cookie=this.cacheCookie=document.cookie||'',
				testReg=new RegExp('^'+this.getKey('').replace(/([\.\?\+\*\[\]\(\)\^\$\/\|\\])/g,"\\$1"),'i'),
				subs=cookie.split(/;\s?/),
				_subs,cks={},i=0,j=subs.length;
			for(;i<j,subs[i];i++){
				_subs=subs[i].split('=');
				_subs[0]=decode(_subs[0]);
				if(testReg.test(_subs[0])){
					cks[_subs[0].replace(testReg,'')]=decode(_subs.slice(1).join('='));
				}
			}
			return cks;
		},
		getKey:function(key){//获取包装后的key值
			var name=this.name;
			return (name?name+'/':'')+key;
		},
        has:function(key){//是否存在名为key的cookie
            return this.get(key)!=null;
        },
        get:function(key){//获取名为key的cookie的值
            return this.refresh().cookies[key];
        },
        set:function(key,value,expire,path,domain,secure){//设置一个新cookie
			var myck,
				_key=this.getKey(key);
            myck=encode(_key)+'='+encode(value==null?'':value);
            if(!isNaN(expire=parseFloat(expire)))
                myck+=';expires='+getDateString(expire);
			if(path)myck+=';path='+path;
            if(domain&&domain!=location.hostname)myck+=';domain='+domain;
			if(secure)myck+=';secure';
            document.cookie=myck;
			return this.has(key);
        },
        remove:function(key,path,domain){//删除cookie
			var paths=[],
				domains=[],
				arr,self=this;
			if(path){
				paths=[path];
			}else{
				arr=location.pathname.match(/.*?\/|.+$/g);
				Struct.each(arr,function(i){
					var a;
					paths.push(a=arr.slice(0,i+1).join(''));
					if(/[^\/]+\/$/.test(a)){
						paths.push(a.slice(0,-1));
					}
					if(/[^\/]$/.test(a)){
						paths.push(a+'/');
					}
				});
			}

			if(domain){
				domains=[domain];
			}else{
				arr=location.hostname.split('.');
				Struct.each(arr,function(i){
					domains.push(arr.slice(-i).join('.'));
				});
				domains.push('.'+domains[0]);
			}

			Struct.each(paths,function(){
				var path=this+'';
				Struct.each(domains,function(){
					self.set(key,'',-1000,path,this+'');
				});
			});
			
			return !!path||!!domain||!this.has(key);
        },
		clear:function(path,domain){//清除所引用的全部cookie
			var key, cookies=this.refresh().cookies;
			for(key in cookies){
				this.remove(key,path,domain);
			}
			return !!path||!!domain||function(){
				cookies=this.cookies;
				for(key in cookies){
					return false;
				}
				return true;
			}.call(this);
		}
	}
	
	//修正原型链指向
	Struct.fn.init.prototype=Struct.fn;
	
	//将原型上的方法属性再绑定到构造函数上，以实现直接调用
	var prop,
		fn=Struct.fn;
	for(prop in fn){
		Struct[prop]=fn[prop];
	}
	
	//实现each方法
	Struct.each=function(arr,func){
		var i=0,j=arr.length;
		for(;i<j;i++){
			if(func.call(arr[i],i)===false){
				break;	
			}
		}
	}
	
    if(typeof define=='function' && define.amd){
        define(NS,function(){
            return Struct;
        });
    }else ROOT[NS]=Struct.test();
	
})(window, function(name){
	return new arguments.callee.fn.init(name);
}, 'COOKIE');

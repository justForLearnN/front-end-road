/*!
 * createClass
 * @author qiqiboy
 * @github https://github.com/qiqiboy/createClass
 */

!function(ROOT,name,undefined){

    var createClass=function(){
        if(this instanceof createClass){
            throw new TypeError(name+' is not a constructor');
        }

        var _struct,_parent,
            args=map(arguments,function(arg){
                if(isFunction(arg)){
                    if(!function(){for(var i in arg.prototype){return true}}()){
                        _struct=arg;
                        return;
                    }else if(!_parent){
                        _parent=arg.prototype._self||arg;
                    }
                }
                return arg;
            }),
            struct=_struct||_parent||noop(),
            PARENTS=[],
            PRIVATES={},
            ORIGIN={_self_:struct},
            ret={
                _self:struct=wrap(struct,PARENTS,PRIVATES,ORIGIN),
                extend:function(){
                    var self=this,
                        base=this===ret?[]:[this];
                    return extend.apply(null,base.concat(map([{constructor:construct}].concat(map(arguments,function(arg){
                        var prop,_prop,obj,_obj,attrs,ex,method,dels=[];

                        if(isFunction(arg)){
                            PARENTS.push(obj=arg);
                        }else if(arg && typeof arg=='object'){
                            obj=arg; _obj={};
                            for(prop in obj){
                                if(obj.hasOwnProperty(prop)&&isFunction(method=obj[prop])&&prop!='constructor'){
                                    attrs=prop.split(':');
                                    if(attrs.length>1){
                                        ex=attrs.shift();
                                        _prop=attrs.join(':');

                                        switch(ex){
                                            case 'private':
                                                dels.push(prop);
                                                PRIVATES[_prop]=method;
                                                break;
                                            case 'static':
                                                dels.push(prop);
                                                construct[_prop]=method;
                                                continue;
                                            default:_prop=prop;
                                        }
                                    }else{
                                        _prop=prop;
                                    }

                                    _obj[_prop]=wrap(ORIGIN[prop]=method,PARENTS,PRIVATES,ORIGIN,_prop);
                                }
                            }

                            while(prop=dels.shift()){
                                delete obj[prop];
                            }
                        }

                        return extend(obj,_obj);
                    }),ret).sort(sortFunc),function(arg){
                        var np;
                        if(isFunction(arg)){
                            np=noop();
                            np.prototype=arg.prototype;
                            arg=new np;
                        }
                        return arg||np;
                    })));
                },
                isInstanceof:function(Class){
                    var self=this,
                        isto;
                    return (this instanceof Class) || (function(){
                        for(var i=0,j=PARENTS.length;i<j;i++){
                            isto=PARENTS[i].prototype.isInstanceof;
                            if(PARENTS[i]===Class || isto && isto.call(self,Class)){
                                return true;
                            }
                        }
                        return false;
                    })();
                }
            };

        proxy.prototype=construct.fn=construct.prototype=ret.extend.apply(ret,args);
        construct.extend=function(){
            return createClass.apply(null,[].slice.call(arguments,0).concat(this));
        }

        return construct;

        function proxy(args){
            struct.apply(this,args);
        }

        function construct(){
            return new proxy(arguments);
        }
    };

    if(typeof define=='function' && define.amd){
        define(name,function(){
            return createClass;
        });
    }else ROOT[name]=createClass;

    /**
     * 定义一些方法
     */

    function map(arr,iterate){
        for(var i=0,j=arr.length,ret=[],n;i<j;i++){
            if(typeof (n=iterate(arr[i],i,arr))!=='undefined')
                ret.push(n);
        }
        return ret;
    }
    
    function hasOwnMethod(obj,method){
        var prop;
        if(method){
            for(prop in obj){
                if(obj[prop]===method)
                    return true;
            }
        }
        return false;
    }

    function wrap(method,parents,privates,origins,prop){
        return function(){
            var orig=this._super,
                i=0,
                p,ret;

            if(privates[prop]){
                if(hasOwnMethod(origins,arguments.callee.caller)){
                    method=privates[prop];
                }else if(isFunction(method=origins[prop]||(!origins['private:'+prop]&&this[prop]))){}
                else throw new Error('Cant not run a private method!');
            }

            this._super=noop();
            while(p=parents[i++]){
                if(null==prop){
                    this._super=p.prototype._self||p;
                    break;
                }

                if(isFunction(p.prototype[prop])){
                    this._super=p.prototype[prop];
                    break;
                }
            }
            
            ret=method.apply(this,arguments);
            this._super=orig;

            return ret;
        }
    }

    function extend(){
        var len=arguments.length,
            target=arguments[0],
            i=1,
            options,key,copy;

        for(;i<len;i++){
            if((options=arguments[i])!=null){
                for(key in options){
                    if(target===(copy=options[key]))continue;
                    target[key]=copy;
                }
            }
        }

        return target;
    }

    function sortFunc(a,b){
        var af=isFunction(a),
            bf=isFunction(b);
        return af==bf?0:af?-1:1;
    }

    function isFunction(n){
        return typeof n=='function';
    }

    function noop(){
        return new Function;
    }

}(window,'createClass');

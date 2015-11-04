define(function(require){
    "use strict";
    
    var $=require('jquery');
    var K={};
	var testStyle=document.createElement('div').style;
	var supports={js:true};
    var states={
            start:1,
            down:1,
            move:2,
            end:3,
            up:3,
            cancel:3
        },
        evs=[],
        event2type={},
        event2code={},
        POINTERS={};

    $.extend(K,{
        version: '1.0.0',
        supports: supports,
        camelCase: camelCase,
        uncamelCase: uncamelCase,
        type: $.type,
		//获取css3前缀
        cssVendor: (function(){
			var ts=testStyle,
				cases=['-webkit-','-moz-','-ms-','-o-',''],i=0;
			do {
				if(camelCase(cases[i]+'transform') in ts){
					return cases[i];
				}
			} while(++i<cases.length);
			
			return '';
		})(),
        transitionend: (function(){
            var ev='otransitionend oTransitionEnd webkitTransitionEnd mozTransitionEnd MSTransitionEnd transitionend';
            $.each(ev.split(" "),function(){
                 event2code[this.toLowerCase()]=4;
            });
            return ev;
        })(),
        animationend: (function(){
            var ev='webkitAnimationEnd animationend';
            $.each(ev.split(" "),function(){
                 event2code[this.toLowerCase()]=5;
            });
            return ev;
        })(),
        fixCSS: function(property){
            var ts=testStyle;
			return (camelCase(property) in ts) && property || (camelCase(this.cssVendor+property) in ts) && this.cssVendor+property || property;
        },
        isCSS: function(property){
            var name=camelCase(this.fixCSS(property));
			return (name in testStyle) && name || '';
		},
        isArrayLike: function(elem){
			var type=this.type(elem);
			return !!elem && type!='function' && type!='string' && (elem.length===0 || elem.length && (elem.length-1) in elem);
		},
        reset: function(obj){
            return this.isArrayLike(obj) ? obj[0] : function(){
				for(var key in obj){
					return obj[key];
				}
			}();
        },
        createNode: function(tag,attrs){
            var node=document.createElement(tag),
                attr;
            if(attrs){
                for(attr in attrs){
                    if(attrs.hasOwnProperty(attr)){
                        if(attr in node){
                            node[attr]=attrs[attr];
                        }else{
                            node.setAttribute(attr,attrs[attr]);
                        }
                    }
                }
            }
            return node;
        },
        getQueryValue: function(key){
            return this.getQueryObj()[key];
        },
        getAbsUrl: function(url){
            var a=document.createElement('a');
            a.href=url;
            return /^http/i.test(a.href)?a.href:a.getAttribute('href',4);
        },
        htmlencode: function(str){
            return String(str).replace(/&(?![\w#]+;)|[<>"']/g,function(t){
                return  {"<": "&#60;",
                        ">": "&#62;",
                        '"': "&#34;",
                        "'": "&#39;",
                        "&": "&#38;"}[t]||'';
                });
        },
        insertRules: function(rules){
            var sheet=document.styleSheets.item(0),
                isFF='insertRule' in sheet;

            $.each(rules, function(selector, css){
                var style=(typeof css=='string'?$.map(css.split(/\s*;\s*/g), function(t){
						var ps=t.split(/\s*:\s*/);
						if(ps.length>1){
							return fixCSS(ps[0])+':'+ps[1];	
						}
					}):$.map(css, function(style,prop){
                        return fixCSS(prop)+': '+style;
                    })).join('; ');
                isFF ? sheet.insertRule(selector+' { '+ style +' }', sheet.cssRules.length) : $.each(selector.split(/\s*,\s*/),function(i,_selector){
					sheet.addRule(_selector,style);
				});
            });
        },
        getQueryObj: (function(){
            var queryStr,queryObj;

            return function(){
                var str,arr;
                if(location.search!==queryStr){
                    queryObj={};
                    str=decodeURIComponent((location.search||'').substring(1));
                    arr=str.split('&');
                    $.each(arr,function(){
                        if(this){
                            var parts=this.split('=');
                            queryObj[parts[0]]=parts.slice(1).join('');
                        }
                    });
                }
                return queryObj;
            }
        })()
    });

    function camelCase(str){
        return str.replace(/^-ms-/, "ms-").replace(/-([a-z]|[0-9])/ig, function(all, letter){
			return (letter+"").toUpperCase();
		});
    }

    function uncamelCase(str){
		return str.replace(/([A-Z]|^ms)/g,"-$1").toLowerCase();			
	}

    function trigger(el,ev,data){
        if(('createEvent' in document) && typeof MouseEvent=='function'){
            var event=document.createEvent('MouseEvents');
            event.initEvent(ev,true,true);
            event.data=data;
            el.dispatchEvent(event);
        }else{
            $(el).trigger($.Event({type:ev,data:data}));
        }
    }
    
    function filterEvent(ev){
        var oldEvent=ev.originalEvent,
            pointers,
            pointer;
        
        ev.type=ev.type.toLowerCase();
        ev.eventType=event2type[ev.type]||ev.type;
        ev.eventCode=event2code[ev.type]||0;

        pointers=POINTERS[ev.eventType];
        switch(ev.eventType){
            case 'mouse':
            case 'pointer':
                var id=oldEvent.pointerId||0;
                ev.eventCode==3?delete pointers[id]:pointers[id]=ev;
                ev.changedPointers=[{id:id,pointer:ev}];
                ev.pointers=$.map(pointers,function(pointer,id){
                    return {id:id,pointer:pointer};
                });
                break;
            case 'touch':
                POINTERS[ev.eventType]=pointers=oldEvent.touches;
                ev.changedPointers=$.map(oldEvent.changedTouches,function(pointer){
                    return {id:pointer.identifier,pointer:pointer};
                });
                ev.pointers=$.map(oldEvent.touches,function(pointer){
                    return {id:pointer.identifier,pointer:pointer};
                });
                break;
        }

        if(pointer=ev.pointers[0]){
            ev.pageX=pointer.pointer.pageX;
            ev.pageY=pointer.pointer.pageY;
        }

        ev.length=ev.pointers.length;

        return ev;
    }
 
	/* css支持检测 */
    $.each("transform transition animation perspective border-image border-radius box-shadow background-size background-clip text-shadow min-height opacity appearance".split(" "),function(i,prop){
        supports[camelCase(prop)]=!!K.isCSS(prop)
    });

    supports.touch=('createTouch' in document) || ('ontouchstart' in window);
	supports.canvas=typeof document.createElement('canvas').getContext=='function';
    supports.svg=!!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg',"svg").createSVGRect;

    testStyle.cssText='color:rgba(0,0,0,0);position:fixed;_position:absolute;display:inline-block;*display:inline;border-color:transparent;'+K.fixCSS('transform-style')+':preserve-3d;background-image:'+K.cssVendor+'gradient(linear,0 0,0 0,from(#000),to(#000));background-image:'+K.cssVendor+'linear-gradient(#fff,#000);';
    supports.rgba=/rgba/.test(testStyle.color);
    supports.fixed=/fixed/.test(testStyle.position);
    supports.inlineBlock=/inline-block/.test(testStyle.display);
    supports.transparent=/transparent/.test(testStyle.borderColor);
    supports.gradient=/gradient/.test(testStyle.backgroundImage);
	supports.transform3d='preserve-3d'==testStyle[K.isCSS('transform-style')];

    K.transform=K.isCSS('transform');
	K.transition=K.isCSS('transition');
    K.animation=K.isCSS('animation');

    $.each("mouse touch pointer MSPointer-".split(" "),function(i,prefix){
        var _prefix=/pointer/i.test(prefix)?'pointer':prefix;
        $.each(states,function(endfix,code){
            var ev=camelCase(prefix+endfix);
            evs.push(ev);
            POINTERS[_prefix]={};
            event2type[ev.toLowerCase()]=_prefix;
            event2code[ev.toLowerCase()]=code;
        });
    });
	
    K.EVENTS=evs.join(" ");
    
    K.isMobile=supports.touch && $(window).width()<=580;

    $('body').addClass($.map(supports,function(stat,prop){
        if(stat)return camelCase('can-'+prop);
    }).join(" "));

    $.fn.extend({
        tap:function(fn){
            return $(this).on('tap',fn);
        }
    });

    ;(function(){
        var el,stime,sx,sy,ox,oy,isRight,pointerType,timer;
        $(document).on(K.EVENTS,function(ev){
            filterEvent(ev);
            isRight=ev.which<2&&(!pointerType||pointerType==ev.eventType);

            switch(ev.eventCode){
                case 1:
                    if(isRight&&ev.length<2&&!stime){
                        clearTimeout(timer);
                        if(!pointerType){
                            pointerType=ev.eventType;
                        }
                        stime=+new Date;	
                        sx=ev.pageX;
                        sy=ev.pageY;
                        ox=0;
                        oy=0;
                        el=ev.target;
                    }
                    break;
                case 3:
                    if(isRight&&!ev.length&&stime){
                        var otime=+new Date-stime,
                            _ox=Math.abs(ox),
                            _oy=Math.abs(oy),
                            dir;
                        if(_ox<5&&_oy<5){
                            if(otime<300){
                                trigger(el,'tap',otime);
                            }else{
                                trigger(el,'longTap',otime);
                            }
                        }else if(otime<600&&(_ox>30||_oy>30)){
                            if(_ox>_oy){
                                dir=ox>0?'right':'left';
                                trigger(el,'swipe',{time:otime,distance:_ox,direction:dir});
                            }else{
                                dir=oy>0?'down':'up';
                                trigger(el,'swipe',{time:otime,distance:_oy,direction:dir});
                            }
                            trigger(el,'swipe'+dir,{time:otime,distance:Math.max(_ox,_oy)});
                        }
                        el=stime=sx=sy=null;
                        timer=setTimeout(function(){
                            pointerType=null
                        },400);
                    }
                    break;

                case 2:
                    if(isRight&&stime){
                        ox=ev.pageX-sx;
                        oy=ev.pageY-sy;
                    }
                    break;
            }
        });
	})();

    ;(function(){
        var ret={
            medium: '(max-width: 780px)',
            small: '(max-width: 580px)',
            normal: '(min-width: 780px)',
            large: '(min-width: 1300px) and (min-height: 750px)'
        }
        
        if(typeof matchMedia=='function'){
            $.each(ret, function(name,media){
                var mq=matchMedia(media);
                if(mq.addListener){
                    mq.addListener(function(){
                        if(mq.matches){
                            K.screen=name;
                        }
                    });
                }
                if(mq.matches){
                    K.screen=name;
                }
            });
        }else{
            K.screen='normal';
        }
    })();
    

    return K;
});

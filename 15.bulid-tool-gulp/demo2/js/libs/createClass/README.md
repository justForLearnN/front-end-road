createClass
===========

> 提供简单快速创建可维护、可扩展的（继承、重写）类的方法

## 使用方法

方法说明
```javascript
/*
 * @param Function `constructor` 类的构造体函数
 * @param Object `prototype` 将会扩展到原型上的一组对象方法
 * @param Function `parentConstructor` 要继承的父类，支持多继承（多继承情况下第一个出现的父类会作为默认原型）
 *
 * @return Class 返回包装好的类，可以通过new来实例化类对象；也可以省略new操作符
 *
 * 类方法支持 private、static 等关键词声明，参加下方例子。使用该关键词的方法在相关使用时会被优先调用：一个类声明了两个同名方法，一个使用了private关键声明为私有方法；则内部调用时会执行私有方法，外部调用会执行公有方法。
 * 子类方法或者构造函数中可以使用 _super 来调用父类方法或者构造函数
 * 具体使用请参加下方例子（* 私有方法声明不支持ES5严格模式"use strict"，因为Function.caller无法获取。如果需要private，请确认该类在非严格模式上下文中定义）
 */
function createClass(constructor,[prototype,...],[parentConstructor,...]){
	//...
}
````

###例1 创建类
```javascript
	//创建Car类，拥有一个 name 属性，两个公有 getName、getNameByPrivate 方法，两个私有 getName、getNamePrivate 方法，一个静态 getName 方法
	var Car=createClass(function(name){
			this.name=name;
		},{
			getName:function(){
				return this.name;
			},
			getNameByPrivate:function(){//内部调用将优先调用私有方法
				return this.getName();
			},
			'private:getName':function(){
				return '私有方法调用结果：'+this.getNamePrivate();
			},
			'private:getNamePrivate':function(){
				return this.name;
			},
			'static:getName':function(){
				return '静态调用';
			}
		});
		
	//实例化
	var car=new Car('宝马');
	var car1=Car('奔驰'); //省略`new`操作符
	
	//下面的getName属于外部调用，会执行公有方法
	document.writeln(car.getName());//宝马
	document.writeln(car1.getName());//奔驰
	
	//getNameByPrivate是公有方法，但是其内部调用了私有的getName方法，所有输出有所不同
	document.writeln(car.getNameByPrivate());//私有方法调用结果：宝马
	
	//静态方法调用
	document.writeln(Car.getName());//静态调用
	
	//下面调用会报错，因为私有方法不允许外部调用
	try{car1.getNamePrivate()}catch(e){document.writeln(e.message);}//Cant not run a private method!
````

###例2 创建并继承父类
```javascript
	//创建Bike类，继承Car的方法并添加一个新方法`getDesc`
	var Bike=createClass(function(name){
			`this._super(name);`//调用父类的构造方法
		},{
			getDesc:function(){
				return '这是一辆'+this.getName();
			}
		},Car);
		
	//实例化
	var bike=new Bike('自行车');
	document.writeln(bike.getName());//自行车
	document.writeln(bike.getDesc());//这是一辆自行车
````

###例3 创建并继承多个父类
```javascript
	//使用普通方法创建一个Drive类（验证多继承同样适用于非使用createClass创建的类）
	function Drive(name){this.name=name;}
	Drive.prototype.start=function(){
		this.status='行驶中';
	}
	Drive.prototype.stop=function(){
		this.status='停止';
	}
	
	//创建Bus类，继承Car、Drive的方法并添加一个新方法getColor
	var Bus=createClass(function(name,color){
			this._super(name);//调用父类的构造方法
			this.color=color;
		},{
			getColor:function(){
				return this.color;
			},
			getDesc:function(){//重写父类方法，并通过_super来调用父类方法
				return this._super()+'，颜色是'+this.getColor();
			}
		},Drive,Bike);
		
	//实例化
	var bus=new Bus('公共汽车','黄色');
	bus.start();//调用继承自父类的方法
	document.writeln(bus.status);//行驶中
	document.writeln(bus.getColor());//黄色
	document.writeln(bus.getDesc());//这是一辆公共汽车，颜色是黄色
	document.writeln(bus.getName());//公共汽车
````

###例4 扩展类、实例
```javascript
	//CLASS.fn.extend 是扩展CLASS的原型方法属性
	//CLASS.extend 则是返回一个继承了CLASS类的子类
	//INSTANCE.extend 扩展实例的静态方法属性
	
	//该例子添加了 setColor 方法到 Bike 类的原型
	Bike.fn.extend({
		setColor:function(color){
			this.color=color;
		}
	}); 
	//该例子给bike对象添加了 `setName` 静态方法
	bike.extend({
		setName:function(name){
			this.name=name;
		}
	});
	
	var BikeSub=Bike.extend({
			getDesc:function(){
				return this._super()+'，非常非常漂亮'
			}
		}); //等同于 createClass(Bike,{});
	var subbike=new BikeSub('漂亮的自行车');
	
	bike.setColor('白色');
	bike.setName('我的自行车');
	document.writeln(bike.name);//我的自行车
	document.writeln(bike.color);//白色
	new Bike('又一辆自行车').setColor('white'); //white 因为setColor是绑定到Bike的原型中的，所以所有基于Bike派生的实例都具有这个方法，下面的setName则不是，会报错
	try{new Bike('又一辆自行车').setName('我的自行车');}catch(e){document.writeln(e.message);} //TypeError: undefined is not a function.  
	
	document.writeln(subbike.getDesc());//这是一辆漂亮的自行车，非常非常漂亮
````

###例5 instanceof 检测
```javascript
	//instanceof 适用于单继承情况检测，对于多继承，请使用 isInstanceof 方法
	document.writeln(car1 instanceof Car) //true
	document.writeln(bike instanceof Bike) //true
	document.writeln(bike instanceof Car) //true
	document.writeln(subbike instanceof Bike) //true
	document.writeln(subbike instanceof Car) //true
	document.writeln(bus instanceof Bus) //true
	document.writeln(bus instanceof Drive) //true Drive是默认被继承的父类，所以原生instanceof可以检测，但是Bike是通过复制属性方法形式继承的，所以原生instanceof或返回false
	document.writeln(bus instanceof Car) //false 同上
	document.writeln(bus instanceof Bike) //false 同上
	document.writeln(bus.isInstanceof(Bus)) //true 通过isInstanceof可以正确检测所有父类以及多重父类
	document.writeln(bus.isInstanceof(Car)) //true
	document.writeln(bus.isInstanceof(Bike)) //true
	document.writeln(bus.isInstanceof(Drive)) //true
````

## 以上代码的测试地址

http://u.boy.im/createClass
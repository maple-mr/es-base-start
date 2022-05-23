# class 继承

## 基本概念

在ES5中继承需要采用原型链的方式进行，在ES6中使用class可以直接通过extends实现继承。子类会继承父类中除私有属性/方法以外的全部属性和方法。

```js
// es5
function SupType () { ... }
function SubType () { ... }
SubType.prototype = new SubType();

// es6
class SupType { ... }
class SubType extends SupType { ... }
```

## super

在ES6中规定，构造函数中必须存在一个 super()  方法，否则报错。在这里 super() 表示的是父类构造函数，新建一个父类的实例对象。

在上一章以简述了 constructor 构造函数的创建，在子类中如果不显示定义，隐式是存在 constructor 方法的，其实子类中也隐式存在 super() 方法。

```js
class SupType {
    constructor() {
        console.log('实例化父类');
    }
}

class SubType extends SupType {
    constructor() {
        super();
        console.log('实例化子类');
    }
}

let type = new SubType();  // 实例化父类 实例化子类
```

::: tip
使用 extends 实现继承必须调用 super() 才能让子类创建自己的 this 对象，其原因在于ES6的继承机制与ES5不同。

在ES5中是先创建一个子类，然后通过 prototype 绑定需要继承的父类，也就是'先实例，后继承'。

但是ES6中是先将父类的属性和方法加到一个空对象上，然后将该对象作为子类的实例，也就是'先继承，后实例'。如果不先实例化父类，则无法获得子类的 this 对象，同时也意味着，实例化子类的时候，必实例化了父类。
:::

```js
class SupType {
    constructor() {
        console.log('实例化父类');
    }
    
    getName() {
        console.log('张三');
    }
}

class SubType extends SupType {
    constructor() {
        super();
        console.log('实例化子类');
        this.getName();
    }
}

let type = new SubType();  // 实例化父类 实例化子类 张三
```

这里还需要注意，子类的 this 对象是继承自父类，所以在没有实例化父类之前，子类中不存在 this 对象，所以在子类中 this 的使用必须在 super() 之后。

前面是将 super() 作为一个方法使用，但同时也可以将 super 作为一个对象使用，在普通方法中 super 对象指向父类的原型对象，在静态方法中指向父类。

```js
class SupType {
    static getName(name) {
        console.log('获取父类name', name);
    }
    
    getAge(age) {
        console.log('获取父类age', age);
    }
}

class SubType extends SupType {
    static getName(name) {
        super.getName('张三');
    }

    getAge(age) {
        super.getAge(25);
    }
}

let sub = new SubType();
SubType.getName();  // 获取父类name 张三
sub.getAge();  // 获取父类age 25 
```

::: tip
super 关键字必须显式指定是作为对象使用还是函数使用，否则报错!
:::

## prototype属性 和 \_\_proto__ 属性

ES5的原型链继承，子类的 \_\_proto__ 属性指向父类，子类原型的 \_\_proto__ 属性指向父类的原型。class是构造函数的语法糖，所以也实现了上面的逻辑。

```js
class SupType { ... }
class SubType extends SupType { ... }
SubType.__proto__ === SupType;  // true
SubType.prototype.__proto__ === SupType.prototype;  // true
```

## Object.getPrototypeOf()

Object.getPrototypeOf() 方法可以用于在子类上获取父类，一般用于判断类之间是否存在继承关系。

```js
Object.getPrototypeOf(SubType) === SupType;
```

## Mixin 混入

Mixin是指多个对象混合程一个对象。

```js
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```

# Proxy

## 概念

proxy类似于一种"元编程"，在编程语言内置的对象前架设一层"代理器"，所有调用此中对象的时候都需要通过这层"代理器"，在这里面可以进行一系列操作。

ES6提供了Proxy的构造函数用于生成 proxy 的实例。proxy对象的所有用法都是通过 new 生成一个"代理器"对象，其中第一个参数是所要代理的目标对象，第二个参数是配置对象，也就是各种操作。

```js
let proxy = new Proxy(target, handler);
```

如果在配置对象中(handler)中没有设置任何的拦截，则等同于直接通向原对象

## get( )

get( ) 方法用于拦截某个属性的读取操作，接受三个参数：目标对象、属性名、proxy实例(可选)

```js
let person = {
  name: '张三'
}

let proxy = new Proxy(person, {
  get: function (target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError("属性" + propKey + "不存在于对象" + target + "中");
    }
  }
})

console.log(proxy.age);   // Uncaught ReferenceError: 属性age不存在于对象[object Object]中
// 不存在上述代理器
console.log(person.age);  // undefined
```

如果一个属性不可配置，且不可写( { configurable: false, writable: false } )，则proxy不可修改该属性，否则报错。

## set( )

set( )方法用于拦截某个属性的赋值操作，可以接受四个参数：目标对象、属性名、属性值、proxy实例(可选)

```js
let validator = {
  set: function (target, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new ReferenceError('非整数');
      }

      if (value > 200) {
        throw new ReferenceError('大于200了');
      }
    }

    target[prop] = value;
    return true;
  }
}

let proxy = new Proxy({}, validator);
```

set代理应当返回一个布尔值，在严格模式下，set代理如果不返回true即报错，返回 false \ undefined 都报错。

## apply( )

apply( ) 方法代理函数的调用，call和apply操作。接受三个参数：目标对象、目标对象上下文对象、目标对象的参数数组。

```js
let handler = {
  apply: function(target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
}

function sum(left, right) {
  return left + right;
}

let proxy = new Proxy(sum, handler);
proxy(1, 2);  // 6
```

## has( )

has( ) 方法拦截 HasProperty 操作，判断对象是否具备某个属性，接受两个参数：目标对象、判断属性名。最典型的触发就是 in 运算符。

```js
// 隐藏以 _ 开头的属性
let handler = {
  has(target, key) {
    if(key[0] === '_') {
      return false;
    }
    return key in target;
  }
}

let faster = {_prop: 'foo', prop: 'bar'};
let proxy = new Proxy(faster, handler);
'_prop' in proxy;  // false
```

目标对象如果不可配置或禁止扩展，则 has 代理后会报错。

## construct( )

construct( ) 方法用于代理 new 命令，接受三个参数：目标对象、构造函数的参数数组、构造函数。

```js
let handler = {
  construct: function(target, args) {
    return {value: args[0]}
  }
}

(new p(1)).value
```

由于 construct() 方法拦截的是构造函数，所以目标对象必须是函数，否则会报错。

## deleteProperty( )

deleteProperty( ) 方法拦截 delete 操作，如果该方法抛出错误或者返回false，则当前属性则无法被删除。

```js
let handler = {
  deleteProperty: function(target, key) {
    delete target[key];
    return true;
  }
}

let fast = {prop: 'foo'};
let proxy = new Proxy(fast, handler);
delete proxy.prop;
```

如果目标对象不可配置，则不能被删除。

## defineProperty( )

defineProperty( ) 方法拦截 Object.defineProperty( ) 操作。

```js
let handler = {
  defineProperty: function(target, key, descriptor) {
    return false;
  }
}

let target = {};
let proxy = new Proxy(target, handler);
proxy.foo = 'bar';
```

## getOwnPropertyDescriptor( )

getOwnPropertyDescriptor()方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。

## getPrototypeOf( )

getPrototypeOf()方法主要用来拦截获取对象原型。

## isExtensible( )

isExtensible( )方法拦截Object.isExtensible()操作。

## ownKeys( )

ownKeys( ) 方法用于拦截对象自身属性的读取操作。

可以拦截 Object.getOwnPropertyNames( )、Object.getOwnPropertySymbols( )、Object.keys( )、for ... in 循环

```js
let target = {
  a: 1,
  b: 2,
  c: 3
}

let handler = {
  ownKeys(target) {
    return ['a']
  }
}

let proxy = new Proxy(target, handler);
Object.keys(proxy);  // ['a']
```

使用 Object.keys( ) 方法时，三类属性会被 ownKeys 过滤掉

- 目标对象上不存在的属性
- 属性名为 Symbol 值
- 不可遍历 (enumerable) 属性

## preventExtensions()

preventExtensions()方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。

## setPrototypeOf()

setPrototypeOf()方法主要用来拦截Object.setPrototypeOf()方法。

```js
let handler = {
  setPrototypeOf: function(target, proto) {
    throw new ReferenceError('不允许修改')
  }
}

let proto = {};
let target = function (){};
let proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);  // 不允许修改
```

## revocable()

proxy.revocable() 方法返回一个可取消的Proxy实例，该对象的proxy属性是Proxy的实例，该对象的revoke属性是一个函数，可以取消Proxy实例。

```js
let target = {},
    handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.xy = 123;
proxy.xy;  // 123

revoke();

proxy.xy;  // TypeError
```




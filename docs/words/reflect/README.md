# Reflect

ES6中为了操作Object而提供的新型API，Reflect对象的出现将Object对象中明显属于函数内部的方法转移到Reflect对象上。目前关于Object对象的方法同时在Object与Reflect中存在，但是后期会逐步被替代。

## 静态方法

### get( )

查找并返回target对象的name属性，如果不存在此属性则返回undefined。如果target对象制定了getter，则receiver为getter指定的this值。第一个参数不是对象则报错。

```js
let testObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    }
}

let testReceiverObject = {
    foo: 3,
    bar: 4
}

Reflect.get(testObject, 'foo');  // 1
Reflect.get(testObject, 'baz');  // 3
Reflect.get(testObject, 'baz', testReceiverObject);  // 7
Reflect.get(1, 'baz');  // TypeError: Reflect.get called on non-object
```

### set( )

设置target对象的name属性等于value。如果name属性设置了赋值函数，则赋值函数的this绑定receiver。第一个参数不是对象则报错。

```js
let testObject = {
    foo: 1,
    set bar(value) {
        return this.foo = value;
    }
}

let testReceiverObject = {
    foo: 3
}

Reflect.set(testObject, 'foo', 4);  // foo: 4
Reflect.set(testObject, 'bar', 4);  // foo: 4
Reflect.set(testObject, 'foo', 1, testReceiverObject);  // foo: 1
Reflect.set(1, foo);  // TypeError: Reflect.set called on non-object
```

### has( )

判断对象中是否存在此属性或者方法。第一个参数不是对象则报错。

```js
let testObject = {
    foo: 1
}

Reflect.has(testObject, 'foo');  // true
```

### deleteProperty( )

删除对象中的属性/方法，删除成功返回true，失败返回false。第一个参数不是对象则报错。

```js
let testObject = {
    foo: 1,
    bar: 2
}

Reflect.deleteProperty(testObject, 'foo');  // true
```

### construct( )

提供了另一种除new以外的实例化对象的方法。

```js
function testFunction(name){
    this.name = name;
};

Reflect.construct(testFunction, ['测试']);  // 测试
```

### getPrototypeOf( )

读取对象中的 __photo__ 属性。参数不是对象则报错。

```js
let test = new Test();

Reflect.getPrototypeOf(test) === Test.prototype;
```

### setPrototypeOf( )

设置对象的原型。第一个参数不是对象，或为undefined/null则报错。

```js
let test = {};
let testProp = {};

Reflect.setPrototypeOf(test, testProp);
```

### apply( )

修改this对象的指向。

### defineProperty( )

设置对象中的属性。第一个参数不是对象则报错。

```js
let test = {};
Reflect.defineProperty(test, 'foo', {
    value: () => Date.now()
});
```

### getOwnPropertyDescriptor( )

获取指定对象的描述对象

```js
let test = {
    foo: 1
};
Reflect.getOwnPropertyDescriptor(test, 'foo');
```

### isExtensible( )

获取当前对象是否可扩展

```js
let test = {};

Reflect.isExtensible(test);  // true
```

### preventExtensions( )

设置当前对象为不可扩展对象。

```js
let test = {};

Reflect.preventExtensions(test);  // true
```

### ownKeys( )

获取当前对象的全部属性。

```js
let test = {
    foo: 1,
    baz: function() {
        console.log('baz');
    }
}
Reflect.ownKeys(test);  // ['foo', 'baz']
```

## 观察者模式

启用观察者模式(Observer mode)指的是函数自动观察对象，对象出现数据变化，则函数自动执行。

```js
const person = observable({
  name: '张三',
  age: 20
});

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';
// 输出
// 李四, 20
```
# 对象扩展

## 扩展

### 属性/方法的简洁表示

ES6允许当对象中出现属性值与属性名相同时，只写一次。对象中的函数也可以省略 function 关键字和冒号。

``` js
let obj = {
    fill,
    push(x) {
        console.log(x);
    }
}
// 相当于
let obj = {
    fill: fill,
    push: function(x) {
        console.log(x);
    }
}
```

### 属性/方法名多样化

ES6中不仅允许属性名为 String 类型，还允许属性名是表达式。

::: tip
当属性名为表达式/其他类型时，不允许使用点运算符进行引用，仅能使用方括号的形式进行引用。
:::

``` js
let obj = {};

obj.foo = 'foo';
obj.['a'+'c'] = 'aacc';
```

### super关键字

新增super关键字指向当前对象的原型对象。

``` js
let propObj = {
    foo: 'hello'
}

let obj = {
    foo: 'word',
    find() {
        reutrn super.foo;
    }
}

Object.setPrototypeOf(propObj, obj);

obj.find();  // 'hello'
```

## 扩展方法

**is( )**：同值相等运算方法。

::: tip
以往的( == )和( === )判断是否相等都不是同值相等，比如 NaN == NaN  false  NaN === NaN  false
:::

``` js
NaN.is(NaN);  // true
```

**assign( )**：用于对象的合并，将源对象中的可枚举属性复制到目标对象。

``` js
let obj1 = {
    foo: 'foo'
},
    obj2 = {
    foo: 'foos',
    bar: 'bar'    
}

obj1.assgin(obj2);  // { foo:'foos',bar:'bar' }
```

**getOwnPropertyDescriptors( )**：返回指定对象的所有自身属性。

``` js
let obj = {
    foo: 'foo',
}
```

**setPrototypeOf( )**：设置该对象的原型对象。

**getPrototypeOf()**：获取该对象的原型对象。

``` js
let obj = {
    foo: 'foo'
},
    obj1 = {
    bar: 'bar'    
};

Object.setPrototypeOf(obj, obj1);
obj1.getPrototypeOf();  // obj
```

**entries( )**：返回对象中可遍历的属性/方法组成的键值对。

**keys( )**：返回对象中可遍历的属性的键。

**values( )**：返回对象中可遍历的属性的值。

``` js
let obj = {
    foo: 'banbana',
    bar() {
        console.log('a');
    }
};

for(let i of obj.entries()) {
    console.log(i);
}
// foo 'banbana'
// bar 

for(let i of obj.keys()) {
    console.log(i);
}
// foo
// bar

for(let i of obj.values()) {
    console.log(i);
}
```

**fromEntries( )**：用于将键值对转换为对象。

``` js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

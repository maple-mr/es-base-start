# 解构赋值
 
**解构赋值是通过对数组、对象进行解构，将其中值、属性取出，赋值给其他变量的操作。**

## 数组解构

以"模式匹配"的方案进行赋值符两边的变量和数据的对应，当左右两边的变量和数据无法完全匹配时，就会出现不完全解构的现象。

``` js
let [bar, bar1, bar2] = ['one', 'two', 'three'];
console.log(bar, bar1, bar2);  // one two three

let [a, b, c， d] = [1, 2, 3];
let [a1, b1] = [1, 2, 3];
console.log(a, b, c, d);  // 1 2 3 undefined
console.log(a1, b1);  // 1 2
```

由于解构的过程是一个模式匹配的过程，所以匹配时可以忽略某个数据，或者借助扩展运算符( ... )接收剩余的全部数据。

``` js
let [a, , c] = [1, 2, 3];
console.log(a, c);  // 1 3

let [foo, ...bar] = [1, 2, 3, 4];
console.log(bar);  // [2, 3, 4]
```

数组的解构赋值允许指定默认值，当解构的值不存在或undefined时使用默认值。

默认值遵循的是惰性求值的方案，同时默认值也可以是变量，但此变量必须已声明。

``` js
let [a, b=2] = [1];
console.log(a, b);  // 1 2

let [a, b=2, c] = [1, , 3];
console.log(a, b, c);  // 1 2 3

let [a, b=2, c] = [1, undefined, 3];
console.log(a, b, c);  // 1 2 3

function fun() {
    console.log('This is Fun');
}
let [a=fun()] = [1];
console.log(a);  // 1  并未触发函数调用，所以是惰性求值

let [x=1, y=x] = [];
console.log(x, y);  // 1 1

let [x=y, y=1] = [];  // ReferenceError: y is not defined

let [x=y, y=1] = [3, 4];
console.log(x, y); // 3 4   侧面证明此处是惰性求值
```

事实上不止数组，凡是具备 Iterator 接口的数据结构，都可以采用数据的形式进行解构赋值。

``` js
let [a, b, c] = 'hellow';
console.log(a, b, c);  // h e l

let [a, b, c] = new Set([1, 2, 3]);
console.log(a, b, c);  // 1 2 3
```

## 对象解构

对象解构也是遵循模式匹配的原则，但是由于对象内的属性是无序的，无法与数组一样按照顺序进行解构，所以对象是以变量和属性/方法名相匹配的方案进行解构的。

``` js
let {foo, bar, con} = {foo: '123', bar: '456'};
console.log(foo, bar, con);  // 123 456 undefined

let wrapper = {
    foo: '123',
    bar: '456',
    con: function(){
        console.log('789');
    }
};
let {foo, con} = wrapper;
console.log(foo);  // 123
con();  // 789
```

::: tip
事实上对于上述对象的解构写法是简写形式，真正的写法是 {foo: foo, bar: bar} = wrapper ，此处的这种简写是对象属性的简洁表达。
:::

对象解构也可以增加默认值，同时只有当解构的赋值不存在或者为undefined时会使用默认值。

``` js
let {foo, bar='456'} = {foo: 123};
console.log(bar);  // 456

let {foo='123'} = {};
console.log(foo);  // 123

let {bar='456'} = {bar: undefined};
console.log(bar);  // 456
```

## 解构赋值的注意点

### 多层嵌套解构

多层嵌套进行解构时，如果是数组不但需要进行顺序的匹配，同时需要进行嵌套层级的匹配，才能达到完全匹配的效果。

``` js
let [foo, [[bar]], con] = [1, [[2]], 3];
console.log(foo, bar, con);  // 1 2 3 

let [foo, [bar], con] = [1, [[2]], 3];
console.log(foo, bar, con);  // 1 [2] 3
```

多层嵌套的对象进行解构时，也需要进行嵌套层级的匹配。

``` js
let obj = {
    foo: {
        bar: {
            con: function() {
                console.log('This is con');
            }
        }
    }
};
let {foo:{bar:{con: f1}}} = obj;
f1();  // This is con
let {foo: f2} = obj;
f2;  // {bar: {con: function(){console.log('This is con')}}}
```

### 已声明变量解构

当出现先声明的变量进行对象解构时，可能出现报错。(Ps: 新版本的Chrome中已修复此问题，但是为兼容老版本尽量使用此种写法)

``` js
let x, y;
{x, y} = {x: 1, y: 2};  // SyntaxError: syntax error
({x, y} = {x: 1, y: 2});  // 需使用此种写法
```

### 数值和布尔值解构

当数值和布尔值进行解构赋值时，会默认转换为对象的形式(包装类)，然后对此对象进行解构。

``` js
let {toFixed: a, toString: b} = 123;
a;  // function toFixed
b;  // function toString

let {toString: s} = true;
s;  // function toString
```

### 函数参数的解构赋值

函数的参数进行解构时，也可以使用默认值，但是需要注意在解构的地方使用小括号。

``` js
function foo(({x, y} = {x: 1, y: 2})) {
    return x + y;
}
foo({x:4, y:5});  // 9
foo({x:4});  // 6
foo({});  // 3
foo();  // 3

function bar({x, y} = {x: 1, y: 2}) {
    return x + y;
}
bar{{x:4, y:5}}  // 9
bar({x:4});  // 4undefined
bar({});  // undefinedundefined
bar();  // 3
```

::: tip
注意这两种写法存在本质性的区别：

前一种是对函数的形参进行解构赋值，所以当出现不指定值，或指定空值时会遵循解构赋值的规则。

后一种其实是对函数的形参进行赋值，赋值以后再进行解构赋值的操作。所以当出现不完全解构的时候，在赋值阶段就已经是undefined了。
:::

### 解构属性不存在于此对象

解构对象其实并不单纯仅针对当前对象进行解构，当在此对象中找不到相应的属性时，会向上寻找其原型链上是否存在此属性，返回该属性值。

``` js
let obj = {
    foo: '123'
};
obj.__proto__.bar = '456';
let {foo, bar} = obj;
```

## 解构赋值的应用

### 数据交换

通常存在数据交换场景时，我们都需要一个中间变量临时存储要交换的数据。如果使用解构赋值则不需要。

``` js
let a = 1,
    b = 2;
[a, b] = [b, a];  // a: 1  b: 2
```

### 获取对象中的部分方法/属性

在某个对象中仅需使用某个方法/属性时，可以使用解构赋值的方式从对象中将特定方法/属性提取出来。

``` js
let obj = {
    a: 123,
    b: '456',
    c: function() {
        console.log('789');
    },
    d: function() {
        console.log('101');
    }
}

let {a, d} = obj;
d();  // 101
```

### 加载引入模块中的指定方法

涉及到从其他地方 import / require 引入模块时，需要加载其中某个特定方法，则可以通过解构拿到。

``` js
import { mapGetters, mapMutations } from 'vuex'
```

<jy-browser-compatible :versionArr="[{ver:'49',state:'full'},{ver:'14',state:'full'},{ver:'41',state:'full'},{ver:'NO',state:'no'},{ver:'36',state:'full'},{ver:'8',state:'full'},{ver:'49',state:'full'},{ver:'49',state:'full'},{ver:'41',state:'full'},{ver:'36',state:'full'},{ver:'8',state:'full'},{ver:'5.0',state:'full'},{ver:'1.0',state:'full'},{ver:'6.0.0',state:'full'}]"></jy-browser-compatible>

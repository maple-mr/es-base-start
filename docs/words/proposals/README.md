# 最新提案

## do表达式

do表达式就是将块级作用域变为表达式返回内容，本身块级作用域不存在返回值，使用do表达式返回内容可以让代码模块化程度更高。

```js
let demo = do {
  if(test === 0) {
    foo();
  }else if(test === 1) {
    bar();
  }else {
    defaults();
  }
}
```

## throw表达式

js规定throw是一个命令，一般用于 try...catch 中抛出错误使用，不能用在表达式中。

新提案为允许 throw 作为运算符出现，将抛出的错误用于表达式中展现出来。

为避免与 throw 命令混淆，规定凡是 throw 出现在行首皆为 throw 命令。

```js
function test(name = throw new TypedError('error')) {
  console.log(name);
}
```

## 函数的部分执行

在函数本身之上衍生的新函数一般使用的是：调用原函数穿参不同、bind函数绑定两种方式。

新提案通过使用占位符的方式让新函数的展示更加方便，方法为"函数的部分执行"。

```js
// 传统方法
function add(x, y) {
  return x + y;
}

function addOne(x) {
  add(x, 1);
}

function addOne(x) {
  add.bind(null, 1);
}

// 新提案
function addOne() {
  add(x, ?);  // 单个参数的占位符
}

function addOne() {
  add(x, ...);  // 多个参数的占位符
}
```

**注意点：**

- 函数部分执行基于原函数

当原函数发生改变的时候，基于原函数衍生的新函数也会随之发生变化。

```js
let test = (x, y) => x + y;

const demo = test(?, 6);
demo(6);  // 12

test = (x, y) => x * y;
demo(6);  // 36
```

- 函数部分执行在每次调用时才进行求值

如果预先提供的值是一个表达式，那么这个表达式在定义时不会触发求值，而是在调用时进行求值，且每次调用重新求值。

```js
let a = 2;
let test = (x, y) => x + y;

const demo = test(?, a);
demo(10);  // 22

a = 5;
demo(10);  // 25
```

- 函数部分执行只取占位符对应的参数

当新函数的实参多于占位符的数量时，后面的参数会被舍弃掉。

```js
let test = (x, y) => x + y;

const demo = test(?, 10);
demo(1);  // 11
demo(1, 2, 3, 4);  // 11
```

- ...多个占位符只会采集一次

当新函数使用了多个 ... 占位符时，每一个 ... 都是相同的值。

```js
let test = (...x) => x;

const demo = test(..., 5, ...);
demo(1, 2, 3, 4);  // [1, 2, 3, 4, 5, 1, 2, 3, 4]
```

## 管道运算符

Unix操作系统存在一个管道机制，可以将前一个操作的值传给后一个操作，这样可以将简单的操作通过连续的组装成为一个复杂的操作。

新提案在 js 中增加了管道运算符，写为 |> ，左边是表达式，右边是函数，管道运算将左边的表达式传入右边的函数中。

```js
test |> demo
// 等同于
demo(test);

// 传统链式函数写法
foo(bar(test('hello')));

// 管道写法
'hello'
  |> test
  |> bar
  |> foo
```

注意：管道运算符只能传递一个值，这意味着它右边的函数必须是一个单参数的函数，如果是多参数的函数必须要通过"柯里化"改成单函数的形式。

## Math.signbit()

新提案增加 Math 中的 signbit() 方法用于确定当前数的符号位是否设置了。

```js
Math.signbit(2);  // false
Math.signbit(-2);  // true
Math.signbit(+2);  // true
```

## 函数绑定运算符

新提案函数绑定运算符使用 :: 代替原 call、apply、bind等方法，函数绑定运算符的左边是一个对象，右边是一个函数，该运算符会自动将左边的对象作为上下文环境绑定到右边的函数上。

```js
foo::bar
// 等同于
bar.bind(foo);

foo::bar(...args);
// 等同于
bar.apply(foo, args);
```

## JSON模块

目前想要引入独立的 json 文件需要使用 fetch() 或者 ajax请求本地文件的方式进行引入。

新提案允许使用 import 命令进行 json 模块的加载

```js
import configJSON from "./config.json" assert {type: 'json'};

console.log(configJSON);
```


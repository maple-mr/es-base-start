# Generator 函数

## 基本概念

Generator 函数是 ES6 中提供的一种异步编程解决方案。Generator 函数并非是构造函数，仅是普通函数，这是一种“状态机”函数。

Generator 函数与其他函数比较明显的不同是：
- function关键字与函数名之间存在一个 * 符号
- 函数体内部采用 yield 表达式定义函数内不同的状态
- 函数并非调用即执行，需要使用 next() 方法进行状态的切换，才会继续执行 

```js
function* testGenerator() {
    yield 'a';
    yield 'b';
    return 'close';
}

let ts = testGenerator();

ts.next();  // {value: 'a', done: false}
ts.next();  // {value: 'b', done: false}
ts.next();  // {value: 'close', done: true}
ts.next();  // {value: undefined, done: true}
```

这里创建的 Generator 函数共有三个状态，每执行一次 next() 状态向下更改一次，value为当前状态值，done为false，直至遇到 return ，value返回当前状态值，done为true，再执行 next() 方法 value为undefined，done为true。

## yield 表达式

因为 Generator 函数是“状态机”函数，yield 表达式就是一个个状态，next() 方法进行状态切换。

```js
function* testGenerator() {
    yield 1 + 2;
    yield 'a';
    return 'close';
}

let ts = testGenerator();

ts.next();  // 3
```

yield 身后跟随的是一个表达式，并且是一个惰性求值的表达式，只有当 next() 方法走到这条“状态”时才会执行。

yield 表达式只能在 Generator 函数中使用，在其他地方使用会报错。即使是Generator函数中嵌入的函数，使用 yield 表达式也会报错。如果 yield 表达式需要在另一个表达式中使用，必须加括号。

```js
function* testGenerator() {
    yield 'a';
    ['a', 'b', 'c'].forEach((res) => {
        yield res;  // error
    });
    console.log('a' + (yield 'b' + 'c'));
}
```

## next( )方法

yield 表达式并不存在返回值，所以每一次执行 next() 方法切换状态都是一次全新的“开始”。

但是 next() 方法也可以存在一个可选的参数，该参数会被当做上一个 yield 表达式的返回值。但是第一次执行 next() 方法时传递的参数无效。

```js
function* testGenerator(v) {
    yield v;
    yield v + 1;
    yield v + 2;
}

let ts = testGenerator(1);

ts.next();  //  1
ts.next(2);  // 3
ts.next(2);  // 4
```

## throw( )方法

Generator 函数返回的遍历器对象都存在 throw() 方法，可以在函数体外抛出错误，在函数体内部接收。但这种接收方法必须先执行一次 next() 方法，且仅能触发一次，当函数内部接收错误方法执行后，再次触发会被外部接收。

throw() 方法抛出错误的时候，存在一个可选参数，一般为 Error 实例。

```js
function* testGenerator(v) {
    try {
        yield 'a';
    }catch(e) {
        console.log('Generator函数内部捕获错误', e);
    }
}

let ts = testGenerator();
ts.next();

try {
    ts.throw('on');  // Generator函数内部捕获错误 on
    ts.throw('up');  // Generator函数外部捕获错误 up
}catch(e) {
    console.log('Generator函数外部捕获错误', e);
}
```

如果 Generator 函数内部不存在 try...catch 接收错误，则此错误会直接被外部 try...catch 捕获。如果内外都不存在 try... catch 则直接报错。

throw() 方法在抛出错误被 Generator 函数内部捕获错误的时候，会顺带执行一句 next()，即触发 Generator 函数内部的 try...catch 时，会执行之后的一条 yield。

```js
function* testGenerator(v) {
    try {
        yield 'a';
    }catch(e) {
        console.log('Generator函数内部捕获错误', e);
    }
    yield 'b';
    yield 'c';
}

let ts = testGenerator();
ts.next();  // a
ts.throw();  // Generator函数内部捕获错误 undefined b
ts.next();  // c
```

Generator函数内部的错误也可以被外部捕获到，只要函数内部不存在 try...catch。

## return( )

通过 return() 方法直接让 Generator 函数返回给定值，且终止 Generator 函数。

如果 Generator 函数中存在 try...finally 则执行 return() 方法时将直接进入 finally 代码中执行完成后终止函数。

```js
function* testGenerator(v) {
    yield 'a';
    try {
        yield 'b';
    }finally {
        console.log('终止函数执行');
    }
    yield 'b';
    yield 'c';
}

let ts = testGenerator();
ts.next();  // a
ts.return();  // undefined 终止函数执行 
```

## yield* 表达式

如果在一个 Generator 函数的内部调用另一个 Generator 函数，则需要使用到 yield* 表达式的写法。

```js
function* yieldGen() {
    yield 'a1';
    yield 'a2';
}

function* yieldGen1() {
    yield 'b1';
    yield* yieldGen();
    yield 'b2';
}

let ts = yieldGen1();
...ts;  // b1 a1 a2 b2
```

```js
// 等价于
function* yieldGen() {
    yield 'a1';
    yield 'a2';
}

function* yieldGen1() {
    yield 'b1';
    for(let i of yieldGen()) {
        yield i;
    }
    yield 'b2';
}

let ts = yieldGen1();
...ts;  // b1 a1 a2 b2
```

::: tip
这里注意，yield* 身后跟随的是 Generator 函数，而 yield 身后跟随的是表达式。这里 yield* 身后跟随的不单单可以是 Generator 函数，任何具备 Iterator 接口的的数据都可以被遍历。
:::

```js
function* testGenerator() {
    yield [1, 2, 3, 4];
    yield* [1, 2, 3, 4];
}

let ts = testGenerator();
ts.next();  // [1, 2, 3, 4]
ts.next();  // 1, 2, 3, 4
```

## for...of 循环

使用 for...of 循环可以替代 next() 方法遍历 Generator 函数的 yield 表达式。

```js
function* yieldGen() {
    yield 'a1';
    yield 'a2';
    yield 'a3';
}

let ts = yieldGen();
for(let i of ts) {
    console.log(i);
}
// a1
// a2
// a3
```
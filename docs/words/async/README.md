# async 函数

### 基本概念

async函数本质上就是 Generator 函数的语法糖。

async函数对 Generator 函数的优化在以下几个方面：

- <b>内置执行器</b>：Generator 函数中必须依靠类似于 next() 方法的执行器向下推进。但 async 函数内置了执行器，会自动执行。

- <b>语义化</b>：async 函数和 await 相较于 * 符号 和 yield 而言，语义化更清晰。

- <b>适用性</b>：yield 命令后只能跟随 Thunk 函数和 Promise 对象，await 命令后可以是 Promise对象、String、Number、Boolean等。

- <b>返回值</b>：async 函数返回值是 Promise 函数，Generator 函数返回的是 Iteartor 对象。

```js
const ajax = function(url) {
    return new Promise(function(resolve, reject) {
        return resolve();
    })
}

const test = function* () {
    const t1 = yield ajax();
    const t2 = yield ajax();
}

// 简写
const test = async function () {
    const t1 = await ajax();
    const t2 = await ajax();
}
```

### 基本用法

async 函数返回的是Promise 对象，所以当出现顺序调用时比较方便。

async 函数存在多种使用形式：

```js
// async 函数声明
async function test() {}

// async 函数表达式
const test = async function () {}

// 对象内的 async 函数
const test = {
    asyncTest: async function () {},
}

// class内的 async 方法
class Test = {
    async foo(name) {
        return name;
    }
}

// 箭头函数
const test = async () => {}
```

### async 函数返回对象

async 函数返回的是一个 Promise 对象，所以函数内部的 return 语句返回的值可以在 async 函数调用处通过 then 方法获取。

这里的 then() 方法需要在 async 函数中的 await 命令全部执行完成，或其中抛出错误，又或者遇到 return 语句才会触发。

```js
async test(name) {
    return name;
}

test('foo').then((v) => {
    console.log(v);  // foo
})
```

而 async 函数内部抛出的错误，则会使此 Promise 对象的状态变为 rejected ,抛出的错误会被外部的 catch 方法所接收。

```js
async test(name) {
    throw new Error(name);
}

test('bar').catch(error => {
    console.log(error);  // Error bar
})
```
### await命令

在 async 函数中 await 命令后跟随的一般是 Promise 对象，如果不是，则直接返回后面跟随的值。

```js
async function test () {
    return await 132;
}

test().then(res => {
    console.log(res);  // 132
})
```

这里需要注意，await 命令是顺序操作，当前面的命令执行完毕后，后面的命令才跟随执行。但是如果前面的命令执行过程中报错，则直接终止当前整个 async 函数的执行。

如果希望前面的 await 命令执行失败后，后面的 await 命令继续执行，建议在 async 函数中使用 try...catch。

```js
async function test () {
    await Promise.reject('报错了');
    await Primise.resolve('a-sword');  // 不执行
}

// try...catch 改写
async function test () {
    try {
        await Promise.reject('报错了');
    } catch (e) {

    }
    await Primise.resolve('a-sword');
}

test().catch(res => {
    console.log(res);  // Error 报错了
})
```






# 异步遍历器

## 基本概念

异步遍历器是为解决同步遍历器 (iterator) 无法实现异步操作效果而产生的一种特殊遍历方式，主要区别与同步遍历器的地方在于 value 和 done 都是异步产生的，调用 next( ) 方法返回的是一个 promise 对象。

使用 then( ) 获取 promise 对象变成 resolve 以后的回调函数，该回调函数的参数是具有 value 和 done 两个属性的对象。

```js
const asyncIteratorTest = createAsyncIterable(['a', 'b']),
      asyncIteratorTest1 = asyncIteratorTest[Symbol.asyncIterator]();

asyncIteratorTest1.next().then(itera => {
  console.log(itera);
  return asyncIteratorTest1.next();  // { value: 'a', done: false }
}).then(itera1 => {
  console.log(itera1);
  return asyncIteratorTest1.next();  // { value: 'b', done: false }
}).then(itera2 => {
  console.log(itera2);
  return asyncIteratorTest1.next();  // { value: undefined, done: true }
})
```

## for await...of

在同步遍历器中使用 for...of 循环，在异步遍历器中使用 for await...of 进行循环，不过 for await...of 也可以用于同步遍历器。

```js
async function test() {
  for await (let i of asyncIteratorTest(['a', 'b'])) {
    console.log(i);
  }
}
```

## 异步 Generator 函数

异步的 Generator 函数返回的是一个 异步遍历器 对象。

```js
async function* test() {
  yield 'test';
}
const testObj = test();
testObj.next().then(item => {
  console.log(item);
})
```

## yield* 语句

yield* 语句后也可以跟一个异步遍历器。

```js
async function* gen1() {
  yield 'a';
  yield 'b';
  return 2;
}

async function* gen2() {
  const result = yield* gen1();
}
```

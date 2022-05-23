# iterator

## iterator概念

Iterator 是针对"集合"类型的数据进行遍历操作的统一接口，本质上是一个指针对象。通过调用对象中的 next() 方法不断获取下一个对象。第一次调用next执行"集合"中的第一个成员，第二次调用指向第二个，依此类推，直道next指向最后一个时，调用结束。

每一次调用 next() 方法都会返回当前成员数据，数据中一般包含两个属性：value和done。value表示当前成员的值，done标识当前遍历是否结束。

```js
let testArr = ['a', 'b', 'c'],
    testItem = testIterator(testArr);

testItem.next();  // {value: 'a', done: false}
testItem.next();  // {value: 'b', done: false}
testItem.next();  // {value: undefined, done: true}

function testIterator(arr) {
    let nextIndex = 0;
    return {
        next: function () {
            return nextIndex < arr.length?
                {value: arr[nextInex++], done: false}:
                {value: undefined, done: true}
        }
    }
}
```

:::tip
注意这里遍历的时候，存在下一个成员的情况下，done 属性可以省略。不存在下一个成员的情况下，value 属性可以省略。
:::

## return( )

当循环过程中存在提前推出的情况时，可以使用 return() 方法

```js
function readLinesSync(file) {
    return {
        [Symbol.iterator]() {
            return {
                next() {
                    return {done: false}
                },
                return() {
                    file.close();
                    return {done: true}
                }
            }
        }
    }
}
```

## throw( )

此方法主要配合 Generator 函数使用，本章不涉及此方法。

## 默认数据格式iterator接口

一种数据结构只要具备 iterator 接口就认为此数据结构是可遍历的，ES6规定将 iterator 接口部署在 Symbol.iterator 属性中。 Symbol.iterator 属性本身就是一个函数，返回值是一个遍历器。

在js中原生具备 iterator 接口的数据结构有：
- Array
- String
- Map
- Set
- TypedArray
- 函数的形参对象 arguments
- DOM结构对象 NodeList

## 使用场景

### 解构赋值

```js
let test = [1, 2, 3, 4, 5];

let [first, ...rest] = test;  // first = [1] rest = [2, 3, 4, 5]
```

### 扩展运算符

```js
let testString = 'hello';
[...testString];  // h e l l o
```

### yield*

```js
let generator = function* () {
    yield 1;
    yield* [2, 3, 4];
    yield 5;
}

let iterator = generator();
iterator.next();  // {value: 1, done: false}
iterator.next();  // {value: 2, done: false}
iterator.next();  // {value: 3, done: false}
iterator.next();  // {value: 4, done: false}
iterator.next();  // {value: 5, done: false}
iterator.next();  // {value: undefined, done: true}
```

### 其他

- for...of
- Array.form()
- Map()
- Set()
- WeakMap()
- WeakSet()
- Promise.all()
- Promise.race()

## for...of 循环

ES6中加入了 for...of 循环，通过调用 iterator 接口实现遍历效果。

```js
let arr = ['a', 'b', 'c', 'd'];
for(let i of arr) {
    console.log(i); // a b c d
}
```

也可以使用遍历器对象获取当前对象的其他属性值。

- keys()
- values()
- entries()

```js
let arr = ['a', 'b', 'c', 'd'];
for(let i of arr.keys()) {
    console.log(i);  // 0 1 2 3
}

for(let i of arr.values()) {
    console.log(i);  // a b c d
}

for(let i of arr.entries()) {
    console.log(i);  // [0, 'a'] [0, 'b'] [0, 'c'] [0, 'd']
}
```

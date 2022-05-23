# Promise

## promise概念

Promise是一种异步编程的解决方案，可用于在项目中替代回调函数和事件。promise对象的状态不受外部影响，只存在三种状态: pending(响应中)、fulfilled(响应成功)、rejected(响应失败)。只有异步操作的结果会能决定当前状态，其他的任何操作不会改变此状态。

:::tip
因为promise中的函数表示状态使用的是 resolve 和 reject 函数，所以下文中不再使用 fulfilled 作为响应成功，使用 resolve 作为响应成功。
:::

## 基本用法

promise是一个构造函数，所以使用该构造函数应用 new 操作符创建实例。该实例中存在两个方法标识当前异步完成的状态，即：resolve和reject。

```js
const promise = new Promise((resolve, reject) => {
    if(success) {
        resolve(value);
    }else {
        reject(error);
    }
})
```

异步操作成功调用resolve，失败调用reject。无论操作成功还是失败后，可调用then方法进行后续操作。

```js
promise.then(function (value) {
    // 成功的后续操作
}, function (error) {
    // 失败的后续操作
});
```

:::tip
调用resolve或reject后不会影响后续代码的执行。
:::

## then( )

promise实例具备then()方法，该方法的第一个回调函数是 resolve 状态的回调，第二个回调函数是 rejected 状态的回调函数，回调函数中的形参源自于promise中的 resolve/reject 方法的实参。

```js
promise.then(res => {
    console.log(res)
}).then(com => {
    console.log(com);
}, error => {
    console.log(error);
})
```

then() 方法可以采用链式写法，以接收回调函数中的promise对象。

## catch( )

catch() 方法是 then(null, rejection) 方法的别名，指定发生错误时的回调函数。推荐使用catch() 方法接收错误，不推荐使用 reject() 接收。

```js
promise().then(() => {
    
}).then(() => {
    
}).catch((error) => {
    console.log(errpr)
})
```

:::tip
注意promise对象的错误会出现类似于"冒泡"的性质，当前面的回调函数中出现错误且并未接收时，catch() 方法会最终接收到前面的错误。
:::

promise产生的错误并不会影响代码的执行，如果不指定 catch() 方法则仅出现报错信息。

## finally( )

finally() 方法指定一个必会执行的回调函数，此方法不接受任何参数。

```js
promise().then(() => {
    
}).finally(() => {
    console.log('必触发');
})
```

## all( )

all() 方法用于将多个promise实例包装成一个新的promise实例，这些实例中的关系是"与"操作，只有全部为 resolve 的时候总的promise才为 resolve ，当其中一个为 rejected 的时候，总的promise 为 rejected。

```js
const promise = [1, 2, 3, 4, 5].map(id => {
    return getUrl(id);
})

Promise.all(promise).then(() => {
    
}).catch(() => {
    
});
```

当上述5个promise全部执行完毕成功后，才会执行 then() 方法指定的回调函数，其中存在一个执行不成功的则触发 catch() 方法指定的回调函数。

## race( )

race()方法也是将多个promise实例包装成一个新的promise实例，这些实例中的关系是"或"操作，当多个实例中的一个为 resolve 的时候，总实例即为 resolve。多个实例按照时间先后顺序返回。

```js
const promise = [1, 2, 3, 4, 5].map(id => {
    return getUrl(id);
})

Promise.race(promise).then(() => {

}).catch(() => {

});
```

## allSettled( )

上述两种将多个promise实例包装成一个的方法，都是会出现打断操作，也就是当存在一个成功/失败后，后续操作不再进行，直接返回结果。无法满足当所有promise执行完成后，再返回结果的需求。所以 allSettled() 方法解决了这个需求，当全部执行完成后，才返回结果。

```js
const promise = [1, 2, 3, 4, 5].map(id => {
    return getUrl(id)
});

Promise.allSettled(promise).then(() => {

});
```

## any( )

将多个promise实例包装成一个promise实例，当一个状态变为 resolve 的时候，总状态变为 resolve。当全部的状态变为 rejected 时，全部为 rejected。

## resolve( )

将现有对象转换为 promise 对象，调用的是 Promise.resolve 。

```js
let promise = Promise.resolve(getUrl());
```

## reject( ) 

返回一个promise实例，该实例的状态为 rejected。

```js
const primise = Promise.reject('error');
```

# 数组扩展

### 扩展运算符

扩展运算符( ... )相当于对rest参数的逆运算，主要是为了将数组结构解开成为单独的项。

``` js
...[1, 2, 3];  // 1 2 3

function plus(arr, ...item) {
    console.log(item);
}

plus(1, 2, 3, 4);  // 2 3 4
```

## 扩展方法

**from( )**：将类数组结构转换为真正的数组，凡是具备Iterator接口的数据结构都可以进行转换。

``` js
let arrObj = {
    foo: 'foo',
    bar: 'bar',
    length: 2
}

Array.from(arrObj);  // ['foo', 'bar', 2]
```

**of( )**：将一组数据值转换为数组结构，此方法主要是为弥补当使用Array对象创建数组时，只有一个参数的情况。

``` js
let arr = Array.of(1, 2, 3),  // [1, 2, 3]
    arr1 = Array.of(3),  // [3]
    arr2 = new Array(1, 2, 3),
    arr3 = new Array(3);  // ['', '', '']
```

**copyWith( )**：将数组中指定位置的数据复制到其他地方。

**find( )**：找到第一个符合条件的数组项，并返回该项。若找不到则返回undefined。方法的参数是一个回调函数。

**findIndex( )**：找到符合第一个符合条件的数组项，并返回该项的index。找不到则返回-1。方法的参数是一个回调函数。

``` js
[-2, -4, 2, 5, 6].find((n) => {
    return n < 0;
});  // [-2, -4]

[-2, -4, 2, 5, 6].findIndex((n) => {
    return n < 0;
});  // [0, 1]
```

**fill( )**：通过参数值填充一个数组，如果原本数组中存在值，则覆盖。

``` js
new Array(3).fill('x');  // [x, x, x]
[1, 2, 3].fill(6)  // [6, 6, 6]
```

**entries( )**：遍历数组中的键值对。

**keys( )**：遍历数组中的键。

**values( )**：遍历数组中的值。

``` js
let arr = ['foo', 'bar', 'con'];

for(let i of arr.entries()) {
    console.log(i);
}
// 0 'foo'
// 1 'bar'
// 2 'con'

for(let i of arr.keys()) {
    console.log(i);
}
// 0
// 1
// 2

for(let i of arr.values()) {
    console.log(i);
}
// foo
// bar
// con
```

**includes( )**：判断当前数组中是否存在参数值，存在则返回true，不存在返回false。

``` js
let arr = ['foo', 'bar', 'con'];
arr.includes('foo');  // true
```

**flat( )**：将当前多维数组拍平为一维数组。参数为嵌套层数，默认为1层。

**flatMap( )**：将当前数组执行参数函数，然后执行flat( )方法。

``` js
let arr = [[1, 2], 3, [4, [5, 6]]];

arr.flat();  // [1, 2, 3, 4, [5, 6]]
arr.flat(2);  // [1, 2, 3, 4, 5, 6] 
```

**at( )**：获取当前数组中的项，支持副索引。
# Set和Map

## Set

Set是一种类似于数组的数据结构，其本身是一个构造函数。此结构可以存储任意类型的数据，但不允许数据出现重复值。

::: tip
注意这里不允许出现重复值的算法并非是 ( === )，NaN在Set中被认为是相等的，+0和-0也被认为是相等的。
:::

``` js
let onlyData = new Set();
```

### Set属性

**size**：返回当前Set实例的成员总数。

``` js
let onlyData = new Set([1, 2]);
onlyData.size;  // 2
```

### Set方法

**add( )**：向Set结构添加数据。

**delete( )**：将Set结构中某数据删除。

**has( )**：判断当前Set结构中是否存在参数值。

**clear( )**：清空当前Set结构。

``` js
let onlyDatas = new Set();
onlyDatas.add(1).add(2).add(3);  // Set(3) {1, 2, 3}
onlyDatas.delete(2);  // Set(3) {1, 3}
onlyDatas.has(1);  // true
onlyDatas.clear();  // Set(0) {}  注意这里是不存在返回值的
```

**entries( )**：遍历Set结构中的键值对。

**keys( )**：遍历Set结构中的键。

**values( )**：遍历Set结构中的值。

**forEach( )**：循环遍历整个Set。

``` js
let onlyData = new Set(['a', 'b', 'c']);
for(let i of onlyData.entries()) {
    console.log(i);
}
// 0 'a'
// 1 'b'
// 2 'c'

for(let i of onlyData.keys()) {
    console.log(i);
}
// 0
// 1
// 2

for(let i of onlyData.values()) {
    console.log(i);
}
// 'a'
// 'b'
// 'c'

onlyData.forEach((item) => {
    console.log(item);
});
// 'a'
// 'b'
// 'c'
```

### Set的应用

通过Set结构创建交集、并集、差集

``` js
let item1 = [1, 2, 3],
    item2 = [3, 4, 5],
    unionSet,
    intersectSet,
    difference;

intersectSet = new Set([...item1, ...item2]);  // [1, 2, 3, 4, 5]
unionSet = new Set([...item1].filter(e => item2.has(e)));  // [3]
difference = new Set([...a].filter(e => !item2.has(e)));  // [1, 2, 4, 5]
```

## WeakSet

WeakSet结构是与Set结构相似的数据结构，同样不允许出现重复的项。

::: tip
虽然与Set相似，但仍存在不同：
1. WeakSet结构仅允许存入对象
2. WeakSet结构内部的对象是弱引用

WeakSet结构存入的并非是数组本身，而是数组内部的项。
:::

``` js
let onlyWeak = new WeakSet();
onlyWeak.add([1, 2]);  // TypeError: Invalid value used in weak set
onlyWeak.add([[1, 2], [3, 4]]);  // // WeakSet {[1, 2], [3, 4]}
````

与Set结构一样存在 add( )、delete( )、has( )方法，但是不存在 size 属性和 forEach( ) 方法，weakSet结构无法进行遍历操作。

## Map

ES6新增了一种类似于object的数据结构Map，Map提供的也是一种键值对，但是键可以使用字符串/表达式/其他各种类型的值。

``` js
let mapData = new Map([
    ['name', 'maple'],
    ['age', 25],
    ['sex', 'man']
]);
console.log(mapData);  // Map(2) {'name' => 'maple', 'age' => 25, 'sex' => 'man'}
```

### Map属性

**size( )**：返回当前Map结构中的成员总数。

``` js
let mapData = new Map([
    ['name', 'maple'],
    ['age', 25]
]);
mapData.size;  // 2
```

### Map方法

**set( )**：向当前Map结构传入一个键值对，如果当前键已存在则更新值。

**get( )**：获取当前Map结构中对应键的值。

**has( )**：判断当前Map结构中是否存在此值。

**delete( )**：删除当前Map结构中的某值。

**clear( )**：清空当前Map结构。

``` js
let mapData = new Map([
    ['name', 'maple'],
    ['age', 25],
    ['sex', 'man']
]);
mapData.set('id', '2016072105');  // Map(4) {'name' => 'maple', 'age' => 25, 'sex' => 'man', 'id' => '2016072105'}
mapData.get('name');  // 'maple'
mapData.has('name');  // true
mapData.delete('age');  // true  返回值是true，数据是 Map(3) {'name' => 'maple', 'sex' => 'man', 'id' => '2016072105'}
mapData.clear();  // Map(0) {size:0}
```

**entries( )**：返回当前Map结构的键值对。

**keys( )**：返回当前Map结构的键。

**values( )**：返回当前Map结构的值。

**forEach( )**：遍历当前Map结构的每一项。

``` js
let mapData = new Map([
    ['name', 'maple'],
    ['age', 25],
    ['sex', 'man']
]);

for(let i of mapData.entries()) {
    console.log(i);
}
// 'name' 'maple'
// 'age' 25
// 'sex' 'man'

for(let i of mapData.keys()) {
    console.log(i);
}
// 'name'
// 'age'
// 'sex'

for(let i of mapData.values()) {
    console.log(i);
}
// 'maple'
// 25
// 'man'

mapData.forEach(item => {
    console.log(item);
});
// 'name' 'maple'
// 'age' 25
// 'sex' 'man'
```

### Map应用

``` js
// Map 转 数组
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]

// 数组 转 Map
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }

// Map 转 对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }

// 对象 转 Map
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));

// Map 转 JSON
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'

// JSON 转 Map
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```

## WeakMap

WeakMap结构与Map结构相似，也是类似Object结构的键值对集合。

::: tip
WeakMap结构与Map结构主要存在亮点区别：

1. 只接受对象作为键名。
2. WeakMap的键名指向的对象不进入垃圾回收机制（这一点与WeakSet正好相反）
:::

``` js
let weakMapData = new WeakMap();
let key = {foo: 'foo'};
weakMapData.set(key, 'bar');  // WeakMap {Object => 'bar'}
```

# Symbol

## 基础

**symbol是一种全新的基础数据类型，表示是唯一的值。symbol的值通过symbol( )函数创建。**

::: warning
注意这里symbol的值虽然是通过symbol( )函数创建的，但是由于symbol是基础数据类型，所以不可以使用new命令。
:::

``` js
let onlyValue = Symbol();
typeof onlyValue;  // symbol

let onlyValue1 = Symbol(),
    onlyValue2 = Symbol();
    
onlyValue1 === onlyValue2  // false
```

**symbol( )函数可以存在一个参数，用于描述当前symbol变量。**

::: tip
可以使用toString( )方法查看当前变量是否是Symbol数据，(Ps: console.log默认调用toString)。

symbol函数中的参数仅用于描述当前变量，没有实际意义，所以即使两个相同描述的变量也不相等
:::

``` js
let onlyValue1 = Symbol('foo'),
    onlyValue2 = Symbol('foo');
    
console.log(onlyValue1);  // Symbol(foo)

onlyValue1 === onlyValue2;  // false
```

## 属性

**symbol存在实例属性：description，获取对该Symbol变量的描述**

``` js
let onlyValue = Symbol('only');
onlyValue.description;  // only
```

## 方法

**Symbol.for( )**：根据参数key值从当前symbol注册表中寻找与此key匹配的symbol，如果找到返回这个symbol，找不到就新建一个此key为参数的symbol，并且放入全局symbol注册表中。

::: tip
这里所说的key，其实就是symbol的描述。key值属于可选参数，如果不填则默认为undefined。

通过Symbol.for( )函数进行注册的值是在全局生成的，此全局可以跨越域的限制，在iframe、service worker中生成的值可以在外部被拿到。
:::

``` js
let sf1 = Symbol.for('foo');
let sf2 = Symbol.for('foo');
sf1 === sf2;  // true
```

**Symbol.keyFor( )**：获取全局Symbol注册表中symbol值的描述，如果不存在此symbol则返回值为undefined。

``` js
let skf1 = Symbol('foo'),
    skf2 = Symbol.for('bar');
Symbol.keyFor(skf1);  // foo
Symbol.keyFor(skf2);  // bar
```

**toString( )**：返回当前symbol对象的字符串表示。

::: tip
这里的toString( )方法实际上是Symbol对象自有的方法，而非Object对象的toString( )方法，尤其是出现Symbol对象中存在自定义的toString( )方法时，又会覆盖原始Symbol对象的toString( )方法。
:::

``` js
let s1 = Symbol('foo');
s1.toString();  // Symbol(foo)

let obj = {
    toString: function() {
        return 'back string';
    }
};
let s2 = Symbol(obj);
s2.toString();  // Symbol(back string)
```

## 扩展
**symbol值可以进行有限数据类型的转换。**

symbol可以转换为String类型，可以转换为Boolean类型，可转化为Object类型，不可转换为Number。

``` js
let onlyValue = Symbol('bar');

String(onlyValue);  // Symbol(bar)
Boolean(onlyValue);  // true
Object(onlyValue);  // Symbol{Symbol(bar), description: 'bar'}
Number(onlyValue);  // TypeError: Cannot convert a Symbol value to a number
```

**Object.getOwnPropertySymbols( )：返回一个对象中使用symbol值作为属性名的数组。**

此方法仅统计symbol类型的属性名，其他类型不统计，所以可以使用此方法迭代对象中以symbol作为属性名的属性。

``` js
let obj = {},
    s1 = Symbol('foo'),
    s2 = Symbol('bar'),
    cc = 'cc';
obj[s1] = 'This is foo';
obj[s2] = 'This is bar';
obj[cc] = 'This is cc';

let symObjArr = Object.getOwnPropertySymbols(obj);
console.log(symObjArr.length);  // 2
console.log(symObjArr);  // [Symbol(foo), Symbol(bar)]
```

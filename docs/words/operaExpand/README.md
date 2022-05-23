# 运算符扩展

## 指数运算符

**指数运算符( \*\* )用于进行指数运算，可与等号进行连用，形成( =\*\* )，且这个运算符是右结合运算符。**

``` js
console.log(2 ** 3);  // 8

console.log(2 ** 3 ** 4);  //相当于 2 ** (3 ** 4)

let oneVer = 2;
    oneVer =** 2;  // 相当于 oneVer = oneVer ** 2;
```

<jy-browser-compatible :versionArr="[{ver:'52',state:'full'},{ver:'14',state:'full'},{ver:'52',state:'full'},{ver:'NO',state:'no'},{ver:'39',state:'full'},{ver:'10.1',state:'full'},{ver:'51',state:'full'},{ver:'52',state:'full'},{ver:'52',state:'full'},{ver:'41',state:'full'},{ver:'10.3',state:'full'},{ver:'6.0',state:'full'},{ver:'1.0',state:'full'},{ver:'7.0.0',state:'full'}]"></jy-browser-compatible>

## 链判断运算符

**链判断运算符( ?. )主要用于解决链式连续判断的运算场景，尤其在判断对象属性/方法是否存在方面应用比较广泛。**

``` js
let a = {
    b: {
        c: {
            d: 123,
            d1: function(){
                console.log('This is d1');
            }
        }
    }
};

console.log(a?.b?.c?.d);  // 123
a?.b?.c?.d1();  // This is d1
console.log(a?.b?.c?.d2);  // undefined

console.log(a?.b?.c?.d1?.());  // This is d1
console.log(a?.b?.c?.d2?.());  // undefined
console.log(a?.b?.c?.());  // a?.b?.c is not a function
```

需要注意的点:
- 链判断运算符与与运算符一样都是执行的**短路机制**
- 小括号对链判断运算符无影响，同时使用链判断的地方一般也不应该出现小括号
- 禁止使用以下写法

``` js
new a?.();  // SyntaxError: Invalid optional chain from new expression
new a?.b();  // SyntaxError: Invalid optional chain from new expression

a?.`{b}`;  // SyntaxError: Invalid tagged template on optional chain
a?.b`{c}`;  //SyntaxError: Invalid tagged template on optional chain

super?.();  // 'super' keyword unexpected here
super?.foo;  // 'super' keyword unexpected here

a?.b = c;  // SyntaxError: Invalid left-hand side in assignment
```

- 右侧不得为十进制数值

``` js
a?.8:0;  // 此处并不形成链判断运算符，而是形成了一个三元运算符 a? .3 : 0
```

<jy-browser-compatible :versionArr="[{ver:'80',state:'full'},{ver:'80',state:'full'},{ver:'74',state:'full'},{ver:'NO',state:'no'},{ver:'67',state:'full'},{ver:'13.1',state:'full'},{ver:'80',state:'full'},{ver:'80',state:'full'},{ver:'79',state:'full'},{ver:'57',state:'full'},{ver:'13.4',state:'full'},{ver:'13',state:'full'},{ver:'1.0',state:'full'},{ver:'14.0.0',state:'full'}]"></jy-browser-compatible>

## Null判断运算符

**Null判断运算符( ?? )主要为解决属性默认值问题，只有当此运算符左边的值为 undefined/null 的时候，会使用运算符右边的数据。**

通常我们会使用连续的判断去除属性出现undefined/null/false等情况，或者使用 || 进行默认值的设置，但是连续判断存在过于啰嗦的问题，而或运算又存在 false/0 这些数据也会触发默认值的问题。

``` js
true ?? false;  // true
false ?? true;  // false

undefined ?? true;  // true
null ?? true;  // true

true && false ?? false;  // SyntaxError: Unexpected token '??'
```

::: tip
Null判断运算符仅允许两个变量进行运算，如果出现连续逻辑运算情况需要使用小括号进行分隔。
:::

<jy-browser-compatible :versionArr="[{ver:'80',state:'full'},{ver:'80',state:'full'},{ver:'72',state:'full'},{ver:'NO',state:'no'},{ver:'67',state:'full'},{ver:'13.1',state:'full'},{ver:'80',state:'full'},{ver:'80',state:'full'},{ver:'79',state:'full'},{ver:'NO',state:'no'},{ver:'13.4',state:'full'},{ver:'13',state:'full'},{ver:'1.0',state:'full'},{ver:'14.0.0',state:'full'}]"></jy-browser-compatible>

## 逻辑赋值运算符

**逻辑赋值运算符主要用于简化逻辑运算赋值的过程，其实相当于逻辑运算符与赋值运算符结合。**

``` js
x ||= y;  // 相当于 x || (x = y)
x &&= y;  // 相当于 x && (x = y)
x ??= y;  // 相当于 x ?? (x = y)

userName ||= 1;  // 相当于 userName = userName || 1
userId ??= 1;  // 相当于 userId = userId ?? 1
```

<jy-browser-compatible :versionArr="[{ver:'85',state:'full'},{ver:'85',state:'full'},{ver:'79',state:'full'},{ver:'NO',state:'no'},{ver:'71',state:'full'},{ver:'14',state:'full'},{ver:'85',state:'full'},{ver:'85',state:'full'},{ver:'79',state:'full'},{ver:'60',state:'full'},{ver:'14',state:'full'},{ver:'14',state:'full'},{ver:'1.2',state:'full'},{ver:'15.0.0',state:'full'}]"></jy-browser-compatible>

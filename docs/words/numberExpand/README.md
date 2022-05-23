# 数值扩展

增加数值分隔符( _ )用于增强较长数值的可读性，没有实际意义。

``` js
let num = 123_456,
    num1 = 123456;
num === num1;  // true
```

## 数值扩展方法

**isFinite( )**：检查当前值是否为有限数值。

**isNaN( )**：检查当前值是否为NaN。

``` js
let finite = Infinity,
    numNan = NaN;
Number.isFinite(finite);  // true
Number.isNaN(numNan);  // true
```

**parseInt( )**：将参数值变为整数。
**parseFloat( )**：将参数值变为小数。
**isInteger( )**：判断一个数值是否为整数。

``` js
let num = 12.345;
Number.parseInt(num);  // 12
Number.parseFloat(num);  // 12.345
Number.isInteger(num);  // false
```

**isSafeInteger( )**：判断当前数值是否在Js的表示精度范围(安全范围)内。

::: tip
Js仅能在 -2^53 ~ 2^53 之间精准的表示这个数值，此范围也被成为"安全范围"。在ES6中也引入了 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 这两个常量，分别表示最小范围和最大范围。
:::

## Math扩展方法

**trunc( )**：去除数值的小数部分，仅返回整数部分。

``` js
let num = 12.345;
Math.trunc(num);  // 12
```

**sign( )**：判断当前数值是正数、负数、0。非数值部分先转换为数值，无法转为数值的返回NaN。

``` js
let num = 123,
    num1 = -234,
    num2 = 0,
    num3 = undefined,
    num4 = true,
    num5 = 'qaz';
Math.sign(num);  // +1
Math.sign(num1);  // -1
Math.sign(num2);  // +0
Math.sign(num3);  // +0
Math.sign(num4);  // +1
Math.sign(num5);  // NaN
```

**cbrt( )**：计算参数的立方根。

``` js
let num = 9;
Math.cbrt(num);  // 3
```

**hypot( )**：计算所有参数平方和的平方根。

``` js
Math.hypot(1, 2, 3);  // 3.741657386773941
```

**expm1( )**：计算e^x - 1。

``` js
Math.expm1(2);  // 6.38905609893065
```

**log1p( )**：计算log(x + 1)。

``` js
Math.log1p(2);  //1.0986122886681096
```

**log10( )**：计算以10为底x的对数。

``` js
Math.log10(10);  // 1
```

**log2( )**：计算以2为底x的对数。

```` js
Math.log2(2);  // 1
````

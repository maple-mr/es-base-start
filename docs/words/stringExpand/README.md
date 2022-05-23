# 字符串扩展

## 模版字符串

ES6中新增模板字符串解决在Js中模板书写不方便的问题，使用反引号( \` )标识，中间可使用 ${ } 的形式插入变量/函数，可以进行简单计算。

``` js
let sting = 'Template Data',
    number1 = 1,
    template = `This is ${sting}`;
    template1 = `This is ${number1 + 1}`;
    
template;  // This is Template Data
template1;  // This is 2
```

在模板字符串中需要使用特殊字符的可以使用反斜杠( \\ )进行转义，且在模板字符串中所有的缩紧和换行都会被原样输出，所以在输出前可以使用 trim( ) 方法进行去空格。

``` js
let template = `
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
`;
template;  // 带缩紧和换行输出
template.trim();  // 不带缩紧输出
```

模板字符串还可以作为"标签模板"使用，也就是紧跟在函数后，作为函数的参数使用。如果其中有变量，则会将模板字符串处理成多个参数，再调用函数。

``` js
function output(...param) {
    console.log(param);
}
let number = 123;

output `hello`;  // ['hello']
output `hello ${number}`;  // ['hello', 123]
```

## 字符串方法

**row( )**：对模板字符串中的斜杠进行转义(也就是在斜杠前增加一个斜杠)。

``` js

```

**includes( )**：表示参数字符串是否在原字符串中，返回布尔值。

**startWith( )**：表示参数字符串是否在原字符串的头部。

**endWith( )**：表示参数字符串是否在原字符串的尾部。

``` js
let string1 = 'This is String',
    string2 = 'is';
    
string1.includes(string2);  // true
string1.startsWith(string2);  // false
string1.endsWith(string2);  // false
```

**repeat( )**：返回一个重复参数n次的新字符串。

``` js
let num = '123';
num.repeat(3);  // '123123123'
num.repeat(2.9);  // '123123'
num.repeat(0);  // ''
num.repeat(NaN);  // ''
```

**padStart( )**：从字符串头部以参数2补全参数1位字符串。

**padEnd( )**：从字符串尾部以参数2补全参数1位字符串。

``` js
'finall'.padStart(10, 'x');  // xxxxfinall
'finall'.padEnd(10, 'x');  // finallxxxx
'finall'.padStart(2, 'x');  // finall
'finall'.padStart(10, '123456789');  // 1234finall
```

**trim( )**：去除字符串中的空格、换行符、tab符等。

**trimStart( )**：去除字符串头部的空格、换行符、tab符等。

**trimEnd( )**：去除字符串尾部的空格、换行符、tab符等。

``` js
let blankStr = '   blank string    ';
trim(blankStr);  // 'blankstring'
trimStart(blankStr);  // 'blank string    '
trimEnd(blankStr);  // '    blank string'
```

**replaceAll( )**：匹配字符串中全部的参数项进行替换。

::: tip
原本存在replace( )方法替换字符串中的参数项，但是此方法仅能进行一个参数项的替换，需要进行循环或其他操作才能全部替换。
:::

``` js
let str = 'banbana';
str.replace('a', 'x');  // bxnbana
str.replaceAll('a', 'x');  // bxnbxnx
```

**at( )**：获取当前字符串参数项位置的字符。

::: tip
此方法其实是为了弥补ES5中charAt( )方法的不足，调用at( )方法时，会默认将参数项转为Number类型，NaN转为0，undefined转为0。
:::

``` js
let str = 'banbana';
str.at(5);  // 'n'
str.at(-1);  // 'a'
str.at(NaN);  // 'b'  当为NaN时做0处理
str.at(true);  // 'a'
str.at(false);  // 'b'
```

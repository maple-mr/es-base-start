# let、const

## let

**let语句用于声明一个块级作用域的变量、语句、表达式**

``` js
// 使用let创建变量
let variable = 'This is variable';
```

::: tip
块级作用域：当前作用域中的变量、表达式等不存在于全局环境中。变量与表达式等仅在当前作用域中可以访问，其可见性与生命周期也仅存在当前作用域中
:::

**let不会创建全局变量、表达式**

在程序的最顶端创建通过var语句创建的变量、表单式可以通过全局对象访问，let不可以。

``` js
var variable1 = 'var create variable';
let variable2 = 'let create variable';

console.log('全局环境监测var：', this.variable1);  // var create variable
console.log('全局环境监测let：', this.variable2);  // undefined
```

**let不存在变量提升**

let语句是在编译时进行初始化，而var不是。所以var存在变量提升的情况。

``` js
console.log('打印var语句创建的变量：', variable1);  // undefined
console.log('打印let语句创建的变量：', variable2);  // Error: Cannot access 'variable2' before initialization

var variable1 = 'var create variable';
let variable2 = 'let create variable';
```

::: tip
也是由于let引入了块作用域，所以不存在var语句中变量提升的情况。因为逻辑上不成立，假使let也存在变量提升，当变量提升到全局就自然不形成块级作用域了。
:::

**let会创建暂时性死区**

当出现外层作用域中已经声明此变量，在当前作用域中使用了此变量，而在使用此变量后又一次声明了此变量，这时会出现"暂时性死区"的情况。

``` js
let bar = 'this is bar';

function deel() {
  console.log(bar);  // ReferenceError: Cannot access 'bar' before initialization
  let bar = 'this is bar too';
  
  let bar = (bar + 'too');  // ReferenceError: Cannot access 'bar' before initialization
}

deel();

let foo = {
  arr: [1, 2, 3, 4, 5]
};

for(let foo in foo.arr){  // ReferenceError: Cannot access 'foo' before initialization
  console.log(foo);
}
```

**let不允许在同一作用域中重复声明**

``` js
let bar = 'this is bar';
let bar = 'this.is bar2';

console.log(bar);  // SyntaxError: Identifier 'bar' has already been declared

function maps() {
    let foo = 'this is foo';
    let foo = 'this.is foo2';
    
    console.log(foo);  // SyntaxError: Identifier 'foo' has already been declared
}

maps();
```

<jy-browser-compatible :versionArr="[{ver:'49',state:'full'},{ver:'14',state:'full'},{ver:'44',state:'full',star:true},{ver:'11',state:'partial',star:true},{ver:'17',state:'full'},{ver:'10',state:'full'},{ver:'49',state:'full'},{ver:'49',state:'full'},{ver:'44',state:'full',star:true},{ver:'18',state:'full'},{ver:'10',state:'full'},{ver:'5.0',state:'full'},{ver:'1.0',state:'full'},{ver:'6.0.0',state:'full'}]"></jy-browser-compatible>


## const

**const命令用于创建一个块级常量，创建出的常量不可被重新赋值，也不可以重新声明。**

推荐常量声明时全部使用大写字母

``` js
const CONSTANT = 'this is constant';
CONSTANT = 'edit constant';  // TypeError: Assignment to constant variable

const CONSTANT;
CONSTANT = 'start constant';  // SyntaxError: Missing initializer in const declaration
```

::: tip
const命令创建的是一个值的只读引用，其绑定的是当前常量指向的那个内存地址所保存的数据不可修改。

对于number、string、boolean这些数据而言，值就保存在这个内存地址中，所以不可改动。

但对于Array、Object等数据而言 ，常量指向的内存地址中保存的是指向实际数据的指针，在不修改的这个指针指向的前提下，其实指针指向的实际数据是可以被修改的。(不赞成修改常量中的数据，因为这将会让常量的声明变得毫无意义)
:::

此命令与let命令存在很多相同之处：
- 都仅存在当前块级作用域
- 都不存在变量提升
- 都存在暂时性死区
- 都不允许重新声明

<jy-browser-compatible :versionArr="[{ver:'21',state:'full'},{ver:'12',state:'full'},{ver:'36',state:'full',star:true},{ver:'11',state:'full'},{ver:'9',state:'full'},{ver:'5.1',state:'full'},{ver:'37',state:'full'},{ver:'25',state:'full'},{ver:'36',state:'full',star:true},{ver:'10.1',state:'full'},{ver:'6',state:'full'},{ver:'1.5',state:'full'},{ver:'1.0',state:'full'},{ver:'6.0.0',state:'full'}]"></jy-browser-compatible>
# Module

## 基本概念

在js中一直不存在模块体系，也没办法将大模块解构成一个个分散的小模块，在ES5中一直使用 CommonJS 和 AMD 进行模块化，在ES6中设计了模块化方案'静态化加载'。

```js
// ES5 CommonJS
let {round, eval}  = require('math');
// 等同于
let _math = require('math');
let round = _math.round;
let eval = _math.eval;

// ES6
import {round, eval} from 'math';
```

ES6中并未使用 CommonJS 的模块加载方案，而是创建了'静态化加载'的方案，根本原因就是因为 CommonJS 的方案必须将整个模块全部加载，然后调用相应的方法。而静态化加载仅引入所需的方法，其他方法不加载，大大优化了加载的效率。

## export

每一个模块都是独立的文件，文件内部的变量/方法在文件外部是无法获取的，所以需要使用 export 关键字输出该变量/方法。

```js
// 写法1
export var foo = '张三';
export function getName() {
    console.log('name');
}
export class Tools {}

// 写法2
var foo = '张三';
function getName() {
    console.log('name');
}
class Tools {};
export { foo, getName, Tools };
```

一般而言对外输出的变量/方法名就是在文件中定义时使用的名字，但是还可以通过使用 as 关键字为其起一个别名，可以针对一个变量起多个别名。

```js
var foo = '张三';
export { 
    foo as baz,
    foo as bar
}
```

使用 export 输出变量/方法是动态的，也就是说，当文件中被输出的变量/方法发生改变时，引用此变量/方法的文件也会发生变化。这一点与 CommonJS 不同，CommonJS中当值发生变化时，引用的地方不会发生变化。

CommonJS 输出的相当于是一个新的变量/方法，只是复制了输出文件中的变量/方法，但是两者没有关联。而 export 输出变量/方法相当于是复制了一个引用输出。

::: tip
注意使用 export 输出单个变量/方法只有以上三种方式，其它方式无效。直接输出值也无效，必须输出变量/方法。同时 export 的书写位置必须在模块顶层，不能隐藏在其他作用域中。
:::

如果希望模块直接输出，可以使用 export default 命令，其本质相当于是输出了一个名为 default 的变量，在模块中 export default 有且只有一个。

```js
export default var foo = '张三';
export default function foo() {
    console.log('张三');
}
export default class Foo {}

// 也可以拆分写
var foo = '张三';
export default foo;

function foo() {
    console.log('张三');
}
export default foo;

class Foo {}
export default Foo;
```

## import

使用 export 输出变量/方法后，其他文件就可以通过 import 命令获取这些变量/方法。同时与 export 相同，也可以使用 as 命令对其进行重命名。

import 命令存在'提升'效果，与 var 效果相同，不过还是推荐在引入模块文件的最上方书写。引入的变量/方法是只读的，不过如果引入的是一个对象，可以对对象中的属性进行写入操作。

from 后跟随的是当前引用的模块文件路径，可以是绝对路径，也可以是相对路径，甚至可以直接是此模块名称，不过需要在配置文件中具体描述当前模块文件位置。

使用 export default 输出的模块不使用大括号进行接收，且需要使用别名时，直接在使用即可。

```js
// 写法1
import { foo } from 'main.js';

// 写法2
import { foo as baz } from 'main.js';

// export default 输出
import main from 'main.js';
// 别名接收
import wang from 'main.js';
```

由于 import 是静态执行(类似于字符串)，所以不允许使用变量/表达式。在引入模块时，可能涉及到直接执行该模块，所以可以省略引入的具体变量/方法和from关键字。将整个模块整体加载进来，但不直接执行可以使用 * 符代替，再使用 as 命名该模块。

```js
import { 'fo' + '0' } from 'main.js';  // error

let main = 'main.js';
import { 'foo' } from main;  // error

import 'main.js';  // 可以

import * as main from 'main.js';
main.foo;
```

多次引入同一个模块的代码，只会执行一次。

```js
import 'main.js';
import 'main.js';
import 'main.js';  // 只执行一次

import { foo } from 'mian.js';
import { baz } from 'mian.js';
// 只会执行一次
import { foo, baz } from 'mian.js';
```

## export 和 import 复合

在一个模块中，先输入后输出同一个模块，就可以采用 export 和 import 复合的写法。

```js
export { foo } from 'main.js';

// 相当于
import { foo } from 'main.js';
export { foo };
```

采用这种写法在当前模块中先引入后输出此模块，但是这个模块在当前文件中是不存在的，输入后输出并不存在于此模块中。这种写法一般常用于多个模块合并成一个模块输出。

```js
export { foo } from 'main.js';
export { baz } from 'index.js';
```

## import( ) 方法

由于 import 命令必须写在模块顶级，无法写在条件判断中，所以无法做到条件加载。又因为 import 命令是静态加载，所以也无法通过变量加载模块，实现动态加载。

为了解决上述问题，ES2020提案引入 import() 函数，参数为需要加载的模块位置，import() 方法返回的是一个 Promise 对象
，支持动态加载模块，支持条件加载模块，也实现了动态模块路径的问题。

```js
// 按需加载
btn.click = function () {
    import('./main.js').then(res => {
        res.open();
    }).catch(error => {
        console.log(error);
    })
}

// 条件加载
if (module === 'foo') {
    import('main.js').then( ... );
} else {
    import('index.js').then( ... );
}

// 动态模块路径
import('./' + foo + '.js').then(res => {
    ...
})
```

## 浏览器加载策略

传统方法加载外部 javascript 脚本需要在 HTML 中增加 script 标签，其 type 为 application/javascript(可省略), 其 src 为脚本地址。

默认情况下浏览器采用同步策略加载脚本，在解析HTML文件过程中，遇到 script 标签即中止渲染，先下载脚本文件，执行完脚本后再继续渲染。

通过属性可以控制脚本采用异步加载策略，增加 defer 属性可以指定脚本在 DOM 加载完成后才进行加载，如果存在多个 script 标签，则根据其先后顺序进行加载。而增加 async 属性可以指定脚本在下载完以后立即执行，如果存在多个 script 标签则不存在先后顺序问题，谁先加载完谁先执行。

浏览器加载模块也是使用 script 标签，但是需要加入 type="module" 属性，凡是采用模块加载的都是采用异步加载策略。

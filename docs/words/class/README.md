# class 类

## 基本语法

在js中生成实例对象使用的是通过原型构造函数实现，但是这与传统编程语言 java、c++ 等存在很大差别。所以在 ES6 中引入的 class 类的概念，通过 class 关键字定义类，通过 new 这个类生成实例对象。

class 类的本质是原型构造函数的"语法糖"，在类中定义的所以方法都存在于当前函数的原型上。

```js
// ES5写法
function Tools (x, y) {
    this.x = x;
    this.y = y;
}
Tools.prototype.toString = function () {
    return 'String:' + this.x + ',' + this.y;
}
let tool = new Tools();

// ES6写法
class Tools {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    toString() {
        return 'String:' + this.x + ',' + this.y;
    }
}
let tool = new Tools();
```

正因为类中所有的方法和属性都是定义在 prototype 对象上的，所以可以通过使用 Object.assign() 方法在外层向类中添加方法/属性。

```js
class Tools {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
Object.assign(Tools.prototype, toValue(){ ... })
```

::: tip
prototype 对象的 constructor 属性直接指向类本身。类中的所有方法/属性都是不可枚举的。
:::

## constructor( ) 方法

constructor() 方法是类中的默认方法，如果类中不显示定义此方法，则一个空的 constructor() 方法会默认被添加。通过 new 命令实例化该类时， constructor() 方法会被调用一次。

## 类的实例化

类的实例化必须使用 new 命令，直接调用 class 将报错。在ES6中沿用的ES5中实例定义的位置的处理，除非是直接定义其本身上，否则所有的属性/方法都是定义在其原型上的。

```js
class Tools {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    toString() {
        return 'String:' + this.x + ',' + this.y;
    }
}
let tool = new Tools('a', 'b');
tool.toString(); // String:a,b
tool.hasOwnProperty('toString');  // false
tool.hasOwnProperty('x');  // true
```

在ES6中针对同一个类进行实例化，其原型相同，此逻辑与ES5相同。

```js
// ES5 
function Tools(){ ... }
let toolOne = new Tools(),
    toolTwo = new Tools();
toolOne.__proto__ === toolTwo.__proto__;  // true

// ES6 
class Tools{ ... }
let toolOne = new Tools(),
    toolTwo = new Tools();
toolOne.__proto__ === toolTwo.__proto__;  // true
```

## getter函数和setter函数

类的内部也可以使用 getter取值函数和 setter 赋值函数，针对某个属性值进行取值和赋值的操作。

```js
class Tools {
    get instState() {
        return 'instState';
    }
    
    set instState(v) {
        console.log('instState change:', v);
    }
}

let tool = new Tools();
tool.instState;  // instState
tool.instState = false;  // instState change: false
```

::: tip
注意：getter 和 setter 是设置在对象的属性描述符上的，相当于是使用 Object.defineProperty 添加的。直接调用是无法实现的，但可以通过 Object.getOwnPropertyDescriptor 方法查看到。
:::

```js
class Tools {
    get instState() {
        return 'instState';
    }

    set instState(v) {
        console.log('instState change:', v);
    }
}

let tool = new Tools();
console.log(tool);  // 这样是无法看到 get 和 set 的
let toolState = Object.getOwnPropertyDescriptor(Tools.prototype, instState);
'get' in toolState;  // true
'set' in toolState;  // true
```

## 属性表达式

类中的方法名可以采用表达式的形式定义。

```js
let functionName = 'method';

class Tools {
    [functionName] () { ... }
}
```

## class 表达式

class与函数相同，也可以使用表达式的形式进行定义。

```js
let ToolClass = class Tools {
    getName() {
        return Tools.name;
    }
}

let tool = new ToolClass();
tool.getName();  // Tools
```

在上面的定义中 Tools 是这个类的'对内类名'，仅在类内部可以取到，如果在类内部不存在引用则可以省略。而 ToolClass 是这个类的一个地址引用，其本质与表达式定义函数一致。采用类表达式的写法也可以写出'立即执行类'的状态。

```js
let ToolClass = class { ... }();
```

## class 特性

### 严格模式

class内部不需要显示指定 'use strict' ，因为 class 内部隐式指定了严格模式。

### 不存在变量提升

class不存在变量提升效果，必须严格遵循'先定义后使用'的规则。

### 存在name属性

class 存在name属性返回紧跟在 class 关键字后的类名。

### class中可以存在generator函数

在 class 中可以直接在函数前增加 * 符定义 Generator 函数。

### this指向类的实例

在类内部的方法中使用 this 默认指向类的实例，推荐直接在构造函数中绑定 this 避免找不到实例的情况。

```js
class Tools {
    createName(name) {
        this.editName(name);
    }
    
    editName(name) {
        console.log('修改名称为' + name);
    }
}

let tool = new Tools();
let { createName } = tool;
createName('张三'); // TypeError: Cannot read properties of undefined (reading 'editName')

// 解决方案1，在构造函数中绑定this
class Tools {
    constructor() {
        this.createName = this.createName.bind(this);
    }
    ...
}

// 解决方案2，使用箭头函数指定this
class Tools {
    constructor() {
        this.createName = () => this;
    }
    ...
}

// 解决方案3，使用proxy修改默认调用方法逻辑
function selfish (target) {
    const cache = new WeakMap();
    const handler = {
        get (target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== 'function') {
                return value;
            }
            if (!cache.has(value)) {
                cache.set(value, value.bind(target));
            }
            return cache.get(value);
        }
    };
    const proxy = new Proxy(target, handler);
    return proxy;
}

const tool = selfish(new Tools());
```

### 类的静态方法

类中存在一种静态方法，通过在方法前增加 static 关键字设置。静态方法不能通过实例调用，只能通过类直接调用。

```js
class Tools {
    createName(name) {
        console.log('创建名称成功', name);
    }
    
    static editName(name) {
        console.log('修改名称成功', name);
    }
}

let tool = new Tools();
tool.createName('张三');  // 创建名称成功 张三
tool.editName('张三');  // TypeError: tool.editName is not a function
Tools.editName('张三');  // 修改名称成功 张三
```

::: tip
父类的静态方法可以被子类继承，在构造函数中也可以通过 super 对象调用。静态方法中如果存在 this ，则 this 指向类，而非实例。
:::

```js
class Tools {
    static createName(name) {
        this.editName(name);
    }
    
    static editName(name) {
        console.log('静态方法修改', name);
    }
    
    editName(name) {
        console.log('普通方法修改', name);
    }
}

let tool = new Tools();
tool.createName('张三');  // 静态方法修改 张三
```

### 类的实例属性

类中的实例属性通过两种方式定义，一种是在 constructor 函数中通过 this 定义，另一种是直接在类中定义。

```js
class Tools {
    age = 25;
    
    constructor() {
        this.name = '张三'
    }
}
```

### 静态属性

类中存在静态方法，相对应的就存在静态属性。其调用方式与静态方法相同，也是直接定义在 class 上的，而非实例上的。

```js
class Tools { ... }
Tools.name = '张三';

// 新提案
class Tools {
    static name = '张三';
}
```

### 静态块

当静态属性被定义后，取值时需要通过额外的操作，只能存在两种形式，一种是在类内部定义，在外部赋值，一种是在 constructor 中定义赋值。但采取第一种方式，会将类的内部逻辑写到了外部，而第二种方式又会出现每次实例化类都会重新计算的问题，所以出现了'静态块'。

```js
// 方法1
class Tools {
    static name;
}
Tools.name = opera('张三');

// 方法2 
class Tools {
    constructor () {
        this.name = opera('张三')
    }
}

// 静态块
class Tools {
    static {
        this.name = opera('张三')
    }
}
```

每个类中仅允许存在一个静态块，在静态属性声明后运行，仅运行一次。在静态块中 this 指向当前类，不能存在有 return 语句。

### 私有方法和私有属性

私有方法和私有属性是针对类内部的可以访问的方法和属性，在外部无法访问。

1. 在命名方式上加以区别，私有属性以 _ 开头。但这只是一种代码规范，并非真的是私有方法，仍能在外部被调用到。
```js
class Tools {
    _createName () {
        console.log('创建名称');
    }
}
```

2. 将方法移出类中，通过改变this指向指到外部。
```js
class Tools {
    createName (name) {
        create.call(this, name);
    }
}

function create (name) {
    return this.name = name;
}
```

3. 使用 Symbol 将方法/属性名唯一化。但这种方法也不是绝对无法获取，通过 Reflect.ownKeys() 方法依然可以获取到方法名，实例化以后也可以通过定义的 Symbol 值获取方法。
```js
let foo = Symbol('foo');
class Tools {
    [foo] () {
        console.log('触发 foo');
    }
}

Reflect.ownKeys(Tools.prototype);  // ['constructor', Symbol(foo)]
let tool = new Tools();
tool[foo]();  // 触发 foo
```

4. 使用 # 定义私有属性/方法，但这目前只是提案，并非正式。
```js
class Tools {
    #name = '张三';
    
    editName () {
        console.log(this.#name); 
    }
}

let tool = new Tools();
tool.#name;  // SyntaxError: Private field '#name' must be declared in an enclosing class
tool.editName();  // 张三
```

## in 运算符

常用的 try...catch 结构判断是否存在私有属性，防止报错中断程序执行。 V8引擎改进了 in 运算符，通过 in 运算符判断当前类是否存在某个私有属性。

```js
class Tools {
    #name = '张三';
    
    getName() {
        console.log(this.#name);
    }
    
    getAge() {
        console.log(#age in this);
    }
}

let tool = new Tools();
tool.getAge();  // false
```

## new.target 属性

ES6为定位构造函数调用方法引入了一个全新的属性 new.target ，一般此书写写在构造函数中，如果不是通过 new 命令进行调用的，则返回 undefined。

```js
class Tools {
    constructor () {
        if (new.target === undefined) {
           throw new Error('必须使用new命令调用'); 
        }
    }
}
```



# 结论

- es6新增一种基础数据类型 symbol，至此es存在七种基本数据类型：undefined、null、number、string、boolean、object、symbol。
- es6的模块自动采用严格模式，不管有没有显示声明 'use strict'
  - 变量必须先声明后使用
  - 函数的参数不能存在同名属性
  - 不能使用 with 语句
  - 不能对只读属性进行赋值
  - 不能删除不可删除属性
  - 不能使用前缀 0 表示八进制数
  - 删除变量不能使用 '**delete 变量**'，只能使用 '**delete 变量所属对象[变量]**' (顶级变量所属对象是 global)
  - eval不会在它的外层作用域引入变量
  - eval和arguments不能被赋值
  - arguments不会自动反应函数参数的变化，也就是说 arguments 不是动态变化的
  - 不能使用 arguments.callee
  - 不能使用 arguments.caller
  - 禁止 this 指向 全局对象(global)
  - 不能使用 fn.caller 和 fn.arguments 
  - 新增保留字 (implements、package、public、interface、protected、static、let、private、await、enum)

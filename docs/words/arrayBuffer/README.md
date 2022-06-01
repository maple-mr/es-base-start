# ArrayBuffer

## 基本概念

ArrayBuffer对象、TypedArray视图、DataView视图是 JavaScript 操作二进制数据的一个接口，它们都是以数组的语法处理二进制数据，所以统称为二进制数组。

二进制数组主要是为 WebGL 项目创建的，二进制数组在js端和显卡端都不需要再进行格式转换，处理性能会大大加强。

二进制数组主要由三类对象组成：

- ArrayBuffer对象: 代表内存中的一段二进制数据，可以通过"视图"进行操作。"视图"部署了数组接口，这意味着，可以用数组的方法操作内存。
- TypedArray视图: 包括9种类型的视图。

  |  数据类型   | 字节长度  | 含义 | 对应的 C 语言类型 | 
  |  ----  | ----  | ----  | ----  |
  | Int8  | 1 | 8 位带符号整数 | signed char |
  | Uint8  | 1 | 8 位不带符号整数 | unsigned char |
  | Uint8C  | 1 | 8 位不带符号整数（自动过滤溢出） | unsigned char |
  | Int16  | 2 | 16 位带符号整数 | short |
  | Uint16  | 2 | 16 位带符号整数 | unsigned short |
  | Int32  | 4 | 32 位带符号整数 | int |
  | Uint32  | 4 | 32 位不带符号的整数 | unsigned int |
  | Float32  | 4 | 32 位浮点数 | float |
  | Float64  | 8 | 64 位浮点数 | double |

- DataView视图: 可以自定义复合格式的视图。


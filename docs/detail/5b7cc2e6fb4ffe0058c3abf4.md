# 用js读写binary data

## 前言
单纯的用js去在`ArrayBuffer`、`Blob`和`String`之间做转换是没有任何意义的，需求的产生是因为需要使用`ajax`的方式，借助`XMLHttpRequest `发送这些类型的数据来与后端交互。

在`XMLHttpRequest 1.0`的时候是不支持`ArrayBuffer`、`Blob`、`File`的，在`XMLHttpRequest 2.0`的时候才支持。
`XMLHttpRequest 2.0`支持的数据类型：`DOMString`、`Document`、`FormData`、`Blob`、`File`、`ArrayBuffer`。
> 这段内容原意出自[《理解DOMString、Document、FormData、Blob、File、ArrayBuffer数据类型
》](https://www.zhangxinxu.com/wordpress/2013/10/understand-domstring-document-formdata-blob-file-arraybuffer/)

本文涉及的方法或属性有：

- Blob
- URL
- ArrayBuffer
- TypedArray
- DataView

由于File本质是继承至Blob，此处不做说明。

## Blob
全拼是`binary large obejct`，就是专门用来表示大的二进制文件的。

> Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据。File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
>
> 要从其他非blob对象和数据构造一个Blob，请使用 Blob() 构造函数。要创建包含另一个blob数据的子集blob，请使用 slice()方法。要获取用户文件系统上的文件对应的Blob对象，请参阅 File文档。

```js
const aBlob = new Blob(array[, options])
```
- array 是由`ArrayBuffer`、`ArrayBufferView`、`Blob`、`DOMString`或者其他类似对象的混合体构成的array
  - `ArrayBuffer`后面会解释
  - `ArrayBufferView`就是`ArrayBuffer`的`view`操作层，提供读写`buffer`的能力
  - `Blob`
  - `DOMString`，上面我们提到过，在`XMLHttpRequest 1.0`时代默认就支持的类型。通俗的讲js数据类型的`String`就是`DOMString`。
  > DOMString 是一个UTF-16字符串。由于JavaScript已经使用了这样的字符串，所以DOMString 直接映射到 一个String。   
  在这里，DOMStrings会被编码为UTF-8。
- options 是一个可选的BlobPropertyBag字典
  - type 默认值为 `''`，它代表了将会被放入到blob中的数组内容的MIME类型
  - endings 默认值为`transparent`

例如我们传递一个json格式的对象
```js
const object = {
  name: 'ym',
  age: 18
}
const aBlob = new Blob([object], { type: 'application/json' })
```
传递一个html
```js
const aFileParts = ['<a id="a"><b id="b">hey!</b></a>'] // 一个包含DOMString的数组
const oMyBlob = new Blob(aFileParts, {type : 'text/html'}) // 得到 blob
```
`Blob`的属性和方法
- size 即File.size
- type 即File.type
- slice 创建一个包含源 Blob的指定字节范围内的数据的新 Blob 对象  
文件的分片上传可以用它实现，在上传文件时，`Content-Type: multipart/form-data`，请求实体的主体由分割线`boundary`分隔，分割线的作用大约就是用来标记分隔的位置，利用slice分片段上传。  
分片段上传参考：[文件和二进制数据的操作](https://javascript.ruanyifeng.com/htmlapi/file.html)

## URL

为一个类，类本身提供了静态方法去创建`URLs`，此处不深入`URL`作为类构造实例的属性和方法，只讲解2个静态的方法
- URL.createObjectURL(object)
  - object 是一个Blob对象，返回一个`DOMString`，通常，我们用它来创建显示预览图片的url，这个 URL 的生命周期和创建它的窗口中的 document 绑定。
  ```js
  img.src = URL.createObjectURL(files[i])
  ```
- URL.revokeObjectURL(objectURL) 用来释放一个之前通过调用 URL.createObjectURL() 创建的已经存在的 URL 对象。因为objectURL生命周期会一直存在，我们需要手动销毁让浏览器知道不再需要保持这个文件的引用了。
  ```js
  img.onload = function() {
    window.URL.revokeObjectURL(this.src);
  }
  ```

## ArrayBuffer
是一块内存缓冲区，我们知道Node有Buffer，那为何js里叫Array？

可能是js利用数组的灵活性，来扩展了数组的功能，使之支持存放二进制数据，相比于单纯的数组，ArrayBuffer处理二进制效率会更好。

ArrayBuffer是不能直接被用来读写的，js为它定义了2种操作的`view`层，即
- TypedArray
- DataView

为什么说是`view`层？因为，既然不能直接操作，那就给它增加镜像操作的方法。
> MDN上的原话叫做“Multiple views on the same data”，对它们进行下标读写，最终都会反应到它所建立在的ArrayBuffer之上。

```js
const buffer = new ArrayBuffer(length)
```
buffer中的对象都被初始化为0，console打印如下
```js
ArrayBuffer(10) {}
  [[Int8Array]]: Int8Array(10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [[Int16Array]]: Int16Array(5) [0, 0, 0, 0, 0],
  [[Uint8Array]]: Uint8Array(10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  byteLength: 10，
  __proto__: ArrayBuffer,
    byteLength: 10,
    constructor: ƒ ArrayBuffer(),
    slice: ƒ slice(),
    get byteLength: ƒ byteLength()
```
参考  
- [mdn ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- [怎么理解JavaScript中的ArrayBuffer？](https://www.zhihu.com/question/30401979)

## TypedArray
> 一个TypedArray 对象描述一个底层的二进制数据缓存区（ArrayBuffer）的一个类似数组(array-like)视图。事实上，没有名为 TypedArray的全局对象，也没有一个名为的 TypedArray构造函数。

TypedArray()指的是以下的其中之一： 

名称|大小（以字节为单位）|说明
---|----|----
Int8Array|1|8位有符号整数
Uint8Array|1|8位无符号整数
Int16Array|2|16位有符号整数
Uint16Array|2|16位无符号整数
Int32Array|4|32位有符号整数
Uint32Array|4|32位无符号整数

参数说明  
Int8Array(buffer[, offset][, length])
- offset 偏移量是指从缓冲区开始存放的下标，默认为0
- length指长度，默认是从偏移量开始到结尾

下面我们用实例来说明位数的区别：

创建一块缓冲区，长度为8
![bb16bb26294b90477217b4b01068793a275026fa](https://raw.githubusercontent.com/Jmingzi/blog-image/main/2021-12-28/the_parsed_crop_image.1640700753495.png)

我们可以看到默认初始化时就为不同位数的数组分配好了大小

![3fe192ae9b973f93cf780bcfaabdd500aaaf9f04](https://raw.githubusercontent.com/Jmingzi/blog-image/main/2021-12-28/the_parsed_crop_image.1640700788397.png)

然后我们采用8位初始化，偏移量为2，可以看到实际的存放长度为6，用一张图来表示

![f2e49770b5c6d402331165a15232a9fad7b43778](https://raw.githubusercontent.com/Jmingzi/blog-image/main/2021-12-28/the_parsed_crop_image.1640700824535.png)

- v1很显然是由32位创建
  ```js
  new Int32Array(buffer)
  ```
- v2 偏移量为2，长度到结尾
  ```js
  new Int8Array(buffer, 2)
  ```
- v3为16位数组，偏移量为2，长度为2
  ```js
  new Int16Array(buffer, 2, 2)
  ```

**关于符号**，二进制表示自然数有正数和负数，还有0，这称为真值。但二进制只有0和1，没有-1，所以二进制中使用最高位来表示符号位，正负
```
0 0000001 // +1
1 0000001 // -1
```

8位二进制数能表示的真值范围是[-2^8, +2^8]，由于计算机只能存储0和1，不能存储正负，所以用8个二进制位的最高位来表示符号，0表示正，1表示负，用后七位来表示真值的绝对值，这种表示方法称为原码表示法，简称原码。

也就是说，如果我们存入缓冲区的值是不需要校验正负的，那就用无符号的去表示，反之用有符号的。

参考
- [聊聊JavaScript中的二进制数](https://yanhaijing.com/javascript/2016/07/20/binary-in-js/?utm_source=tool.lu)
- [mdn TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

## DataView

> DataView 视图是一个可以从 ArrayBuffer 对象中读写多种数值类型的底层接口，在读写时不用考虑平台字节序问题。

关于字节序，此处不去做了解了。

对于一块固定长度的`ArrayBuffer`，相比较于使用`TypedArray`方法，`DataView`会更加灵活：`DataView`可以申请到一块buffer，然后在这一块buffer中，又可以set不同符号长度的数据。

```js
const view = new DataView(buffer,offset,length)
view.setInt8(offset, value)
```

例如，将字符串转为buffer
```js
const str = 'my name is ym'
const buffer = new ArrayBuffer(str.length)
const view = new DataView(buffer, 0, str.length)
for (let i = 0; i < str.length; i++) {
  view.setUint8(i, str.charCodeAt(i))
}
```
~~我们看到上面的字符串用了`charCodeAt`，因为`DOMString`为`utf-16`编码，而charCodeAt正是返回字符串在`utf-16`编码下的unicode编码，而我们都是用utf-8编码写的代码，所以需要转化。~~

对于字符串使用charCodeAt转化的最好解释：
- js引擎解析字符串时是采用的utf-16
- js文件编码采用的utf-8

由于很多字符是后期增加的，js在设计之初没有考虑到，那么js在遍历字符串时，都会遇到由于编码不同导致遍历不出来这个字符的问题。

```
// 例如
'💩'[0]
> "�"
```

此处疑问是为何采用charCodeAt而不是codePointAt？这篇文章概括的很全面[Javascript 与字符编码](https://github.com/SamHwang1990/blog/issues/2)

#### 关于字符编码
理解的不透彻，不清楚。需要新开一章去学习阐述，之前整理的一些概念：[字符编码笔记](https://iming.work/detail/5b29c445ee920a003bb5f96d)


### 2018/08/26更 

在熟悉了js字符编码之后，明白了此处的写法是错的，首先用for循环去遍历就是错误的开始

正确的写法为
```js
for (let i of str) {
  view.setUint8(i, str.codePointAt(i))
}
```
另外，关于有符号和无符号，很明显，无符号的要表示的字符会多于有符号的，因为最高位被符号占用了。

### 2019/12/03 更

Uint8Array 并不表示分配的 ArrayBuffer 的大小，length 才是， 无符号8位整数，表示当前存放的内容的字节大小是单字节字符，即1个字节8位。对于超过 ASCII 128 位的字符就不够用了，除此之外，我们还需要知道 TypedArray 里存放的是什么？是 unicode 码点。
```js
// 例如
var v = new Uint8Array(8)
v[0] = '我'.charCodeAt() // 码点是 25105
console.log(v[0]) // 17 并不是 25105，因为超过了 2^7 = 128 
v[0] = '1'.charCodeAt() // 码点是 49
console.log(v[0]) // 49
```
unicode 基本平面内的字符是兼容 ASCII 码的，但是超过128位后，是双字节字符，用 Uint16Array 来表示，对于 emoji 表情 4 字节字符，用 Uint32Array 来表示。

#### 参考
- [用JavaScript处理binary data](http://noyesno.net/page/javascript/binary.html) 受这篇文章的启发较大
- [mdn DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)
- [Ajax 二进制字节流数据的发送和接收](https://my.oschina.net/ososchina/blog/680312) 这篇文章写了几个用例

## 总结
js操作二进制的方法无外乎`Blob`和`ArrayBuffer`，但`Blob`更大通常用来表示文件，`ArrayBuffer`是固定的大小和位置，决定了它查找的效率会非常的快。
> Blob可以append ArrayBuffer数据，也就是Blob是个更高一级的大分类，类似领导的感觉。ArrayBuffer则是具有某种恶魔果实的尖兵。
>
> ArrayBuffer存在的意义就是作为数据源提前写入在内存中，就是提前钉死在某个区域，长度也固定，万年不变。于是，当我们要处理这个ArrayBuffer中的二进制数据，例如，分别8位，16位，32位转换一遍，这个数据都不会变化，3种转换共享数据。

在实际的业务场景中，遇到对于二进制作为传输数据的写法可以总结为：
- 使用Blob，一般为文件上传
- 使用ArrayBuffer 非文件上传的二进制转化

以axios为例：
```js
// 使用blob
const data = { name: 'ym' }
const blob = new Blob(JSON.stringify(data)], { type: 'text/plain' })

// 使用buffer
const str = JSON.stringify(data)
const buffer = new ArrayBuffer(str.length)
const view = new DataView(buffer, 0, str.length)  // 这里也可以使用TypedArray
for (let i = 0; i < str.length; i++) {
  view.setUint8(i, str.charCodeAt(i))
}

axios({
  url: '',
  method: 'post',
  data: blob 或 buffer,
  headers: {
    'Content-Type': 'application/octet-stream'  // 这是应用程序文件的默认值, 意思是 未知的应用程序文件
  }
})
```
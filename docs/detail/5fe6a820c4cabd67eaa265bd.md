# 使用 Scripttable.js 定制 iOS 小组件

![5f7755aeab6b6b318f2fe43f32516bea85a15a2c](https://raw.githubusercontent.com/Jmingzi/blog-image/main/2021-01-10/the_parsed_crop_image.1610264476939.png)

## 介绍

一时觉着 iOS 小组件还挺好玩，于是花了周末一天时间来定制自己的组件。Scripttable 支持使用 ES6 新特性去编写逻辑，作者开放了一系列的 API 来供使用，有些类似小程序，自己提供给开发者额外的 API 开发应用，在沙箱中运行。

> Scripttable 文档地址：https://scriptable.app/  

成品效果如下：

![91330c0c4e592076052cd597d69186f45e11e6f1](https://raw.githubusercontent.com/Jmingzi/blog-image/main/2021-01-10/the_parsed_crop_image.1610264725075.png)

## 需求拆解

效果包含 2 种组件：medium 和 small，其中 medium 尺寸的组件是动态获取数据并随机 emoji

- 获取掘金 JS 下热门或热榜下全部或3天或7天的随机5篇文章
- 内置一系列 emoji 随机显示
- 抠掘金 logo 并修改配色

small 尺寸的组件是纯静态的内容，只需要调配好颜色即可，配色地址：https://htmlcolorcodes.com/zh/

## 实现过程

主要使用 API

- ListWidget
- addStack
- Request
- addText
- addImage
- Script

理解：如果会写 html，可以将 widget 当作 html 文档的 body 节点。`new ListWidget()` 会得到 widget 实例，然后实例可以不断 addStack，这一过程可以无限嵌套，类似于写 div 节点的过程。例如：

```js
const widget = new ListWidget()
const div = widget.addStack()
// 子节点
const div2 = div.addStack()
const div3 = div2.addStack()
```

特别需要注意的是：**新添加的 stack 需要将布局调整为垂直布局**，否则默认的水平布局看不到效果，会误认为是 bug。

```js
div.layoutVertically()
```

获取掘金热门文章，接口是免费开放的

```js
const CATE_ID = '6809637767543259144'
const TAG_ID = '6809640398105870343'
const DATA_URL = 'https://api.juejin.cn/recommend_api/v1/article/recommend_cate_tag_feed'

async function getJueJin (sort_type = 0) {
  const request = new Request(DATA_URL)
  request.method = 'POST'
  request.headers = {
    'Content-Type': 'application/json'
  }
  request.body = JSON.stringify({
    cate_id: CATE_ID,
    cursor: '0',
    id_type: 2,
    limit: 50,
    sort_type,
    tag_id: TAG_ID
  })
  const res = await request.loadJSON()
  return res.data
}
```

最后需要注意的是，在 Scripttable 中，通过  config 可以判断运行环境，在不同的环境可以进行不同的操作：

```js
const widget = await createWidget(list, JUEJIN_TYPE_TEXT[type])
if (config.runsInWidget) {
  Script.setWidget(widget)
  Script.complete()
} else {
  // 程序在 app 中打开
  await widget.presentMedium()
}
```

在使用的过程中，还可以参考论坛的例子，互相借鉴:

- [scripttable topic](https://talk.automators.fm/c/scriptable/13)
- [topic example](https://talk.automators.fm/t/widget-examples/7994/124)

## 开发调试

由于 Scripttable 是一个手机应用，没有开发工具来编写代码和调试。目前能够做的：

- 跨平台共用剪切板内容，这样可以在电脑上编写代码，然后直接粘贴到 Scripttable 中
  - Mac 自带的 和 iPhone 共享剪切板，操作文档：https://support.apple.com/zh-cn/HT209460
  - 其他平台可以使用软件来达到目的
- 在 Scripttable 中，有 log 输出框，建议不确定的内容尽量输出 log

## 示例

附上效果图的源码地址：[Jmingzi gist](https://gist.github.com/Jmingzi)

> 以上链接可能需要翻墙
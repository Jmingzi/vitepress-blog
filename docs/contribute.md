# 文档贡献

本文档以【讯盟文档 - 前端团队文档中心】内容为主，同时整合了资源，并映射了域名便捷访问。

文档配置项在 `docs/.vitepress/config.js` 文件中，`sidebar` 用来配置左侧菜单，其中 `link` 代表 `md` 路径，`id` 代表讯盟文档中文章分享出来的 id，`url` 代表该文章源，以便于查找到该文章并直接修改。

本文档项目 `master` 禁止直接推送修改(TL 除外)，可以通过 pr 方式提出改进。

### 示例

新增讯盟文档上存在的文章：小程序原理，属于【技术体系】目录

1. 新建空的 md 文件 `mp-theory.md` 到 `tech-solutions` 目录下
  ```
  # 小程序原理

  <docshare-wrap />
  ```
2. 新增 sidebar 目录指向该文件
  ```js
  {
    text: '技术体系',
      children: [
        { 
          text: '小程序原理', 
          link: '/tech-solutions/mp-theory', 
          id: '分享ID',
          // 源文章链接，便于直接编辑
          url: 'https://docs.uban360.com/project-detail/article/101/52/1733' 
        }  
  ```
3. 分享ID为讯盟文档-文章右上角点击分享后弹窗内的 md5 值

> 第 1 步的空文件其实可以省略，但是因为要区分菜单、且选中菜单，如果使用公共 md 文件则无法实现

### 文档部署

本文档系统部署在 10.0.10.207 机器，通过 master 分支推送自动打包构建更新。

服务启动

```
cd /home/shinemo/shinemofe/docs/.vitepress/dist
npx http-server -p 80 > http.log 2>&1 &
```
查看日志
```
tail -f http.log
```
结束进程
```
ps -ef | grep http-server | grep -v grep

# root      6082 28627  0 11:12 pts/0    00:00:00 http-server
kill -9 6082
```

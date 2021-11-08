# 文档贡献

本文档以【讯盟文档 - 前端团队文档中心】内容为主，同时整合了资源，并映射了域名便捷访问。

本文档项目 `master` 禁止直接推送修改(TL 除外)，可以通过 pr 方式提出改进。

### 示例

第一种情况：对已有文章进行修改，直接点击文章右上角修改按钮进入编辑

![](/contribute2.png)

第二种情况：调整目录结构或增删文章

先在【讯盟文档 - 前端团队文档中心】中直接做修改，然后进入 [jenkins](http://10.0.10.212:8081/job/shinemofe/) ，点击立即构建，完成刷新文档即可

![](/contribute.jpg)

第三种情况：增删本系统文件，点击右上角 Git， 进入 `docs/.vitepress/config.js` 维护侧边栏菜单，提交 merge request 通过即可。

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

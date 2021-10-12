# 文档贡献

本文档以【讯盟文档 - 前端团队文档中心】内容为主，同时整合了资源，并映射了域名便捷访问。

文档配置项在 `docs/.vitepress/config.js` 文件中，`sidebar` 用来配置左侧菜单，其中 `link` 代表 `md` 路径，`id` 代表讯盟文档中文章分享出来的 id，`url` 代表该文章源，以便于查找到该文章并直接修改。

本文档项目 `master` 禁止直接推送修改(TL 除外)，可以通过 pr 方式提出改进。

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

<h1 align="center">
  <img src="https://user-images.githubusercontent.com/78135608/232244383-5e1389db-ce56-4c83-9627-4f3d1a489c6e.png" alt="yacd">
</h1>

> Yet Another [Clash](https://github.com/yaling888/clash) [Dashboard](https://github.com/yaling888/clash-dashboard)

## 用法

安装[twemoji](https://github.com/mozilla/twemoji-colr/releases)以在 Windows 系统上更好地显示表情符号。

网站 http://yacd.metacubex.one 是通过 HTTP 提供服务的，而不是 HTTPS，因为许多浏览器会阻止从 HTTPS 网站请求 HTTP 资源。如果认为这不安全，可以下载[gh-pages 的 zip 文件](https://github.com/MetaCubeX/yacd/archive/gh-pages.zip)，解压缩并使用 Web 服务器（如 Nginx）提供这些静态文件。

**支持的 URL 查询参数**

| 参数     | 描述                                                               |
| -------- | ------------------------------------------------------------------ |
| hostname | Clash 后端 API 的主机名（通常是`external-controller`的 host 部分） |
| port     | Clash 后端 API 的端口号（通常是`external-controller`的 port 部分） |
| secret   | Clash API 密钥（`config.yaml`中的"secret"）                        |
| theme    | UI 颜色方案（dark、light、auto）                                   |

## 开发部署

```sh
# 安装依赖库
# 你可以使用 `npm i -g pnpm` 安装 pnpm
pnpm i

 # 启动开发服务器
 # 然后访问 http://127.0.0.1:3000
 pnpm start

 # 构建优化资源
 # 准备好部署的资源将在目录 `public` 中
 pnpm build
```

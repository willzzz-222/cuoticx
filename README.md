# 错题重刷项目

## 本地运行
1. 安装依赖：`npm i`
2. 启动开发：`npm run dev`
3. 打开：`http://localhost:5175/`（或终端提示端口）

## 部署给他人体验（Vercel）
1. 将代码推送到 GitHub 仓库
2. 打开 [Vercel](https://vercel.com/) 并使用 GitHub 登录
3. `Add New -> Project`，选择本仓库
4. 保持默认构建设置（Vite），点击 `Deploy`
5. 部署完成后分享 Vercel 生成的公网链接

## 说明
- 项目包含 `vercel.json`，已配置 SPA 路由回退到 `index.html`
- 直接访问深层路径时不会 404

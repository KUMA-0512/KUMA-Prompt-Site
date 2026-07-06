# KUMA Prompt Site

本项目用于部署 KUMA Prompt 官网，采用纯静态 HTML、CSS、JavaScript，目标部署方式为 GitHub Pages。

## 部署范围

- `kumaprompt.com`：产品官网首页
- `kumaprompt.com/download/`：Android 下载页
- `kumaprompt.com/support/`：帮助中心
- `kumaprompt.com/privacy/`：隐私政策
- `kumaprompt.com/terms/`：用户协议

`web.kumaprompt.com` 当前不属于本项目部署范围，不在本仓库配置或开发。

## GitHub Pages 设置

- Source：`main` 分支
- Folder：根目录 `/`
- Custom domain：`kumaprompt.com`
- 仓库根目录包含 `CNAME` 文件，内容为 `kumaprompt.com`

`www.kumaprompt.com` 应在 DNS 中通过 CNAME 指向 GitHub Pages，并在站点侧跳转到主域名 `kumaprompt.com`。

## 发布前待补充

- APK 下载地址：`scripts/site-config.js` 中的 `apkDownloadUrl`
- 当前版本号：`currentVersion`
- 更新日期：`releaseDate`
- APK 文件大小：`apkSize`
- SHA-256 校验值：`sha256`
- 反馈邮箱：`feedbackEmail`
- 隐私政策正式版本
- 用户协议正式版本

## 安全边界

不要将 Flutter App 源码、密钥、`.env`、签名文件、Firebase 配置、API Key 或其他敏感文件提交到本仓库。

## 本地预览

在仓库根目录执行：

```bash
python3 -m http.server 4173
```

然后打开：

```text
http://127.0.0.1:4173/
```

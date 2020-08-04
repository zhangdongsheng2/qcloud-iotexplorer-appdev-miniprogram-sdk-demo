腾讯云物联网开发平台应用开发小程序端 SDK Demo
===

## 使用步骤
1. 前往 [腾讯云物联网开发平台控制台](https://console.cloud.tencent.com/iotexplorer) > 应用开发 > 小程序开发，获取 AppKey 与 AppSecret。

2. 前往 [微信公众平台](https://mp.weixin.qq.com/) 的小程序后台，配置小程序服务器域名。
   - request 合法域名：`https://iot.cloud.tencent.com`
   - socket 合法域名：`wss://iot.cloud.tencent.com`

3. 下载、导入 Demo 项目到 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。

4. 配置 AppKey 与 AppSecret。
   - `miniprogram/app.js`
     ```js
     const APP_KEY = 'YOUR_APP_KEY_HERE'; // 填写 AppKey
     ```
   - `cloudfunctions/login/index.js`
     ```js
     const APP_KEY = 'YOUR_APP_KEY_HERE'; // 填写 AppKey
     const APP_SECRET = 'YOUR_APP_SECRET_HERE'; // 填写 AppSecret
     ```

5. 开通小程序云开发，创建并部署 `login` 云函数（位于 `cloudfunctions/login` 目录）。

6. 在 `miniprogram` 目录下安装小程序 npm 依赖。
   ```
   cd miniprogram
   npm install
   ```

7. 在微信开发者工具中，选择菜单栏的【工具】>【构建 npm】。

## 注意事项
1. 小程序登录物联网开发平台，需要获取小程序用户信息后，由后台服务器调用相关的应用端 API，请参见 [应用端 API 简介](https://cloud.tencent.com/document/product/1081/40773) 以及 [微信号注册登录](https://cloud.tencent.com/document/product/1081/40781) 应用端 API。

2. 本 Demo 使用小程序云开发部署登录接口。您也可以将登录接口部署到自己的后台服务器，并且修改 `demo/miniprogram/app.js` 中的 `getAccessToken` 函数，以使用自行部署的登录接口。

3. 小程序只能对已关联的产品下的设备进行绑定、控制等操作。要将小程序与产品关联，请前往 [腾讯云物联网开发平台控制台](https://console.cloud.tencent.com/iotexplorer) > 应用开发 > 小程序开发 > 关联产品。

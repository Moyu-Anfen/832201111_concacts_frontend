> [!IMPORTANT]
>
> ## 说明
>
> **这是一个简易通讯录的前端部分**



### ⚙️ 部署

- **安装** [node.js](https://nodejs.org/zh-cn/) **环境**

  > node > 18.17.1
  > npm > 9.6.7

- 然后以 **管理员权限** 运行 `cmd` 终端，并 `cd` 到 项目根目录

- 在 `终端` 中输入：

```
# 安装 pnpm
npm install -g pnpm

# 安装依赖
pnpm install

# 预览
pnpm dev

# 构建
pnpm build
```



> [!NOTE]
>
> 构建完成后，静态资源会在 当前目录下的**`dist` 文件夹** 中生成，可将 **`dist` 文件夹下的文件**上传至服务器部署



### 🎉 功能

- [x] 登录注册
- [x] 密码加密
- [x] 状态保存
- [x] 联系人头像
- [x] 增加联系人
- [x] 删除联系人
- [x] 修改联系人
- [x] 查找联系人



### 🌲 文件树

```
|-- README.md  //说明文档
|-- codestyle.md //代码规范
|-- index.html
|-- package-lock.json
|-- package.json
|-- public
|   `-- favicon.jpg //网站图标
|-- src
|   |-- App.vue //根组件
|	|-- main.js //项目入口
|   |-- assets //静态资源
|   |   |-- img //静态图片
|   |-- components //组件
|   |   |-- changeBox.vue //修改联系人组件
|   |   |-- inputBox.vue  //添加联系人组件
|   |   |-- loginButton.vue //登录按钮组件
|   |   `-- loginCard.vue //登录区组件
|   |-- router 
|   |   `-- index.ts //路由配置
|   |-- store //pinia状态管理
|   |   |-- addressBook.ts //联系人状态
|   |   `-- login.ts //登录状态
|   |-- style //样式
|   |   `-- global.css //全局样式
|   |-- utils //工具函数
|   |   |-- useAddress.ts //关于联系人的工具函数
|   |   |-- useAxios.ts //封装Axios的工具函数
|   |   |-- useCountDown.ts //倒计时功能的工具函数
|   |   |-- useEncrypt.ts //加密功能的工具函数
|   |   `-- useVercode.ts //验证功能的工具函数
|   |-- view //页面组件
|   |   |-- addressBook.vue //通讯录页面
|   |   `-- login.vue //登录页面
|   `-- vite-env.d.ts
|-- vite-env.d.ts 
`-- vite.config.js
```



### 🕸️ 代码规范

**详见codestyle.md**

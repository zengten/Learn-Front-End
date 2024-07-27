# nodejs&npm
## nvm
nvm可以实现nodejs多版本安装
```shell
# 项目地址，安装最新release版本
https://github.com/coreybutler/nvm-windows
# nodejs官方历史版本查询
https://nodejs.org/en/download/releases
```

### 使用nvm

```shell
# 查询安装的版本
nvm list
# 安装指定版本，nvm install + 版本号
nvm install 10.24.1
# 使用某个版本，nvm use + 版本号
nvm use 10.24.1
```

### 查询安装的nodejs版本

```shell
# 查询node版本
node -v
# 查询npm版本
npm -v
```

### Q&A

1.在使用`nvm use 10.24.1`后，node版本更改了，但是npm版本未生效，怎么解决？

- `nvm use`只会修改node版本，不会修改npm版本，重新全局安装npm版本即可
- 安装命令`npm install -g npm@+与node相对应版本号`，node与npm对应版本号官网查询

2.使用`npm i`安装项目依赖出现错误

```shell
npm ERR! code CERT_HAS_EXPIRED npm ERR! errno CERT_HAS_EXPIRED npm ERR! request to https://registry.npm.taobao.org/@handsontable%2fvue failed, reason: certificate has expired
```

解决办法

这是由于淘宝镜像地址，证书过期导致的，设置不校验证书
```shell
npm cache clean --force
npm config set strict-ssl false
```

3.使用yarn安装依赖会出现网络问题

```shell
# 安装yarn
npm install -g yarn
# 安装依赖
yarn install 
# 打包
yarn run build
# 启动

# 设置yarn的包源
yarn config set registry 'https://registry.npm.taobao.org'
```

## npm

使用npm进行项目依赖管理
## 常用命令
-   npm init： 项目初始化，生成`package.json`文件
    -   npm init -y：默认一路yes，不用挨个输入信息
-   npm install 包名：安装js包到项目中（仅当前项目有效）。指定 包名，或者 包名@版本号
    -   npm install -g： 全局安装，所有都能用；可以去 npm仓库 搜索第三方库
-   npm update 包名：升级包到最新版本
-   npm uninstall 包名：卸载包
-   npm run：项目运行
### 项目初始化

```shell
#建立一个空文件夹，在命令提示符进入该文件夹  执行命令初始化
npm init
#按照提示输入相关信息，如果是用默认值则直接回车即可。
#name: 项目名称
#version: 项目版本号
#description: 项目描述
#keywords: {Array}关键词，便于用户搜索到我们的项目
#最后会生成package.json文件，这个是包的配置文件，相当于maven的pom.xml
#我们之后也可以根据需要进行修改。

#如果想直接生成 package.json 文件，那么可以使用命令
npm init -y
```
生成文件说明

```json
{
  "name": "npm", // 项目名称
  "version": "1.0.0", // 版本
  "main": "index.js", // 项目的入口文件
  // 项目运行的脚本命令
  "scripts": {
    "test": "echo 'hello'",
    "dev": "node start.js"
  },
  "author": "", // 作者信息
  "license": "ISC", // 项目的许可证
  "description": "", // 项目描述
  // 项目的依赖包
  "dependencies": {
    "jquery": "^3.7.1",
    "random": "^4.1.0"
  }
}
```

### 修改npm镜像

NPM官方的管理的包都是从 `http://npmjs.com`下载的，但是这个网站在国内速度很慢。

这里推荐使用淘宝 NPM 镜像 `http://npm.taobao.org` ，淘宝 NPM 镜像是一个完整 npmjs.com 镜像，同步频率目前为 10分钟一次，以保证尽量与官方服务同步。

**设置镜像地址：**

```shell
#经过下面的配置，以后所有的 npm install 都会经过淘宝的镜像地址下载（ps:淘宝镜像的证书过期了）
#其他镜像源
#腾讯：http://mirrors.cloud.tencent.com/npm/
#华为：https://mirrors.huaweicloud.com/repository/npm/
npm config set registry https://registry.npm.taobao.org 
#查看npm配置信息
npm config list
```

###  npm install命令的使用

```shell
#使用 npm install 安装依赖包的最新版，
#模块安装的位置：项目目录\node_modules
#安装会自动在项目目录下添加 package-lock.json文件，这个文件帮助锁定安装包的版本
#同时package.json 文件中，依赖包会被添加到dependencies节点下，类似maven中的 <dependencies>
npm install jquery
#npm管理的项目在备份和传输的时候一般不携带node_modules文件夹
npm install #根据package.json中的配置下载依赖，初始化项目
#如果安装时想指定特定的版本
npm install jquery@2.1.x
```

forked from [AykutSarac/jsoncrack.com](https://github.com/AykutSarac/jsoncrack.com)

修改可见内容为中文，修改默认页即为JSON Crack Editor，删除需要升级才能使用的操作



<!-- GETTING STARTED -->

## 开始

### 前提

以下是运行 JSON Crack 所需的环境。

- Node.js (Version: >=18.x)
- Pnpm _(推荐)_


## 开发

### 步骤

1. 克隆项目(或 fork https://github.com/AykutSarac/jsoncrack.com/fork).

   ```sh
   git clone https://github.com/AykutSarac/jsoncrack.com.git
   ```

2. 转到项目文件夹

   ```sh
   cd jsoncrack.com
   ```

3. 安装软件包

   ```sh
   pnpm install
   ```

4. 运行项目

   ```sh
   pnpm dev
   
   # Running on http://localhost:3000/
   ```

### Docker 部署

在项目根目录有一个🐳 [`Dockerfile`](Dockerfile) 。
如果您想在本地运行 JSON Crack:

```console
# 创建 Docker 镜像:
docker build -t jsoncrack .

# 本地运行 `docker run`
docker run -p 8888:8080 jsoncrack

# 本地运行 `docker-compose`
docker-compose up -d

# 打开 http://localhost:8888
```

#### Vercel 部署

打开[vercel.com](https://vercel.com/)网站

<img src="http://oss.feny.ink/blogs/images/202410111629956.png" alt="image-20241011162914830" style="zoom:50%;" /> 

点击右上角的`Lon In`进行登录

<img src="http://oss.feny.ink/blogs/images/202410111631986.png" alt="image-20241011163118943" style="zoom:50%;" /> 

使用GitHub进行登录

#### 关联 github 仓库

点击 Add new 按钮，选择 Project 新建一个项目

<img src="http://oss.feny.ink/blogs/images/202410111633738.png" alt="image-20241011163348687" style="zoom:50%;" /> 

选择 github 中需要部署的仓库，点击 Import

<img src="http://oss.feny.ink/blogs/images/202410111634347.png" alt="image-20241011163454280" style="zoom:50%;" /> 

点击 Deploy，等待build完成

<img src="http://oss.feny.ink/blogs/images/202410111636734.png" alt="image-20241011163639665" style="zoom:50%;" /> 

在个人主页可以看到

<img src="http://oss.feny.ink/blogs/images/202410111638141.png" alt="image-20241011163803097" style="zoom:50%;" /> 

点击进去看详情

<img src="http://oss.feny.ink/blogs/images/202410111639656.png" alt="image-20241011163951578" style="zoom:50%;" /> 

## 问题

国内访问Vercel自带的`.vercel.app`地址会打不开，要翻墙才能访问

### 解决办法

如果有域名在`Setting`中设置为自己的域名即可解决访问问题

<img src="http://oss.feny.ink/blogs/images/202410111644436.png" alt="image-20241011164452334" style="zoom:50%;" /> 
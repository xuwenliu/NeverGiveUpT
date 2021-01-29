# NeverGiveUpT

个人博客项目简介：

+ server 后台服务(管理系统和前台客户端) Node.js + Egg.js
+ front/admin 客户端(管理系统) React + Umi + Ant design Pro
+ front/web 客户端(前台pc/wap) Vue2.x + MuseUI

### 1.整个项目启动步骤
1. 启动MongoDB--Mac版
	```bash
	$ cd /usr/local/mongodb/bin
	$ sudo ./mongod --需要输入Mac本机密码
	 
	新开终端
	$ cd /usr/local/mongodb/bin
	$ ./mongod
	```

	使用mongoose链接MongoDb默认端口和数据库：
	mongodb://127.0.0.1:27017/blog
	参看：server/admin/config/config.default.js

2. 启动服务端
	```bash
	$ cd server
	$ yarn install
	$ yarn dev    http://0.0.0.0:7002 --如何修改默认端口参看：server/admin/config/config.default.js
	```
	
3. 启动客户端（后台管理系统）
	```bash
	$ cd front/admin
	$ yarn install
	$ yarn dev     http://localhost:8000
	```
	需要访问后台接口则需要设置项目代理，参看：front/admin/config/proxy.js
	```js
        dev: {
        '/api': {
            target: 'http://127.0.0.1:7002', // 上面服务端启动的地址
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api/v1', // 意思是将形如：/api/about 接口地址代理成：/api/v1/about
            },
        },
    }
	```
	
4. 启动客户端（前台）
	```bash
	$ cd front/web
	$ yarn install
	$ yarn serve     http://localhost:8090 如何修改默认端口参看：front/web/vue.config.js
	
	```

5. 线上启动和终止MongoDB

/var/mongodb/data blog数据存在这里
/var/mongodb/logs/log.log 日志存在这里
没有使用mongod.conf配置文件

```bash
# 终止
$  mongod --dbpath /var/mongodb/data --logpath /var/mongodb/logs/log.log --shutdown

# 启动
$ mongod --dbpath /var/mongodb/data --logpath /var/mongodb/logs/log.log --fork
$ cd /usr/local/mongodb/bin
$ ./mongo

#查看MongoDB是否启用
$ ps aux | grep -v grep | grep mongod

```



# 简单商品检索系统

要求：可以在页面上根据商品名称搜索，显示商品的详细内容（图片，价格，剩余数量）等信息

## 概要设计

针对需求，共包含商品搜索页和商品详情页两个页面

**数据库**：只需一张表，包括商品名、图片、价格、剩余数量、详细介绍这几个字段。

**环境：**

- 后端：Django、python
- 前端：Vue.js (安装node.js,使用淘宝镜像，cnpm管理)+element UI
- 数据库：MySQL（pip install mysqlclient）

## 详细设计

**Django+Vue.js实现**

> 选择vue.js进行前端渲染，就放弃了Django内置的模型引擎。从功能模块上来说，Django将利用其强大的ORM功能，继续负责对Model的管理和操作；Django的view，将负责1）返回vue的入口文件，2）成为api-view，负责对数据的序列化与反序列化，返回JSON响应；Django的URLconf，将负责后端路由，指向vue入口文件和api。vue负责前端视图逻辑和前端模型，以及前端路由。

安装element-ui和axios：

```
npm install element-ui 
npm install axios
```

在src/main.js中引入：

```
import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios'
Vue.prototype.$axios= axios
```

### 前端

**1.** **主要有三个功能：搜索框、商品列表、详情页**

**说明：前期设计表的时候欲将simple_image和image作为商品的缩略图和大图，后发现图片只需使用id定位即可，故用把这两个字段都用价格表示了**

**（1）搜索框**：输入想要搜索的商品名称，点击搜索按钮，使用json格式封装商品名称，通过get/post请求后台数据。

请求数据：{goods_name: string}

​			goods_name: string类型，表示需要搜索的商品名称

返回数据：{status: Boolean, data:[simple_goods:{id: number, name: string, available: number, simple_image: string}]}

​			status：boolean类型，表示请求成功或失败，即data数据是否有

​			data：商品列表

​			simple_goods：简单商品类，包含商品编号（id）、名称（name）、库存数量（available）和价格（simple_image）

**（2）** **商品列表**：用来展示搜索模块返回的数据：缩略图、价格、商品名称、剩余数量。列表中的每个项目可以被点击，点击后向后台发起请求，后台返回结果后，显示该商品的详细信息，未做分页。

请求数据：{id: number}，id: 商品编号

返回数据：{status: boolean, data:{goods:{id: number, name: string, available: number, image: string, pub_date: string ,detail: string}}}

​			status：boolean类型，表示请求成功或失败，即data数据是否有效

​    		data：数据

​    		data.goods: 商品详情，包含商品编号（id）、名称（name）、剩余数量（available）、价格（image）、发售日期（pub_date）、详情介绍（detail）。

**（3）详情页：**显示商品详细信息

**2.** **总体逻辑**

输入商品名称—>点击搜索按钮，显示商品列表—>点击商品，显示详情页

### 后端

1. **三个接口**：search(request)、sendImage(request, id)、getDetail(request)

（1） search(request): post 请求接口，用于根据前端传来的商品名称进行商品检索。检索逻辑为简单的数据库“like”，且未进行分词。检索出结果后，封装结果并以json格式返回。

**注**：json数据中的中文可能会乱码，**解决**：

json.dumps(ret, ensure_ascii=False)

（2）sendImage(request, id)：get请求接口，用于根据商品id，返回图片数据

（3）getDetail(request)：post请求接口，用于根据商品id，获取其详细信息

2. **数据库**

数据库中几天记录直接在京东上手动复制下来并插到数据库中，暂未实现管理员添加数据库的功能。

### 整合

`npm run build` 发布Vue项目后会打包生成dist文件，将该文件拖到django项目目录下，设置相关路径：

urls.py:

```python
from django.views.generic.base import TemplateView
urlpatterns = [
    ...
    path('',TemplateView.as_view(template_name="index.html")),
]
```

settings.py:

```python
TEMPLATES = [
    {   ...
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'dist')],
...
STATICFILES_DIRS=[os.path.join(BASE_DIR,"dist\static"),] #静态文件的搜索路径
```

## 结果展示

**搜索界面：**

![image-20210315205553968](%E5%95%86%E5%93%81%E6%A3%80%E7%B4%A2%E7%B3%BB%E7%BB%9F.assets/image-20210315205553968.png)

**不接受空值搜索：**

![image-20210315205623100](%E5%95%86%E5%93%81%E6%A3%80%E7%B4%A2%E7%B3%BB%E7%BB%9F.assets/image-20210315205623100.png)



**搜索示意：**

![image-20210315210059059](%E5%95%86%E5%93%81%E6%A3%80%E7%B4%A2%E7%B3%BB%E7%BB%9F.assets/image-20210315210059059.png)

**点击搜索到的商品查看详情**：

![image-20210315210321234](%E5%95%86%E5%93%81%E6%A3%80%E7%B4%A2%E7%B3%BB%E7%BB%9F.assets/image-20210315210321234.png)

## 遇到的问题

- **跨域问题**

  解决方法（参考：https://segmentfault.com/a/1190000017952184）：

  1. 安装django-cors-headers：`pip install django-cors-headers`

  2. 配置settings.py文件

     ```python
     INSTALLED_APPS = [
          ...
          'corsheaders'，
          ...
        ] 
        MIDDLEWARE_CLASSES = (
          ...
          'corsheaders.middleware.CorsMiddleware',
          'django.middleware.common.CommonMiddleware', # 注意顺序
          ...
        )
        #跨域增加忽略
        CORS_ALLOW_CREDENTIALS = True
        CORS_ORIGIN_ALLOW_ALL = True
        CORS_ORIGIN_WHITELIST = (
        'http://127.0.0.1:8080',
        'http://localhost:8080',
        )
     
        CORS_ALLOW_METHODS = (
          'DELETE',
          'GET',
          'OPTIONS',
          'PATCH',
          'POST',
          'PUT',
          'VIEW',
        )
     
        CORS_ALLOW_HEADERS = (
          'XMLHttpRequest',
          'X_FILENAME',
          'accept-encoding',
          'authorization',
          'content-type',
          'dnt',
          'origin',
          'user-agent',
          'x-csrftoken',
          'x-requested-with',
          'Pragma',
        )
     ```

     

  ![img](file://C:\Myproject\goodSearch\images\clip_image002.png?lastModify=1615814416)

  **解决：**（参考：https://segmentfault.com/a/1190000017952184）：

  ```python
  from django.views.decorators.csrf import csrf_exempt
  @csrf_exempt
  def search(request):
   …
  ```

- **打包后index.html 页面空白**

  查看index.html文件提示不能解析文件。

  ![image-20210315114217459](%E5%95%86%E5%93%81%E6%A3%80%E7%B4%A2%E7%B3%BB%E7%BB%9F.assets/image-20210315114217459.png)

  ![image-20210315113214684](%E5%95%86%E5%93%81%E6%A3%80%E7%B4%A2%E7%B3%BB%E7%BB%9F.assets/image-20210315113214684.png)

  **解决**：https://blog.csdn.net/muzidigbig/article/details/85760249

  config目录下index.js文件，将assetsPublicPath的值改为assetsPublicPath：' ./ ' 

- **打包后element-ui icon图标显示成小方块**

  依旧是路径不对的问题
  
  ![image-20210315183918036](%E5%95%86%E5%93%81%E6%A3%80%E7%B4%A2%E7%B3%BB%E7%BB%9F.assets/image-20210315183918036.png)
  
  **解决**：在build/utils文件中添加路径
  
  ```python
  fallback: 'vue-style-loader',
  publicPath:'../../'
  ```

## 小结

该商品搜索系统很多基本功能并不完善，如搜索应该支持模糊匹配，对搜索不到的商品应该作处理等。

遇到的最主要的最麻烦就是路径问题，各种不对劲，有些问题忘了截图记录，虽然最终解决了，但是对django和vue的路径机制还是有点懵。


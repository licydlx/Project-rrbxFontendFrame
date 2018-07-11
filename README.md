### 人人保险2.0.0


### 目录结构及职责

	#### 根目录

		┆┄ node_modules (第三方依赖模块)
		┆
		┆┄ src (开发代码目录)
		┆
		┆┄ package.json (项目配置文件)
		┆
		┆┄ postcss.config.js (css 自动补全)
		┆
		┆┄ webpack.common.js (webpack 服务公共入口)
		┆
		┆┄ webpack.dev.js (开发环境配置)
		┆
		┆┄ webpack.prod.js (生产环境配置)

	#### src目录

 		┆┄ Config (配置:当前产品项目id,版本)
 	    ┆
 	    ┆┄ Pages (产品目录)
 	    ┆
 	    ┆┄ Static (基础代码,从此延伸出 html组件及事件绑定组件)
 	    ┆
 	    ┆┄ Component (html组件,从此延伸出  ViewTemplate(页面模板区))
 	    ┆
 	    ┆┄ EventBinding (事件绑定组件)
 	    ┆
 	    ┆┄ ViewTemplate (页面模板区)
 	    ┆
 	    ┆┄ ZOOM (将 职业及地区 转换成当前插件所使用数据的 正确格式)

 	#### Pages (例如: 20180626ruihualnfsx产品)

	     ┆┄ nbuy ┄┆┄ serviceLogic.js 当前产品投保页 业务逻辑
	 	 ┆			 ┆
	 	 ┆┄ nbuy ┄┆┄ XX.js 其它依赖js(关系,地区,职业等数据)
	 	 ┆
	 	 ┆
		 ┆┄ ntri ┄┆┄ serviceLogic.js 当前产品投保页 业务逻辑
	 	 ┆			 ┆
	 	 ┆┄ ntri ┄┆┄ XX.js 其它依赖js(关系,地区,职业等数据)
	 	 ┆
	 	 ┆
		 ┆┄ npro ┄┆┄ serviceLogic.js 当前产品投保页 业务逻辑
	 	 ┆			 ┆
	 	 ┆┄ npro ┄┆┄ XX.js 其它依赖js(关系,地区,职业等数据)
	 	 ┆
	 	 ┆
		 ┆┄ nbuy.js   ┄┆┄ 投保页 组装入口
	 	 ┆
	 	 ┆┄ nbuy.json ┄┆┄ 投保页 组装配置
	 	 ┆
		 ┆┄ ntri.js   ┄┆┄ 试算页 组装入口
	 	 ┆
	 	 ┆┄ ntri.json ┄┆┄ 试算页 组装配置
	 	 ┆
		 ┆┄ npro.js   ┄┆┄ 详情页 组装入口
	 	 ┆
	 	 ┆┄ npro.json ┄┆┄ 详情页 组装配置

	#### Static

   		 ┆┄ Common ┄┆┄ 公用基础代码 (因历史,时间及个人水平等因素 代码,命名有待改进)
	 	 ┆
	 	 ┆
		 ┆┄ Depend ┄┆┄ 功能性组件等 ajax,下拉,验证等等
		 ┆
	 	 ┆
		 ┆┄ Private ┄┆┄ 临时性公用基础代码
		 ┆

	#### Component

		 ┆┄ Common ┄┆┄ 公用基础代码 html组件
	 	 ┆
	 	 ┆
		 ┆┄ Scss   ┄┆┄ 公用基础代码 Scss组件
		 ┆
	 	 ┆
		 ┆┄ Private ┄┆┄ 临时性公用基础代码
	 	 ┆


	#### EventBinding

 		 ┆┄ nbuy.js ┄┆┄
	 	 ┆
	 	 ┆
		 ┆┄ ntri.js ┄┆┄
		 ┆							事件绑定区
	 	 ┆
		 ┆┄ npro.js ┄┆┄
	 	 ┆
	 	 ┆
		 ┆┄ npay.js ┄┆┄
	 	 ┆

	#### ViewTemplate

 		 ┆┄ nbuy.js ┄┆┄
	 	 ┆
	 	 ┆
		 ┆┄ ntri.js ┄┆┄
		 ┆						页面模板区
	 	 ┆
		 ┆┄ npro.js ┄┆┄
	 	 ┆
	 	 ┆
		 ┆┄ npay.js ┄┆┄
	 	 ┆

### 开发流程
 1.Config目录: config.json 配置产品ID及版本号

 2.Pages目录:  a.新建产品目录及配置js及json等
	           b.配置npro目录下的dataFlow.js (主要是试算参数及投保参数,参见其他产品)

 3.如果当前产品 所用到的模板以前都有了,可直接配置;

 ||3.如果当前产品 所用到的模板没有;需开发;

 html组件: /Component/Common/Private/xx.ejs     (/Static/Common/ejs)
 css组件:  /Component/Scss/Private/xx.scss
 事件绑定组件: /Static/Common/js
 其他依赖组件: /Static/Depend/....

 4.git 命令行: npm start (开发模式)
  浏览器访问: https://localhost:8080/20180626ruihualnfsx/npro.html (产品ID换成对应的)
  serviceLogic.js: 业务逻辑开发

 5. npm run build 生产环境打包

module.exports = {
	devServer:{
		port:'8081',
		disableHostCheck:true,
		proxy:{
			'/api':{
				target:'https://api2105.h5project.cn',
				changeOrigin:true,
				pathRewrite:{
					'^/api':''
				}
			}
		}
	}
}
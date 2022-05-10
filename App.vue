<script>
	export default {
		onLaunch: function() { // 全局初始化时触发
			console.log('App Launch')
			// 尝试提取本地存储用户信息
			try{
				const value = uni.getStorageSync('userInfo')
				if(value){
					// 存储用户信息
					this.$store.commit('user/initInfo', value)
					// 根据用户id查询并初始化收获地址
					this.$store.dispatch('address/addressInitAct',value.objectId)
				}
			}catch(e){
				console.log('提取用户信息失败')
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'uview-ui/index.scss';
	/* 引入colorui */
	@import '/colorui/main.css';
	@import '/colorui/icon.css';
	/* 引入阿里图标,这里引入的是在线版,需要把css文件最上面的链接替换掉 */ 
	@import '/static/css/iconfont.css';
</style>

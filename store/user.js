import { $post } from '../utils/request.js'
export default {
	namespaced:true,
	state(){
		return {
			userInfo:null
		}
	},
	mutations:{
		initInfo(state,info){
			state.userInfo = info
			
		}
	},
	actions:{
		// 登录
		userLoginAct(context, info){
			$post('/api/1.1/login', info).then(res => {
				console.log(res)
				let { code } = res
				if(code){
					let title = code === 211 ? '账号不存在' : '密码错误'
					uni.showToast({
						title,
						icon:'none'
					})
					return 
				}
				
				context.commit('initInfo', res)
				// 持久存储
				uni.setStorage({
					key:'userInfo',
					data:res
				})
				// 返回上一页
				uni.navigateBack({
					delta:1
				})
			})
		}
	}
}
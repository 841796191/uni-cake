import { $post,$get } from '../utils/request.js'
export default {
	namespaced:true,
	state(){
		return {
			checkedIdx:-1, // 记录用户勾选地址
			addressList:[
				// {
				// 	username:'张三',
				// 	phone:'12345678910',
				// 	city:'上海',
				// 	region:'黄浦区',
				// 	detail:'黄浦江畔',
				// 	isdefault:true
				// },
				// {
				// 	username:'李四',
				// 	phone:'12345678910',
				// 	city:'上海',
				// 	region:'黄浦区',
				// 	detail:'黄浦江畔',
				// 	isdefault:false
				// },
				// {
				// 	username:'王五',
				// 	phone:'12345678910',
				// 	city:'上海',
				// 	region:'黄浦区',
				// 	detail:'黄浦江畔',
				// 	isdefault:false
				// }
			]
		}
	},
	getters:{
		orderAddress(state){ // 订单中的地址
			// checkedIdx与isdefault共同得到一个地址
			let { checkedIdx,addressList } = state
			if(checkedIdx != -1){ // checkedIdx为-1则说明用户只有默认地址
				return addressList[checkedIdx] // 不为-1则返回勾选的地址
			}
			// 没有勾选地址则返回默认地址
			let len = addressList.length
			for(let i = 0; i < len; i++){
				if(addressList[i].isdefault){
					return addressList[i]
				}
			}
		}
	},
	mutations:{
		addressDetaultMut(state,idx){ // 设置默认地址
			state.addressList.forEach((item,i) => {
				if(i == idx){
					item.isdefault = true
				}else{
					item.isdefault = false
				}
			})
		},
		addressCheckMut(state,idx){ // 勾选地址
			state.checkedIdx = idx
			uni.navigateBack({
				delta:1
			})
		},
		addressAddMut(state,addressObj){ // 新增地址
			state.addressList.push(addressObj)
		},
		addressInitMut(state,addressArr){ // 初始化地址列表
			state.addressList = addressArr
		}
	},
	actions:{
		addressAddAct(context,addressObj){
			$post('/api/1.1/classes/address',addressObj).then(({ objectId }) => {
				context.commit('addressAddMut', {
					...addressObj,
					objectId
				})
				
				uni.navigateBack({
					delta:1
				})
			})
		},
		addressInitAct(context,userid){
			let url = `/api/1.1/classes/address?where={"userid":"${userid}"}`
			$get(url).then(res => {
				// console.log(res)
				context.commit('addressInitMut',res.results)
			})
		}
	}
}
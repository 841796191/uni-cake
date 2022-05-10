export default {
	state(){
		return {
			cond:{ // 商品分类查询
				bcid:1
			}
		}
	},
	mutations:{
		changeCondition(state,obj){ // obj是新的条结对象
			state.cond = obj
		}
	}
}
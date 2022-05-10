<template>
	<view>
		<nav-custom></nav-custom>
		
		<!-- 数据为空 -->
		<u-empty v-if="isEmpty" icon="https://cdn.uviewui.com/uview/empty/data.png"></u-empty>
		<!-- 商品列表 -->
		<view class="cont">
			<good-item 
				v-for="(item,index) in glist" 
				:key="item.objectId"
				:gdata="item"
			></good-item>
		</view>
		
		<!-- tab栏 -->
		<view class="fixed flex justify-center bg-fff padding-xs">
			<view v-for="(item,index) in tabArr" :key="index" @click="handleTap(item)" class="flex justify-around align-center">
				<view class="">{{item.name}}</view>
				<u-line v-if="index < tabArr.length-1" direction="col" length="15" margin="35rpx"></u-line>
			</view>
		</view>
		
		<!-- 侧边弹出 -->
		<u-popup :show="show" mode="left" @close="handleClose">
			<view class="pop-cont">
				<view v-for="(item,index) in cfylist" :key="item.objectId" class="padding-sm u-border-bottom">
					{{item.bname}}
					<view class="cu-tag round bg-yellow color-111">
						{{item.num}}
					</view>
					<view v-if="index==0">
						<view 
							@click="listShow=!listShow" 
							class="padding-sm"
							:class="{'u-border-bottom': !listShow}"
						>
							口味筛选
						</view>
						<u-cell-group v-if="listShow">
							<u-cell 
								v-for="(itm,idx) in item.list"
								:key="itm.tid"
								:name="itm.tname"
								:title="itm.tname" 
								isLink
								@click="handleList(itm,1)"
							></u-cell>
						</u-cell-group>
						<view 
							@click="sceneShow=!sceneShow" 
							class="padding-sm"
							:class="{'u-border-bottom': !sceneShow}"
						>
							场景筛选
						</view>
						<u-cell-group v-if="sceneShow">
							<u-cell 
								v-for="(itm,idx) in item.scene"
								:key="itm.tid"
								:title="itm.tname" 
								isLink
								@click="handleList(itm,2)"
							></u-cell>
						</u-cell-group>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				glist:[],
				page:0, // 商品页数
				tabArr:[
					{name:'分类', bcid:'', target:''},
					{name:'蛋糕', bcid:'1', target:'/pages/cake/cake'},
					{name:'面包', bcid:'11', target:'/pages/bread/bread'},
					{name:'小食', bcid:'6', target:'/pages/food/food'},
					{name:'购物车', bcid:'', target:'/pages/cart/cart'},
				],
				// bcid:1, // 分类id
				// condition:{ // 商品列表查询条件
				// 	bcid:1
				// },
				show:false, // 控制侧边栏
				cfylist:[], // 分类列表
				listShow:false, // 口味筛选显隐
				sceneShow:false, // 场景筛选显隐
				isEmpty:false
			}
		},
		computed: {
			num() {
				return this.$store.state.count.num 
			},
			condition(){
				return this.$store.state.condition.cond
			}
		},
		onLoad() {
			this.loadData()
			// 获取分类
			this.$get('/api/1.1/classes/classify').then(res => {
				// console.log('cfylist:',res.results)
				this.cfylist = res.results.slice(0,4)
			})
		},
		// 下拉刷新生命周期
		onReachBottom(){
			this.loadData()
		},
		// 上拉刷新生命周期
		onPullDownRefresh() {
			this.glist = []
			this.page = 0
			this.loadData()
		},
		methods: {
			// handleDetail(id){
			// 	// console.log(id)
			// 	uni.navigateTo({ // 在跳转页面的onLoad生命周期接收路由参数
			// 		// 页面跳页面,可以使用相对路径(只能跳转非tab页)
			// 		url:`../detail/detail?id=${id}`
			// 	})
			// },
			// 请求数据
			loadData(){
				let skip = this.page * 8
				// 约束查询参数
				let where = JSON.stringify(this.condition)
				let url = `/api/1.1/classes/goods?where=${where}&limit=8&skip=${skip}`
				this.$get(url).then(res => {
					// 停止下拉刷新提示
					uni.stopPullDownRefresh()
					let { results } = res
					if(results.length){
						this.page++
						this.glist = [
							...this.glist,
							...res.results
						]
					} else {
						uni.showToast({
							title:'没有更多商品辣',
							icon:none
						})
					}
					this.isEmpty = !this.glist.length
				})
			},
			reloadData(){ // 刷新页面数据
				this.page = 0
				this.glist = []
				this.loadData()
			},
			// 切换tab
			handleTap(item){
				let { bcid, target } = item
				if(bcid){
					this.$store.commit('changeCondition', {
						bcid:Number(bcid)
					})
					this.reloadData()
				}
				if(!bcid&&!target){ // 点击分类显示侧边
					this.show = true
				}
				if(!bcid&&target){ // 购物车
					uni.navigateTo({
						url:target
					})
				}
			},
			handleClose(){
				this.show = false
			},
			// 点击侧边筛选  type为1是口味筛选,2是场景筛选 
			handleList({bid, tid}, type){
				let obj ={ bcid:bid }
				type === 1 ? obj.fid = tid : obj.sid = tid
				this.$store.commit('changeCondition', obj)
				this.reloadData()
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
page{
	padding: 90rpx 0 120rpx;
}
.cont{
	display: flex;
	flex-wrap: wrap;
	padding: 15rpx;
	justify-content: space-between;
}
.fixed{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	box-shadow: 0 0 10rpx 2rpx rgba(0,0,0,0.2);
	// .flex{
	// 	border: 1px solid black;
	// }
}
.pop-cont{
	width: 400rpx;
	margin-top: 200rpx;
}
</style>

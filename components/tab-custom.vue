<template>
	<view>
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
					<view @click="handleList(item,0)" class="cu-tag round bg-yellow color-111">
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
		name:"tab-custom",
		data() {
			return {
				tabArr:[
					{name:'分类', bcid:'', target:''},
					{name:'蛋糕', bcid:'1', target:'/pages/cake/cake'},
					{name:'面包', bcid:'11', target:'/pages/bread/bread'},
					{name:'小食', bcid:'6', target:'/pages/food/food'},
					{name:'购物车', bcid:'', target:'/pages/cart/cart'},
				],
				show:false, // 控制侧边栏
				cfylist:[], // 分类列表
				listShow:false, // 口味筛选显隐
				sceneShow:false, // 场景筛选显隐
			};
		},
		created() {
			// 获取分类
			this.$get('/api/1.1/classes/classify').then(res => {
				// console.log('cfylist:',res.results)
				this.cfylist = res.results.slice(0,4)
			})
		},
		methods:{
			// 切换tab
			handleTap(item){
				let { bcid, target } = item
				if(bcid){
					this.$store.commit('changeCondition', {
						bcid:Number(bcid)
					})
					uni.navigateTo({
						url:target
					})
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
			// 点击侧边筛选  type为1是口味筛选,2是场景筛选,0则为大类
			handleList({bid, tid}, type){
				let obj ={ bcid:bid }
				if(type===1){obj.fid = tid}
				if(type===2){obj.sid = tid}
				this.$store.commit('changeCondition', obj)
				this.show = false
				uni.navigateTo({
					url:'/pages/cake/cake'
				})
			}
		}
	}
</script>

<style lang="scss">
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

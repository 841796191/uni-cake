<template>
	<view>
		<view 
			class="margin-sm u-border padding" 
			v-for="(item,index) in addressList" 
			:key="index"
			:class="{'default':item.isdefault}"
		>
			<view class="default-cont" v-if="item.isdefault">
				默
			</view>
			<view class="flex justify-between">
				<view class="flex align-center ">
					<text 
						class="iconfont icon-gouxuan margin-right"
						:class="checkedIdx == index ? 'color-yellow' : '' "
						@click="handleCheckAddress(index)"
					></text>
					<view class="">
						{{item.username}},{{item.phone}}
						<view class="">
							{{item.city}}{{item.region}}{{item.detail}}
						</view>
					</view>
				</view>
				
				<view class="edit margin-bottom-xs">
					<text class="iconfont icon-bianji"></text>
				</view>
			</view>
			
			<view class="flex justify-around align-center margin-top">
				<view class="" v-if="item.isdefault">
					默认地址
				</view>
				<view @click="handleDetault(index)" class="" v-else>
					设为默认
				</view>
				<u-line length="15" direction="col"></u-line>
				<view class="">
					删除地址
				</view>
			</view>
		</view>
		
		<view class="text-center" @click="handleAdd">
			<button type="default" class="cu-btn bg-brown">新增地址</button>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState({
				addressList:state => state.address.addressList,
				checkedIdx:state => state.address.checkedIdx,
				userInfo:state => state.user.userInfo
			})
		},
		methods:{
			...mapMutations({
				// 'handleDetault':'address/addressDetaultMut',
				'handleCheckAddress':'address/addressCheckMut'
			}),
			handleAdd(){
				uni.navigateTo({
					url:'address-detail'
				})
			},
			handleDetault(idx){
				let obj = {"requests":[]}
				this.addressList.forEach((item,i) => {
					let bool = i === idx
					obj.requests.push({
						"method":"PUT",
						"path":`/1.1/classes/address/${item.objectId}`,
						"body":{
							"isdefault":bool
						}
					})
				})
				// 线上批量操作
				this.$post('/api/1.1/batch',obj).then(res => {
					// console.log(res)
					// 更改vuex中的数据
					this.$store.commit('address/addressDetaultMut',idx)
				})
			}
		}
	}
</script>

<style lang="scss">
.edit{
	width: 80rpx;
	height: 80rpx;
	text-align: center;
	line-height: 80rpx;
	background-color: #e6e6e6;
	border-radius: 50%;
}
.default-cont{
	display: none;
}
.default{
	position: relative;
	overflow: hidden;
	.default-cont{ // 默认地址图标 
		padding: 40rpx 10rpx 10rpx;
		width: 100rpx;
		background-color: #FAE456;
		font-size: 12rpx;
		text-align: center;
		position: absolute;
		top:-35rpx;
		right: -40rpx;
		transform: rotate(45deg);
		display: block;
	}
}
.color-yellow{
	color: #FAE456;
}
</style>

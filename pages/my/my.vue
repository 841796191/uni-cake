<template>
	<view>
		<view class="cont"></view>
		
		<view class="margin bg-fff">
			<view class="text-center" @click="handleUser">
				<image class="avatar" src="../../static/logo.png" mode=""></image>
			</view>
			<view class="text-center">
				{{username}}
			</view>
			<view class="flex grid">
				<view v-for="(item,index) in gridArr" class="flex flex-direction align-center padding">
					<text :class="['iconfont margin-bottom-xs', item.icon]"></text>
					{{item.name}}
				</view>
			</view>
			<view class="flex grid">
				<view v-for="(item,index) in gridArr" class="flex flex-direction align-center padding">
					<text :class="['iconfont margin-bottom-xs', item.icon]"></text>
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridArr:[
					{
						icon:'icon-danju',
						name:'我的订单'
					},
					{
						icon:'icon-jifen',
						name:'待收货'
					},
					{
						icon:'icon-ziliaoshouce',
						name:'待付款'
					},
					{
						icon:'icon-vip-fill',
						name:'会员等级'
					}
				]
			}
		},
		computed:{
			username(){
				let { userInfo } = this.$store.state.user
				let name = userInfo ? userInfo.username : '尚未登录'
				return name
			}
		},
		methods:{
			handleUser(){
				uni.navigateTo({
					url:'../user/login'
				})
			}
		}
	}
</script>

<style lang="scss">
// page是uniapp中的body 
.cont{
	background-color: #f6f6f6;
	height: 400rpx;
}
.grid .iconfont{
	font-size: 60rpx;
	color: #888;
}
.avatar{
	width: 150rpx;
	height: 150rpx;
	border-radius: 50%;
	margin-top: -75rpx;
}
.margin.bg-fff{
	margin-top: -200rpx;
}
</style>

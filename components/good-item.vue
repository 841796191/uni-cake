<template>
	<view class="cake-item" @click="handleDetail">
		<image class="poster" :src="gdata.img" mode=""></image>
		<view class="info-cont">
			<view class="info flex justify-between align-center">
				<view class="">
					<view class="fs-28">
						{{gdata.name}}
					</view>
					<view class="fs-16">
						{{gdata.french}}
					</view>
				</view>
				
				<view @click="handleCartAdd" class="cart-btn margin-right-sm">
					<text class="iconfont icon-gouwuche"></text>
				</view>
			</view>
			
			<view class="fs-18">
				<text class="fs-14">￥</text>
				{{gdata.price}}
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"good-item",
		props:["gdata"],
		data() {
			return {
				
			};
		},
		methods:{
			// 跳转详情
			handleDetail(){
				// 把点击详情的商品数据存进本地存储,方便detail页面取数据
				uni.setStorage({
					key:'detail',
					data:this.gdata,
					success() {
						uni.navigateTo({
							url:'/pages/detail/detail'
						})
					}
				})
			},
			// 加入购物车
			handleCartAdd(){
				this.$store.commit('cart/cartAddMut', {
					...this.gdata,
					idx:0
				})
			}
		}
	}
</script>

<style lang="scss">
.cake-item{
	width: 350rpx;
	.poster{
		height: 350rpx;
		background-color: #f5f5f5;
	}
	.fs-28{
		margin-top: 24rpx;
	}
	.fs-18{
		margin-top: 22rpx;
	}
	.fs-16{
		margin-top: 14rpx;
	}
	
	.cart-btn{
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: #ffe32a;
		text-align: center;
		line-height: 60rpx;
	}
}
</style>

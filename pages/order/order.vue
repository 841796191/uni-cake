<template>
	<view>
		<view @click="handleAddress" class="padding flex align-center justify-between">
			<view class="cu-item arrow" v-if="orderAddress">
				{{orderAddress.username}},{{orderAddress.phone}}
				<view class="">
					{{orderAddress.city}}
					{{orderAddress.region}}
					{{orderAddress.detail}}
				</view>
			</view>
			
			<view class="" v-else>
				请选择地址
			</view>
			<text class="cuIcon-right"></text>
		</view>
		
		<view class="padding">
			配送时间
		</view>
		
		<view class="flex justify-between">
			<view class="">
				请选择配送时间
			</view>
			<view class="">
				请选择配送时间
			</view>
		</view>
		
		
		<view class="flex padding">
			<view class="flex align-center">
				<image class="poster margin-right" src="" mode=""></image>
			</view>
			
			<view class="flex justify-between info">
				<view class="">
					草莓蛋糕
					<view class="margin-tb-xs">CaoMei</view>
					￥190
				</view>
				<view class="flex flex-direction align-end">
					<view class="edit margin-bottom-xs">
						<text class="iconfont icon-bianji"></text>
					</view>
					 <!-- {{ item.list[item.idx].spec }} -->
					 X 
					 <!-- {{ item.num }} -->
				</view>
			</view>
		</view>
		
		<view class="fixed padding flex justify-between align-center">
			<view class="">
				199
			</view>
			<button class="cu-btn bg-brown" type="default">立即支付</button>
		</view>
		
		<!-- <view class="">
			订单页流程
			1.选地址
			2.勾选的商品列表
			3.总价格
			4.支付按钮
		</view>
		
		<view class="">
			1.支付流程前端工作步骤
				立即结算  ->  下订单 ->  uni.request请求携带用户勾选的商品信息   前端
				下订单后 -> 后端向前端下发订单相关信息,同时下发能够唤起支付的参数包  后端
				立即支付 -> 使用后端下发的唤起支付的数据包,唤起支付宝/微信
		</view>
		
		<view class="">
			2.唤起支付的方式
				在手机app里面购物   uni.requestPayment
				手机网页、电脑网页   通过后端提供的支付链接或扫码支付 (后端提供)
		</view>
		
		<button type="primary" class="cu-btn bg-brown">立即支付</button> -->
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapGetters({
				'orderAddress':'address/orderAddress'
			})
		},
		methods:{
			handleAddress(){
				uni.navigateTo({
					url:'../address/address'
				})
			}
		}
	}
</script>

<style lang="scss">
.poster{
	width: 180rpx;
	height: 180rpx;
	background-color: #d8d8d8;
}
.info{
	width: 60%;
	.edit{
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background-color: #e6e6e6;
		border-radius: 50%;
	}
}
.flex.align-end{
	min-width: 210rpx;
}
.fixed{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	box-shadow: 0 0 1rpx rgba(0,0,0,0.2);
}
.icon-gouxuan{
	color: #e7e7e7;
}
.color-yellow{
	color: yellow;
}
.cu-btn.lg{
	width: 50%;
}
</style>

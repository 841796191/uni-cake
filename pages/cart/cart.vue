<template>
	<view>
		<view class="flex padding" v-for="(item,index) in cartList" :key="item.id + '-' + item.idx">
			<view class="flex align-center">
				<text 
					class="iconfont icon-gouxuan margin-right"
					:class="item.ischeck ? 'color-yellow' : '' "
					@click="handleCheck(index)"
				></text>
				<image class="poster margin-right" :src="item.img" mode=""></image>
			</view>
			
			<view class="flex justify-between info">
				<view class="">
					{{item.name}}
					<view class="margin-tb-xs">{{item.french}}</view>
					￥{{item.list[item.idx].price}}
				</view>
				<view class="flex flex-direction align-end">
					<view @click="handleEdit(index)" class="edit margin-bottom-xs">
						<text class="iconfont icon-bianji"></text>
					</view>
					 {{ item.list[item.idx].spec }}
					 X 
					 {{ item.num }}
				</view>
			</view>
		</view>
		
		<!-- 弹窗 -->
		<u-overlay :show="show" @click="show = false">
			<view class="bg-fff margin cover-cont" @click.stop>
				<view class="padding">
					<view class="flex justify-between info">
						<image class="poster margin-right" src="" mode=""></image>
						<view class="">
							{{cartList[cartIdx].name}}
							<view class="margin-tb-xs">{{cartList[cartIdx].french}}</view>
							￥{{checkedCartInfo.price}}
						</view>
					</view>
					
					<view class="flex justify-between padding-tb u-border-bottom">
						<view class="">
							规格选择
						</view>
						<view class="drop" >
							<view @click="dropShow=true">
								<!-- {{cartList[cartIdx].list[cartList[cartIdx].idx].spec}} -->
								{{checkedCartInfo.spec}}
								-
								<!-- {{cartList[cartIdx].list[cartList[cartIdx].idx].edible}} -->
								{{ checkedCartInfo.edible }}
								<text class="iconfont icon-xiala"></text>
							</view>
							<view class="drop-list bg-fff" v-if="dropShow">
								<view 
									v-for="(item,index) in cartList[cartIdx].list" 
									:key="item.id"
									class="padding-sm"
									@click="handleDropList(index)"
								>
									{{item.spec}}磅 - {{item.edible}}
								</view>
							</view>
						</view>
					</view>
					
					<view class="flex justify-between align-center padding-tb-sm u-border-bottom">
						<view class="">
							数量选择
						</view>
						<u-number-box
							button-size="26"
							@change="handleNum"
						></u-number-box>
					</view>
				</view>
				
				<view class="flex margin-top">
					<button @click="handleCancel" class="cu-btn lg bg-brown" type="default">取消</button>
					<button @click="handleOk" class="cu-btn lg bg-yellow" type="default">确认</button>
				</view>
			</view>
		</u-overlay>
		
		<!-- 底部栏 -->
		<view class="fixed bg-fff">
			<view class="flex">
				<view class="flex flex-sub padding align-center">
					<text 
						class="iconfont icon-gouxuan margin-right"
						:class="allInfo.allCheck ? 'color-yellow' : '' "
						@click="handleAllCheck(allInfo.allCheck)"
					></text>
					全选
					<view class="margin-left">
						共计:{{allInfo.allPrice}}
					</view>
				</view>
				
				<view @click="handleOrder" class="bg-yellow padding text-center color-fff">
					立即结算
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
		data() {
			return {
				show:false, // 弹窗显隐
				dropShow:false, // 下拉列表显隐
				cartIdx:0, // 购物车商品下标
				dropIdx:0, // 子商品下标
				num:1 // 当前弹窗商品数量
			};
		},
		computed:{
			...mapState({
				cartList:state => state.cart.cartList,
				userInfo:state => state.user.userInfo
			}),
			...mapGetters({
				allInfo:'cart/allInfo'
			}),
			checkedCartInfo(){ // 过滤下拉选中的商品对象
				let { cartList, cartIdx, dropIdx } = this
				return cartList[cartIdx].list[dropIdx]
			}
		},
		onLoad(){
			if(this.userInfo) {
				return
			}
			uni.showModal({
				title:'温馨提示',
				content:'您需要先登录才能进行您的操作',
				cancelText:'稍后再说',
				confirmText:'立即登录',
				success:({ cancel }) => {
					if(cancel){ // 不登录
						uni.navigateBack({
							delta:1 // 返回上一页
						})
						return
					}
					uni.navigateTo({
						url:'../user/login'
					})
				}
			})
		},
		methods:{
			...mapMutations({
				handleCheck: 'cart/cartCheckMut',
				handleAllCheck:'cart/cartAllCheckMut'
			}),
			
			handleEdit(idx){ // 编辑
				this.cartIdx = idx
				this.dropIdx = this.cartList[idx].idx
				this.show = true
			},
			
			handleDropList(dropIdx){ // 子商品下拉列表
				this.dropShow = false
				this.dropIdx = dropIdx
			},
			handleNum({value}){ // 选择商品数量
				this.num = value
			},
			handleOk(){ // 弹窗确定
				let {cartIdx, dropIdx, num} = this
				this.show = false
				this.$store.commit('cart/cartListCheckMut', { cartIdx, dropIdx, num })
			},
			handleCancel(){ // 弹窗取消
				this.show = false
			},
			handleOrder(){ // 立即结算->跳转订单页
				uni.navigateTo({
					url:'../order/order'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	padding-bottom: 100rpx;
}
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
.cover-cont{
	position: absolute;
	top: 50%;
	left: 0;
	width: 690rpx;
	transform: translateY(-50%);
	border-radius: 10rpx;
}
.drop{
	position: relative;
	.drop-list{
		width: 300rpx;
		position: absolute;
		top: 60rpx;
		right: 0;
		box-shadow: 0 0 10rpx 2rpx rgba(0,0,0,0.3);
		z-index: 10;
		view:hover{
			background-color: #e6e6e6;
		}
	}
}
</style>

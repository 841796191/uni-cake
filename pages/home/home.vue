<template>
	<scroll-view :scroll-into-view="topItem" scroll-with-animation class="scroll-cont" scroll-y="true" @scroll="handleScroll">
		<view>
			<!-- 用于返回顶部的定位 -->
			<view id="top"></view>
			
			<!-- 导航栏2 -->
			<nav-custom></nav-custom>
			
			<!-- 轮播图 -->
			<swiper class="banner" :indicator-dots="true" :autoplay="true" indicator-active-color="#ffe32a">
				<swiper-item @click="handleBanner(item.link)" v-for="(item,index) in banner" :key="item.objectId">
					<view class="swiper-item">
						<image :src="item.img"></image>
					</view>
				</swiper-item>
			</swiper>
			
			<home-title 
				title="本季推荐"
				en-title="Seasonal Recommend"
				en-tit="Seasonal"
			></home-title>
			
			<scroll-view scroll-x="true" >
				<view class="scroll-inner">
					<!-- mode="heightFix" 控制图片纵横比不变,高度不变宽度自适应 -->
					<image src="../../static/img/recommend1.jpeg" mode="heightFix"></image>
					<image src="../../static/img/recommend2.jpg" mode="heightFix"></image>
					<image src="../../static/img/recommend3.jpg" mode="heightFix"></image>
				</view>
			</scroll-view>
			
			<home-title
				title="法式经典"
				en-title="French Classics"
				en-tit="French"
			></home-title>
			<image class="classify" src="../../static/img/french.jpg" mode=""></image>
		
			<view class="flex flex-wrap padding-sm justify-between">
				<good-item v-for="(item,index) in 4"></good-item>
			</view>
			
			<view class="back-top" @click="handleBackTop" v-show="isShow">
				<text class="iconfont icon-tubiao_fanhuidingbu"></text>
			</view>
		</view>
	
		<tab-custom></tab-custom>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				topItem:'', // 控制返回顶部的变量
				banner:[]
			};
		},
		methods:{
			// 控制返回顶部图标显隐
			handleScroll(e){
				let { scrollTop } = e.detail
				// 离顶部大于500则显示
				this.isShow = scrollTop > 500
				this.topItem = ''
			},
			handleBackTop(){
				this.topItem = 'top'
			},
			handleBanner(link){
				uni.navigateTo({
					url:`./banner-ad?link=${link}`
				})
			}
		},
		onLoad() {
			// $http('/api/1.1/classes/classify').then((res) => {
			// 	console.log(res)
			// })
			this.$get('/api/1.1/classes/banner').then(res => {
				this.banner = res.results
			})
		}
	}
</script>

<style lang="scss">
.banner{
	height: 1000rpx;
	swiper-item{
		height: 1000rpx;
	}
	image{
		width: 100%;
		height: 1000rpx;
	}
}
.scroll-inner{
	white-space: nowrap;
	image{
		height: 290rpx;
	}
}
.classify{
	height: 380rpx;
	width: 100%;
}
.back-top{
	height: 80rpx;
	width: 80rpx;
	background-color: #fff;
	border-radius: 50%;
	box-shadow: 0 0 10rpx 4rpx rgba(0,0,0,0.4);
	position: fixed;
	bottom: 40rpx;
	right: 20rpx;
	text-align: center;
	line-height: 80rpx;
}

.scroll-cont{
	height: 100vh;
}
</style>

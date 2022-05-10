<template>
	<view class="content">
		<view class="logo"><image src="../../static/kitty-BasicLogin/logo.png" mode=""></image></view>
		<view class="uni-form-item uni-column">
			<input v-model="info.username" type="text" class="uni-input" name="" placeholder="请输入用户名" />
		</view>
		<view class="uni-form-item uni-column">
			<input v-model="info.password" type="password" class="uni-input" name="" placeholder="请输入密码" />
		</view>
		<button type="primary" @click="handleReg">注册</button>
		<view class="links">已有账号？<view class="link-highlight" @tap="gotoLogin">点此登陆</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					username:'张三李',
					password:'123'
				}
			}
		},
		methods: {
			gotoLogin: function () {
				uni.navigateTo({
					url: 'login'
				})
			},
			handleReg(){
				this.$post('/api/1.1/users',this.info).then(res=>{
					console.log(res);
					let {objectId,code} = res
					let title = code === 202 ? '账号已被占用' : '注册成功'
					uni.showToast({
						title,
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$color-primary: #b49950;
	.content{
		padding: 60rpx 100rpx 100rpx;
	}
	.logo{
	    text-align: center;
		image{
		    height: 200rpx;
		    width: 200rpx;
		    margin: 0 0 40rpx;
		}
	}
	.uni-form-item{
		margin-bottom: 40rpx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;
		.uni-input{
			font-size: 30rpx;
			padding: 7rpx 0;
			height: 70rpx;
		}
	}
	.column-with-btn{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		button{
			font-size: 24rpx;
			margin: 0;
			width: 180rpx;
			text-align: center;
			&:after{
				border: none
			}
			&.active{
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}
	}
	.img-captcha{
		width: 150rpx;
		height: 60rpx;
	}
	button[type="primary"]{
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34rpx;
		margin-top: 60rpx;
	}
	.links{
		text-align: center;
		margin-top: 40rpx;
		font-size: 26rpx;
		color: #999;
		view{
			display: inline-block;
			vertical-align: top;
			margin: 0 10rpx;
		}
		.link-highlight{
			color: $color-primary
		}
	}
</style>

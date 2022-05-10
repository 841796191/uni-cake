<template>
	<view>
		<map class="map"></map>
		
		<!-- 不用双向绑定通过表单方式拿到输入值 -->
		<form @submit="handleSubmit">
			<view class="cu-form-group margin-top">
				<view class="title">
					<text class="cuIcon-friendfill"></text>
				</view>
				<!-- 表单中的name属性尽量与要提交的属性名称一致 -->
				<input name="username" class="text-right" placeholder="请输入姓名" />
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-mobilefill"></text>
				</view>
				<input name="phone" class="text-right" placeholder="请输入手机号码" />
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-locationfill"></text>
				</view>
				<picker :range="regionArr" @change="handleRegion">
					<view class="picker">
						{{ regionIdx==-1 ? '请选择区域' : regionArr[regionIdx] }}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-locationfill"></text>
				</view>
				<input name="detail" class="text-right" placeholder="请输入详细地址" />
			</view>
			
			<view class="padding">
				<!-- form-type="submit" 用于触发form元素上的submit事件-->
				<button form-type="submit" class="cu-btn bg-brown block">确定</button>
			</view>
		</form>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				regionArr:[
					'天河区',
					'越秀区',
					'海珠区',
					'白云区',
					'番禺区'
				],
				regionIdx:-1 // 区域下标
			}
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo
			})
		},
		methods:{
			handleRegion(e){ // 获取区域下标
				let { value } = e.detail
				this.regionIdx = value
			},
			handleSubmit(e){ // 表单提交
				let { value } = e.detail
				let { regionArr,regionIdx } = this
				value.region = regionArr[regionIdx]
				value.city = '广州市'
				value.isdefault = false
				value.userid = this.userInfo.objectId
				
				this.$store.dispatch('address/addressAddAct', value)
			}
		}
	}
</script>

<style lang="scss">
.map{
	height: 400rpx;
	width: 100%;
}
</style>

<template>
	<view>
		测试公共组件-props参数-{{name}}
	</view>
</template>

<script>
	// 公共组件支持props
	export default {
		name:"test-my-component",
		data() {
			return {
				
			};
		},
		props:['name'],
		onLoad(){ // 只能使用vue的生命周期
			console.log('test-my-component的onLoad')
		},
		created() {
			console.log('test-my-component的created')
		}
	}
</script>

<style lang="scss">

</style>

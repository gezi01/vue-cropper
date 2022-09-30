<template>
	<div>
		<div>
			<el-button class="go-back" @click="goBack">返回</el-button>
		</div>
        <div>
            <calendar />
        </div>
	</div>
</template>
<script>
	import Calendar from "../../comps-t/calendar-component/calendar.vue";
	export default {
		name: "cropper",
		components: {
			Calendar
		},
		data() {
			return {

			};
		},
		methods: {
			goBack() {
				history.back();
			},

		}
	};
</script>
<style scoped lang="scss">
.img{
    width: 300px;
    height: 400px;
    margin-top: 20px;
}
</style>

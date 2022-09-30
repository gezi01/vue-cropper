<template>
	<div>
		<h1>vue cropperjs 裁剪案例</h1>
		<div class="menu">

			<div class="cell">
				<div class="item">
					<el-button type="primary" @click="handleClick()">裁剪图片</el-button>
				</div>
                <div class="item">
					<el-button type="primary" @click="handleClick('calendar')">日历</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "index",
		data() {
			return {};
		},
		methods: {
			handleClick(type) {
                switch(type){
                    case 'crop':
                    this.$router.push({ path: "/Cropper" });
                    break;
                    case 'calendar':
                    this.$router.push({ path: "/Calendar" });
                }

			},
		}
	};
</script>
<style scoped lang="scss">
	.menu {
		width: 500px;
		// background: #a9b1f3;
		display: flex;
		flex-direction: row;
		// justify-content: center;
		// align-items: center;
		margin: 20px;
        .cell{
            margin: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            background: #a9b1f3;
        }
		.item {
			width: calc(100% - 40px);
			padding: 20px;
			// border-bottom: 1px solid #ccc;
		}
	}
</style>

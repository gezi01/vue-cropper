<template>
	<div>
		<div>
			<el-button class="go-back" @click="goBack">返回</el-button>
		</div>
		<el-button size="small" type="primary" @click="clickPreview">浏览</el-button>
        <div>
            <el-image class="img" :src="file" fit="contain"  :preview-src-list="[file]"></el-image>
        </div>
		<cropper-base
            ref="cropper"
            :cropperOptions="cropperOptions"
			:style-img="styleImg"
            :isCircle="false"
			@submit="submit"
		/>
	</div>
</template>
<script>
	import CropperBase from "../../comps-t/img-cropper/index.vue";
	export default {
		name: "cropper",
		components: {
			CropperBase
		},
		data() {
			return {
                cropperOptions:{
                    aspectRatioHeight: 1,
                    aspectRatioWidth:1,
                },
				file:null,
                styleImg:{
                    width: '120px',
                    height:'120px',
                }
			};
		},
		methods: {
			goBack() {
				history.back();
			},
            // 打开弹窗
            clickPreview(){
                this.$refs.cropper.show();
            },
            // 提交
            submit(res){
                this.file = res;
            }
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

<template>
	<el-dialog
		title="图片裁剪"
		:visible.sync="dialogVisible"
		width="800px"
		:close-on-click-modal="false"
		:before-close="handleClose"
	>
		<div style="width:100%">
			<div class="left" :style="`width:calc(100% - (${styleImg.width} + 20px))`">
				<div>
					<el-upload
						class="upload-demo"
						ref="upload"
						:multiple="false"
						:accept="actionOptions.accept"
						:action="actionOptions.actionUrl"
						:headers="actionOptions.headersUpload"
						:on-change="handleChange"
						:show-file-list="false"
						:auto-upload="actionOptions.autoUpload"
					>
						<el-button slot="trigger" size="small" type="primary">请选择图片</el-button>
					</el-upload>
					<el-button
						v-show="isShowButton"
						style="margin-left: 10px;"
						@click="crop"
					>裁剪</el-button>
					<el-button v-show="isShowButton" @click="cancel">取消</el-button>
				</div>
				<div class="bigImg" :style="`width:calc(100% - 10px)`">
					<img v-show="isShowOriginal " id="cropper-init-img" :src="url" alt="Picture" />
				</div>
			</div>
			<div class="right">
				<div class="cropper-right-title">裁剪预览图：</div>
				<div class="smallImg" :style="styleImg" id="cropper-view-Img" :class="isCircle ? 'circle-img' : ''">
					<img
						class="picture"
						v-show="isPreview"
						:src="headerImage"
					/>
				</div>
			</div>
		</div>
		<span slot="footer">
			<el-button type="default" @click="handleClose">取消</el-button>
			<el-button type="success" @click="submit">上传</el-button>
		</span>
	</el-dialog>
</template>
<script>
	import Cropper from "cropperjs";
	import "cropperjs/dist/cropper.min.css";

/**
 * @param {Object} actionOptions 选择图片上传的信息
 * @param {Object} cropperOptions  裁剪配置  具体参数参考文档 https://fengyuanchen.github.io/cropperjs/
 * @param {Object} styleImg 预览图宽高
 * @param {Boolean} isCircle 是否裁剪为圆形图像 true：是，false：不是
 *
 */
	export default {
		name: "image-cropper",
		props: {
            // 上传信息
            actionOptions:{
                type: Object,
                default:()=>{
                    return {
                        actionUrl:"upload/files", // 上传地址
                        headersUpload:{}, // 信息头部
                        autoUpload:false, // 是否自动上传
                        accept:".jpeg,.jpg,.png"
                    }
                }
            },
            // 裁剪配置
            cropperOptions:{
                type:Object,
                default:()=>{}
            },
            // 是否是圆形图像
            isCircle:{
                type: Boolean,
                default: false,
            },
            // 预览图的宽高
			styleImg: {
				type: Object,
				default() {
					return {
						width: "120px",
						height: "168px"
					};
				}
			},
		},
		data() {
			return {
				dialogVisible: false,
				headerImage: '', // 裁剪之后的图片
				cropper: "",
				url: "", // 上传的原图
				imgName: "", // 图片名称
				fileCropperBlob: null, // 裁剪之后的base64图片
				files: null, // 文件流blob
				isPreview: false, // 是否预览
				isShowButton: false, // 是否展示裁剪按钮
				croppable: false, // 是否点击了裁剪事件
				isShowOriginal : false ,// 是否展示原图
				imgType:'', // 图片类型
			};
		},
		methods: {
			show() {
				this.dialogVisible = true;
			},

			// 关闭弹框
			handleClose() {
				this.dialogVisible = false;
                this.clear(); // 清除上传
				this.cancel(); // 清除裁剪
				this.fileCropperBase64 = null; // 清除裁剪图片上传信息
				this.files = null; // 清除原图上传信息
				this.$emit('close');
			},

			// 上传文件时的change
			handleChange(file, files) {
                if(this.croppable){
					this.$message.warning('请先清除裁剪');
					return false;
				}

                this.croppable = false;
				this.isShowOriginal  = true;
				this.isShowButton = true;

				this.url = this.getObjectURL(file.raw);

                this.imgType = file.raw.type; // 图片类型
				this.imgName = file.raw.name; // 图片名称

				this.files = file.raw; // file文件流
				this.fileList = files;
			},
			// 获取url
			getObjectURL(file) {
				var url = null;
				if (window.createObjectURL !== undefined) {
					// basic
					url = window.createObjectURL(file);
				} else if (window.URL !== undefined) {
					// mozilla(firefox)
					url = window.URL.createObjectURL(file);
				} else if (window.webkitURL !== undefined) {
					// webkit or chrome
					url = window.webkitURL.createObjectURL(file);
				}
				return url;
			},
			// 清除事件
			clear() {
				this.headerImage = ""; // 预览值即裁剪之后的图片地址
				this.url = ""; // 上传的原图
				this.isPreview = false;
				this.isShowOriginal  = false;
				this.isShowButton = false;
			},

			// 裁剪的取消事件
			cancel() {
				if(this.croppable){
					this.cropper.clear();
					this.cropper.reset();
					this.cropper.destroy(); // 销毁
					this.croppable = false; // 裁剪置为false
				}
			},
			// 裁剪--获取裁剪框
			crop() {
                if(this.croppable){
					return false;
				}
				this.init();
			},
			// 初始化这个裁剪框
			init() {
				let self = this;
				let image = document.getElementById('cropper-init-img');
                // 基础配置
                let baseOption = {
                    viewMode: 0,
					background: false,
					autoCropArea: 0.4,
					guides: false, // 是否展示虚线
					preview: `#cropper-view-Img`,
                    aspectRatioWidth: 1, // 比例-宽
                    aspectRatioHeight: 1, // 比例-高
                    zoomable: true, // 是否缩放
                }
                // 获取cropper的配置信息
                let options = Object.assign(baseOption,self.cropperOptions);
				self.cropper = new Cropper(image, {
                    // 裁剪框的宽高比例
					aspectRatio: self.cropperOptions.aspectRatioWidth / self.cropperOptions.aspectRatioHeight,
                    ...options,
					ready: function() {
						self.croppable = true;
                        if(self.isCircle){
                             document.getElementsByClassName('cropper-container')[0].className = 'cropper-container cropper-circle';
                        }
					}
				});
			},
			// 获取裁剪之后的图片
			cropImg() {
                var croppedCanvas;
                var roundedCanvas;
				if (!this.croppable) {
					return;
				}

				// Crop
				croppedCanvas = this.cropper.getCroppedCanvas();

                if(this.isCircle){
                     roundedCanvas = this.getRoundedCanvas(croppedCanvas); //获取canvas裁圆形图
                    // base64
                    this.fileCropperBase64 = roundedCanvas.toDataURL('image/png');
                } else {
                     this.fileCropperBase64 = croppedCanvas.toDataURL(this.imgType);
                }
			},

			// 画图
			getRoundedCanvas(sourceCanvas) {
				var canvas = document.createElement("canvas");
				var context = canvas.getContext("2d");
				var width = sourceCanvas.width;
				var height = sourceCanvas.height;
				canvas.width = width;
				canvas.height = height;
				context.imageSmoothingEnabled = true;
				context.drawImage(sourceCanvas, 0, 0, width, height);
				context.globalCompositeOperation = "destination-in";
				context.beginPath();
                // 是否是圆形图像
                if(this.isCircle){
				    context.arc(width/2, height/2, Math.min(width, height)/2, 0, 2 * Math.PI); // 原型
                }
				context.fill();
				return canvas;
			},

            //提交
			submit(){
				if(!this.files && !this.fileCropperBase64){
					this.$message.warning('请先选择图片再进行上传');
					return false;
				}
				if (!this.croppable) {
					var reader = new FileReader();

					reader.readAsDataURL(this.files);

					reader.onload = () =>{
						this.beforeUpload(this.files);
					};
				} else {
					this.cropImg();
					this.beforeUpload(this.fileCropperBase64);
				}

			},
			// 上传之前的验证
			beforeUpload (files) {
				let max_size = 200 * 1024;
				try {
					if(files.size > max_size){
						this.$alert(`图片大小不能超过200k`,{
							confirmButtonText: '确定',
							type:'error'
						});
						return false;
					}
					// 上传
					this.uploadFileRaw(files);
				} catch (e) {
					console.log(e);
				}
			},
            // 请求接口
            uploadFileRaw(files){
                this.$emit('submit',files);
                this.dialogVisible = false;
            }
		}
	};
</script>
<style scoped src="./index.scss" lang="scss"/>

### cropperjs 裁剪 参考文档：https://fengyuanchen.github.io/cropperjs/


### params

```bash

 #选择图片上传的信息
 * @param {Object} actionOptions

 #裁剪配置  具体参数参考文档 https://fengyuanchen.github.io/cropperjs/
 * @param {Object} cropperOptions

 #预览图宽高
 * @param {Object} styleImg

 #是否裁剪为圆形图像 true：是，false：不是
 * @param {Boolean} isCircle

```
### method

```bash

#打开弹窗 this.$refs.cropper.show();
show()

#关闭弹窗 this.$refs.cropper.handleClose();
handleClose()

#cropper裁剪初始方法
init()

#请求接口并提交
uploadFileRaw()

```

### 使用
``` bash

<cropper-base ref="cropper" :action-options="actionOptions" :cropper-options="cropperOptions" :is-circle="false" :style-img="styleImg" />

data(){
    return {
        cropperOptions:{
            aspectRatioHeight: 1,
            aspectRatioWidth:1,
            ...
        },
        actionOptions:{
            actionUrl:"",
            accept:"jpg,png",
            ...
        },
        styleImg:{
            width: '120px',
            height:'120px',
        }
    };
}

```

# vue-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 保利威视频

``` bash

<template>
	<div class="content">
		<!-- 保利威 -->
		<div class="live" id="player"></div>
	</div>
</template>
<script>
    /**
     * 保利威视频
     *https://dev.polyv.net/2020/videoproduct/v-player-sdk/v-player-sdk-web/reference/
     *
     *
     */
	export default {
		name: "baoLiWei",
		data() {
			return {
				vodPlayerJs: "https://player.polyv.net/script/player.js",
				vid: "88083abbf5bcf1356e05d39666be527a_8"
			};
		},
		mounted() {
			this.loadPlayerScript(this.loadPlayer);
		},
		methods: {
			loadPlayerScript(callback) {
				if (!window.polyvPlayer) {
					const myScript = document.createElement("script");
					myScript.setAttribute("src", this.vodPlayerJs);
					myScript.onload = callback;
					document.body.appendChild(myScript);
				} else {
					callback();
				}
			},

			loadPlayer() {
				const polyvPlayer = window.polyvPlayer;
				this.player = polyvPlayer({
					wrap: "#player",
					width: 800,
					height: 533,
					vid: this.vid,
                    autoplay: false,
                    hideSwitchPlayer: true, // 是否隐藏切换h5和flash的按钮
				});
			}
		},
		destroyed() {
			if (this.player) {
				this.player.destroy();
			}
		}
	};
</script>

```

## toast 手写element的message插件

``` bash
#默认提示
this.$toast('你好');

#提示
this.$toast.success('成功');
this.$toast.error('失败');
this.$toast.warning('警告');
this.$toast.info('信息');

#配置
this.$toast({message:'你好', type:'success',duration:3000});

...(代码请查看路径src/comps-t/@toast)

#在main.js配置

import toast from './comps-t/@toast/toast.js'

Vue.use(toast);

```

## tinymce富文本编辑器

``` bash

#install
cnpm install tinymce@5.5.1

cnpm install @tinymce/tinymce-vue@3.2.3

#
在index.html （放在static文件夹内）文件中引入语言及需要用到的插件：例如图片，视频，粘贴，表格、全屏等

#
在comps-t中查看tinymce/index.vue文件配置

#html
<template>
	<div class="rich-text-editor">
		<editor
			v-model="html"
			id="editor"
			:disabled="disabled"
			:placeholder="placeholder"
			:init="setting"
			@input="getInput"
		/>
	</div>
</template>

#js

import Editor from "@tinymce/tinymce-vue";
import Lang from "../../plugins/tinymce-5.4.2-90/langs/zh_CN"; // 引入语言包-中文

...（详情请查看tinymce/index.vue）

```


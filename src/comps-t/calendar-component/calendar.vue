<style scoped>
	@media screen and (min-width: 460px) {
		.wh_item_no_click_true:hover {
			cursor: pointer;
			background: #ac2c2d;
			border-radius: 4px;
			color: #fff;
		}
	}
	* {
		margin: 0;
		padding: 0;
	}

	.wh_container {
		max-width: 410px;
		margin: auto;
	}

	li {
		list-style-type: none;
	}
	.wh_top_changge {
		display: flex;
		/* width: 240px; */
		height: 36px;
		background: #ac2c2d;
		border-radius: 9px 9px 0px 0px;
	}

	.wh_top_changge li {
		cursor: pointer;
		display: flex;
		color: #fff;
		font-size: 14px;
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.wh_top_changge .wh_content_li {
		cursor: auto;
	}
	.wh_content_all {
		font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
		background-color: #fff;
		width: 100%;
		overflow: hidden;
		padding-bottom: 8px;
	}

	.wh_content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 3% 0 3%;
		width: 100%;
	}

	.wh_content:first-child .wh_content_item_tag,
	.wh_content:first-child .wh_content_item {
		color: #ddd;
		font-size: 16px;
	}

	.wh_content_item,
	.wh_content_item_tag {
		font-size: 14px;
		width: 13.4%;
		text-align: center;
		position: relative;
	}
	.wh_content_item_tag {
		color: #3a3d4b;
	}
	.wh_content_item {
		height: 40px;
	}

	.wh_top_tag {
		width: 40px;
		height: 40px;
		line-height: 40px;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #99a1af;
	}

	.wh_item_date {
		width: 24px;
		height: 24px;
		line-height: 24px;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wh_jiantou1 {
		width: 12px;
		height: 12px;
		border-top: 2px solid #ffffff;
		border-left: 2px solid #ffffff;
		transform: rotate(-45deg);
	}

	.wh_jiantou1:active,
	.wh_jiantou2:active {
		border-color: #ddd;
	}

	.wh_jiantou2 {
		width: 12px;
		height: 12px;
		border-top: 2px solid #ffffff;
		border-right: 2px solid #ffffff;
		transform: rotate(45deg);
	}
	.wh_content_item > .wh_isMark {
		margin: auto;
		background: #ac2c2d;
		border-radius: 4px;
		color: #fff;
		z-index: 2;
	}
	.wh_content_item .wh_other_dayhide {
		color: #bfbfbf;
	}
	.wh_content_item .wh_want_dayhide {
		color: #bfbfbf;
	}
	.wh_content_item .wh_isToday {
		background: #ac2c2d;
		border-radius: 4px;
		color: #fff;
	}
	.wh_content_item .wh_chose_day {
		background: #ac2c2d;
		border-radius: 4px;
		color: #fff;
	}
</style>
<template>
	<section class="wh_container">
		<div class="wh_content_all">
			<div class="wh_top_changge">
				<li @click="PreMonth(myDate,false)" v-if="!isCloseClick">
					<div class="wh_jiantou1" />
				</li>
				<li class="wh_content_li">{{ dateTop }}</li>
				<li @click="NextMonth(myDate,false)" v-if="!isCloseClick">
					<div class="wh_jiantou2" />
				</li>
			</div>
			<div class="wh_content">
				<div class="wh_content_item" v-for="(tag,index) in textTop" :key="index">
					<div class="wh_top_tag">{{ tag }}</div>
				</div>
			</div>
			<div class="wh_content">
				<div
					class="wh_content_item"
					v-for="(item,index) in list"
					@click="clickDay(item,index)"
					:key="index"
				>
					<div
						class="wh_item_date"
						:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday&&!isShowTody},{wh_item_no_click_true:!isCloseClick},{wh_chose_day:item.chooseDay},setClass(item)]"
					>
						{{ item.id }}
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import timeUtil from "./calendar";
	export default {
		name: "calendar",
		data() {
			return {
				myDate: [],
				list: [],
				historyChose: [],
				dateTop: ""
			};
		},
		props: {
			markDate: {
				type: Array,
				default: () => []
			},
			markDateMore: {
				type: Array,
				default: () => []
			},
			textTop: {
				type: Array,
				default: () => ["日", "一", "二", "三", "四", "五", "六"]
			},
			sundayStart: {
				type: Boolean,
				default: () => false
			},
			agoDayHide: {
				type: String,
				default: `0`
			},
			futureDayHide: {
				type: String,
				default: `2554387200`
			},
			isCloseClick: {
				// true：关闭点击事件，false：开启点击事件,默认开启
				type: Boolean,
				default: () => false
			},
			// 是否标量显示当天日期， // 默认开启
			isShowTody: {
				type: Boolean,
				default: () => false
			}
		},
		created() {
			this.intStart();
			this.myDate = new Date();
		},
		methods: {
			intStart() {
				timeUtil.sundayStart = this.sundayStart;
				console.log(timeUtil.sundayStart, "sundayStart");
			},
			setClass(data) {
				let obj = {};
				obj[data.markClassName] = data.markClassName;
				return obj;
			},
			clickDay: function (item) {
				if(this.isCloseClick){
					return;
				}
				if (item.otherMonth === "nowMonth" && !item.dayHide) {
					this.getList(this.myDate, item.date,true);
				}
				if (item.otherMonth !== "nowMonth") {
					item.otherMonth === "preMonth" ? this.PreMonth(item.date) : this.NextMonth(item.date);
				}
			},
			ChoseMonth: function (date, isChosedDay = true) {
				date = timeUtil.dateFormat(date);
				this.myDate = new Date(date);
				this.$emit("change-month", timeUtil.dateFormat(this.myDate));
				if (isChosedDay) {
					this.getList(this.myDate, date, isChosedDay);
				} else {
					this.getList(this.myDate);
				}
			},
			PreMonth: function (date, isChosedDay = true) {
				date = timeUtil.dateFormat(date);
				this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth");
				this.$emit("change-month", timeUtil.dateFormat(this.myDate));
				if (isChosedDay) {
					this.getList(this.myDate, date, isChosedDay);
				} else {
					this.getList(this.myDate);
				}
			},
			NextMonth: function (date, isChosedDay = true) {
				date = timeUtil.dateFormat(date);
				this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth");
				this.$emit("change-month", timeUtil.dateFormat(this.myDate));
				if (isChosedDay) {
					this.getList(this.myDate, date);
				} else {
					this.getList(this.myDate);
				}
			},
			forMatArgs: function () {
				let markDate = this.markDate;
				let markDateMore = this.markDateMore;
				markDate = markDate.map((k) => {
					return timeUtil.dateFormat(k);
				});
				markDateMore = markDateMore.map((k) => {
					k.date = timeUtil.dateFormat(k.date);
					return k;
				});
				return [markDate, markDateMore];
			},
			getList: function (date, chooseDay) {
				let day_ = date.getDate();
				if(chooseDay){
					day_ = chooseDay.split('/')[2];
				}

				const [markDate, markDateMore] = this.forMatArgs();
				if(!this.isShowTody){
					this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
				} else {
					this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月${day_}日`;
				}
				let arr = timeUtil.getMonthList(this.myDate);
				for (let i = 0; i < arr.length; i++) {
					let markClassName = "";
					let k = arr[i];
					k.chooseDay = false;
					const nowTime = k.date;
					const t = new Date(nowTime).getTime() / 1000;
					//看每一天的class
					for (const c of markDateMore) {
						if (c.date === nowTime) {
							markClassName = c.className || "";
						}
					}
					//标记选中某些天 设置class
					k.markClassName = markClassName;
					k.isMark = markDate.indexOf(nowTime) > -1;
					//无法选中某天
					k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
					if (k.isToday) {
						this.$emit("is-today", nowTime);
					}
					let flag = !k.dayHide && k.otherMonth === "nowMonth";
					if (chooseDay && chooseDay === nowTime && flag) {
						this.$emit("chose-day", nowTime);
						this.historyChose.push(nowTime);
						k.chooseDay = true;
					} else if (this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag) {
						k.chooseDay = true;
					}
				}
				this.list = arr;
			}
		},
		mounted() {
			this.getList(this.myDate);
		},
		watch: {
			markDate: {
				handler() {
					this.getList(this.myDate);
				},
				deep: true
			},
			markDateMore: {
				handler() {
					this.getList(this.myDate);
				},
				deep: true
			},
			agoDayHide: {
				handler() {
					this.getList(this.myDate);
				},
				deep: true
			},
			futureDayHide: {
				handler() {
					this.getList(this.myDate);
				},
				deep: true
			},
			sundayStart: {
				handler() {
					this.intStart();
					this.getList(this.myDate);
				},
				deep: true
			}
		}
	};
</script>
